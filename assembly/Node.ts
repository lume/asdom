import {idToNullOrObject} from './utils'
import {
	nodeAppendChild,
	nodeRemoveChild,
	getFirstChild,
	cloneNode,
	getParentNode,
	getChildNodes,
	getNextSibling,
	getPreviousSibling,
	getLastChild,
	getParentElement,
} from './imports'
import {NodeList} from './NodeList'
import {EventTarget} from './EventTarget'

/** Node types: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType */
enum NodeType {
	ELEMENT_NODE = 1,
	ATTRIBUTE_NODE = 2,
	TEXT_NODE = 3,
	CDATA_SECTION_NODE = 4,
	// 5 and 6 are deprecated and skipped.
	PROCESSING_INSTRUCTION_NODE = 7,
	COMMENT_NODE = 8,
	DOCUMENT_NODE = 9,
	DOCUMENT_TYPE_NODE = 10,
	DOCUMENT_FRAGMENT_NODE = 11,
	// 12 is deprecated and skipped.
}

export abstract class Node extends EventTarget {
	static ELEMENT_NODE: NodeType = NodeType.ELEMENT_NODE
	static ATTRIBUTE_NODE: NodeType = NodeType.ATTRIBUTE_NODE
	static TEXT_NODE: NodeType = NodeType.TEXT_NODE
	static CDATA_SECTION_NODE: NodeType = NodeType.CDATA_SECTION_NODE
	static PROCESSING_INSTRUCTION_NODE: NodeType = NodeType.PROCESSING_INSTRUCTION_NODE
	static COMMENT_NODE: NodeType = NodeType.COMMENT_NODE
	static DOCUMENT_NODE: NodeType = NodeType.DOCUMENT_NODE
	static DOCUMENT_TYPE_NODE: NodeType = NodeType.DOCUMENT_TYPE_NODE
	static DOCUMENT_FRAGMENT_NODE: NodeType = NodeType.DOCUMENT_FRAGMENT_NODE

	appendChild<T extends Node>(child: T): T {
		nodeAppendChild(this.__ptr__, child.__ptr__)
		return child
	}

	removeChild<T extends Node>(child: T): T {
		nodeRemoveChild(this.__ptr__, child.__ptr__)
		return child
	}

	abstract get nodeType(): NodeType

	get parentNode(): Node | null {
		const id: i32 = getParentNode(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	get parentElement(): Node | null {
		const id: i32 = getParentElement(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	get firstChild(): Node | null {
		const id: i32 = getFirstChild(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	get lastChild(): Node | null {
		const id: i32 = getLastChild(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	get nextSibling(): Node | null {
		const id: i32 = getNextSibling(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	get previousSibling(): Node | null {
		const id: i32 = getPreviousSibling(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Node
	}

	cloneNode(deep: boolean = false): Node {
		const id: i32 = cloneNode(this.__ptr__, deep)
		return idToNullOrObject(id) as Node // The result must not be null if we just cloned a Node.
	}

	private __childNodes: NodeList<Node> | null = null

	get childNodes(): NodeList<Node> {
		let childNodes = this.__childNodes
		if (!childNodes) {
			childNodes = new NodeList()
			this.__childNodes = childNodes
		}
		getChildNodes(this.__ptr__, childNodes.__ptr__)
		return childNodes
	}
}
