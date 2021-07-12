import {getLength, item} from './imports'
import {Node} from './Node'
import {Object} from './Object'
import {idToNullOrNode} from './utils'

export class NodeList extends Object {
	get length(): i32 {
		return getLength(this.__ptr__)
	}

	item(index: i32): Node | null {
		const id: i32 = item(this.__ptr__, index)
		return idToNullOrNode(id)
	}

	@operator('[]')
	private arrayRead(index: i32): Node | null {
		return this.item(index)
	}

	@operator('[]=')
	private arrayWrite(index: i32, right: Node): void {
		ERROR('NodeList is not writable.')
	}

	// The name must be "key" in AS (can be anything in TS). Open issue:
	readonly [key: number]: Node | null
}
