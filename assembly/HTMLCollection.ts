import {getLength, item} from './imports'
import {Element} from './elements/Element'
import {JSObject} from './JSObject'
import {idToNullOrObject, valueNotChanged} from './utils'

export class HTMLCollection extends JSObject {
	get length(): i32 {
		return getLength(this)
	}

	private __item: Element | null = null

	item(index: i32): Element | null {
		const id: i32 = item(this, index)

		if (id == valueNotChanged) return this.__item

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id) // The old value can then be GC'd.
		if (result) this.__item = result as Element
		else this.__item = null
		return this.__item
	}

	@operator('[]')
	private arrayRead(index: i32): Element | null {
		return this.item(index)
	}

	@operator('[]=')
	private arrayWrite(index: i32, value: Element): void {
		ERROR('NodeList is not writable.')
	}

	// This makes TypeScript happy.
	// The name must be "key" in AS (can be anything in TS). Open issue: https://github.com/AssemblyScript/assemblyscript/issues/1972
	readonly [key: number]: Element | null
}
