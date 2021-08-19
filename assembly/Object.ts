import {toString} from './imports'

/**
 * The base class that all objects extend from.
 */
export class Object {
	toString(): string {
		return toString(this)
	}
}
