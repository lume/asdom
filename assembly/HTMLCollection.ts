import {getLength, item} from './imports'
import {Element} from './elements/Element'
import {Object} from './Object'
import {idToNullOrObject} from './utils'

export class HTMLCollection extends Object {
	get length(): i32 {
		return getLength(this.__ptr__)
	}

	item(index: i32): Element | null {
		const id: i32 = item(this.__ptr__, index)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
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
