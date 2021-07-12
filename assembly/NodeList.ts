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
	private accessOperator(index: i32): Node | null {
		return this.item(index)
	}

	// The name must be "key" in AS (can be anything in TS).
	// TODO open issue
	[key: number]: Node | null
}
