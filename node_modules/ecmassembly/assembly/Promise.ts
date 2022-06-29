import {defer, deferWithArg, _defer} from './defer'
import {ptr} from './utils'

// TODO convert to callback form once closures are out.
// type Executor<T> = (resolve: (result: T) => void, reject: (error: Error | null) => void) => void
type Executor<T, E extends Error> = (resRej: PromiseActions<T, E>) => void

// We shouldn't have to export this (this class should not even exist) once AS supports closures.
export class PromiseActions<T, E extends Error> {
	/*friend*/ constructor(private promise: Promise<T, E>) {}

	resolve(result: T): void {
		// @ts-ignore, internal access
		if (this.promise.__isSettled) return
		// @ts-ignore, internal access
		this.promise.__isSettled = true

		// @ts-ignore, internal access
		this.promise.__result.push(result)

		// @ts-ignore, internal access
		this.promise.__runThen()
	}

	reject(error: E): void {
		// @ts-ignore, internal access
		if (this.promise.__isSettled) return
		// @ts-ignore, internal access
		this.promise.__isSettled = true

		// @ts-ignore, internal access
		this.promise.__error.push(error)

		// @ts-ignore, internal access
		this.promise.__runCatch()
	}
}

/**
 * Creates a new Promise.
 * @param executor A callback used to initialize the promise. This callback is
 * passed an object with two methods: a resolve method used to resolve the
 * promise with a value or the result of another promise, and a reject method
 * used to reject the promise with a provided reason or error. When support for
 * closures in AS lands, we'll change this to be two callbacks instead of an
 * object, as per the Promise spec.
 */
export class Promise<T, E extends Error> {
	private __ptr: usize = ptr(this)
	private __isSettled: boolean = false

	private __actions: PromiseActions<T, E> = new PromiseActions(this)

	// Arrays are being used here in order to represent "value | undefined"
	// which is not yet possible in AS, where a length of 1 means the value is
	// defined, and a length of zero means the value is undefined.

	private __result: Array<T> = []
	private __error: Array<E> = []

	private __thenCallback: Array<(val: T) => void> = []
	private __catchCallback: Array<(err: E) => void> = []
	private __finallyCallback: Array<() => void> = []

	constructor(private executor: Executor<T, E>) {
		this.executor(this.__actions)
	}

	/**
	 * Attaches callbacks for the resolution and/or rejection of the Promise.
	 * @param onresolved The callback to execute when the Promise is resolved.
	 * @returns A Promise for the completion of which ever callback is executed.
	 */
	then(onresolved: (v: T) => void): void {
		if (this.__thenCallback.length) throw new Error('Promise chaining or multiple then/catch calls not yet supported.')

		this.__thenCallback.push(onresolved)

		if (this.__result.length) this.__runThen()
	}

	private __runThen(): void {
		if (!this.__result.length) throw new Error('This should not be possible.')

		// Run the then callbacks
		if (this.__thenCallback.length) {
			// XXX unable to pass methods as callbacks:
			// defer<(this: Promise<T>) => void>(this.anyMethod)
			// _defer(ptr(this.anyMethod))
			// _defer(ptr<(this: Promise<T>) => void>(this.anyMethod))

			// The goal here is to run the callback in the next microtask, as per Promise spec.
			deferWithArg((selfPtr: usize) => {
				const self = changetype<Promise<T, E>>(selfPtr)
				const fn = self.__thenCallback[0]
				fn(self.__result[0])
			}, this.__ptr)
		}

		// Run the finally callbacks
		if (this.__finallyCallback.length) {
			deferWithArg((selfPtr: usize) => {
				const self = changetype<Promise<T, E>>(selfPtr)
				const fn = self.__finallyCallback[0]
				fn()
			}, this.__ptr)
		}
	}

	/**
	 * Attaches a callback for only the rejection of the Promise.
	 * @param onrejected The callback to execute when the Promise is rejected.
	 * @returns A Promise for the completion of the callback.
	 */
	catch(onrejected: (err: E) => void): void {
		if (this.__catchCallback.length) throw new Error('Promise chaining or multiple then/catch calls not yet supported.')

		this.__catchCallback.push(onrejected)

		if (this.__error.length) this.__runCatch()
	}

	private __runCatch(): void {
		if (!this.__error.length) throw new Error('This should not be possible.')

		// Run the catch callbacks
		if (this.__catchCallback.length) {
			deferWithArg((selfPtr: usize) => {
				const self = changetype<Promise<T, E>>(selfPtr)
				const fn = self.__catchCallback[0]
				fn(self.__error[0])
			}, this.__ptr)
		}

		// Run the finally callbacks
		if (this.__finallyCallback.length) {
			deferWithArg((selfPtr: usize) => {
				const self = changetype<Promise<T, E>>(selfPtr)
				const fn = self.__finallyCallback[0]
				fn()
			}, this.__ptr)
		}
	}

	/**
	 * Returns a Promise that will be settled once the promise it is chained on
	 * is resolved or rejected. When the promise settles, the callback passed to
	 * finally() will be called without any arguments. This is useful for
	 * running logic regardless if the promise this is chained on resolves
	 * or rejects (like the finally block of a try-catch-finally
	 * statement).
	 * @param onfinally The callback to execute when the parent Promise is settled.
	 * @returns A Promise for the settlement of the parent Promise.
	 */
	finally(onfinally: () => void): Promise<T, E> {
		if (this.__finallyCallback.length)
			throw new Error('Promise chaining or multiple then/catch calls not yet supported.')

		this.__finallyCallback.push(onfinally)

		return this
	}

	/**
	 * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
	 * or rejected, and having the value or error of the first resolved or rejected promise.
	 * @param values An array of Promises.
	 * @returns A new Promise.
	 */
	static race<T>(values: Array<Promise<T, Error>>): Promise<void, Error> {
		return new Promise<void, Error>(actions => {
			actions.reject(new Error('Not Implemented'))
		})
	}

	/**
	 * Creates a Promise that is resolved with an array of results when all of the provided Promises
	 * resolve, or rejected when any Promise is rejected.
	 * @param values An array of Promises.
	 * @returns A new Promise.
	 */
	static all<T>(values: Array<Promise<T, Error>>): Promise<Array<T>, Error> {
		return new Promise<Array<T>, Error>(actions => {
			actions.reject(new Error('Not Implemented'))
		})
	}

	/**
	 * Creates a new promise that is already resolved with the given value.
	 * @param value The value the promise should be resolved to.
	 * @returns A resolved promise.
	 */
	static resolve<T>(value: T): Promise<T, Error> {
		return new Promise<T, Error>(actions => {
			actions.resolve(value)
		})
	}

	/**
	 * Creates a new promise that is already rejected with the given error.
	 * @param reason The error the promise should be rejected with.
	 * @returns A rejected promise.
	 */
	static reject<T extends Error>(reason: T): Promise<void, T> {
		return new Promise<void, T>(actions => {
			actions.reject(reason)
		})
	}
}
