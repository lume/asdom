/**
 * The base class that all objects extend from.
 */
export class Object {
	__ptr__: usize = changetype<usize>(this)
}
