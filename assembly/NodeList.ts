import {getLength, item} from './imports'
import {Node} from './Node'
import {JSObject} from './JSObject'
import {idToNullOrObject, valueNotChanged} from './utils'

// TODO replace `Node` with a generic `T` type to allow other classes to specify more specific types in certain cases. For example, `querySelectorAll` can return `NodeList<Element>`.
export class NodeList<T extends Node> extends JSObject {
	get length(): i32 {
		return getLength(this)
	}

	private __item: T | null = null

	item(index: i32): T | null {
		const id: i32 = item(this, index)

		if (id == valueNotChanged) return this.__item

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id) // The old value can then be GC'd.
		if (result) this.__item = result as T
		else this.__item = null
		return this.__item
	}

	@operator('[]')
	private arrayRead(index: i32): T | null {
		return this.item(index)
	}

	@operator('[]=')
	private arrayWrite(index: i32, value: T): void {
		ERROR('NodeList is not writable.')
	}

	// This makes TypeScript happy.
	// The name must be "key" in AS (can be anything in TS). Open issue: https://github.com/AssemblyScript/assemblyscript/issues/1972
	readonly [key: number]: T | null
}
