import {toString} from './imports'

/**
 * The base class that all objects extend from.
 */
export class Object {
	__ptr__: usize = changetype<usize>(this)

	toString(): string {
		return toString(this.__ptr__)
	}
}
