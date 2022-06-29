// @ts-check

export class ECMAssembly {
	table
	__pin
	__unpin

	get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this.table = e.table
		this.__pin = e.__pin
		this.__unpin = e.__unpin
		this._exports = e
	}

	_exports = null

	__deferWithArg_pinnedRefCount = new Map()

	wasmImports = {
		requestAnimationFrame: {
			_requestAnimationFrame: fnIndex => {
				return requestAnimationFrame(time => {
					this.getFn(fnIndex)(time)
				})
			},

			// _cancelAnimationFrame: id => {
			// 	cancelAnimationFrame(id)
			// },
			cancelAnimationFrame,
		},

		setTimeout: {
			_setTimeout: (fnIndex, ms) => {
				return setTimeout(this.getFn(fnIndex), ms)
			},
			clearTimeout,
		},

		setInterval: {
			_setInterval: (fnIndex, ms) => {
				return setInterval(this.getFn(fnIndex), ms)
			},
			clearInterval,
		},

		defer: {
			_defer: callbackIndex => {
				Promise.resolve().then(this.getFn(callbackIndex))
			},
			_deferWithArg: (callbackIndex, argPtr) => {
				let refCount = this.__deferWithArg_pinnedRefCount.get(argPtr)
				refCount ?? this.__deferWithArg_pinnedRefCount.set(argPtr, (refCount = 0))

				// Prevent the thing pointed to by argPtr from being collectd, because the callback needs it later.
				if (refCount++ === 0) this.__pin(argPtr)
				this.__deferWithArg_pinnedRefCount.set(argPtr, refCount)

				Promise.resolve().then(() => {
					// At this point, is the callback collected? Did we need to
					// __pin the callback too? Does it currently works by
					// accident?

					this.getFn(callbackIndex)(argPtr)

					let refCount = this.__deferWithArg_pinnedRefCount.get(argPtr)
					if (refCount == null) throw new Error('We should always have a ref count at this point!')

					if (refCount-- === 0) {
						this.__unpin(argPtr)
						this.__deferWithArg_pinnedRefCount.delete(argPtr)
					} else {
						this.__deferWithArg_pinnedRefCount.set(argPtr, refCount)
					}
				})
			},
		},
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
		return this.table.get(fnIndex)
	}
}
