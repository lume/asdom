import {refs} from './refs'

/**
 * The base class that all objects extend from.
 */
export class Object {
	__ptr__: usize = changetype<usize>(this)

	constructor() {
		refs.set(this.__ptr__, this)
	}
}

/**
 * Call this function when you are finished using an object. After calling
 * this, it should never be used again, or the DOM bindings may fail to work
 * properly.
 */
export function unbind(o: Object): void {
	refs.delete(o.__ptr__)
}
