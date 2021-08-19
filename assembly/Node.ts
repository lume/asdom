import {idToNullOrObject, valueNotChanged} from './utils'
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
import {Element} from '.'

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
		nodeAppendChild(this, child)
		return child
	}

	removeChild<T extends Node>(child: T): T {
		nodeRemoveChild(this, child)
		return child
	}

	abstract get nodeType(): NodeType

	private __parentNode: Node | null = null

	get parentNode(): Node | null {
		const id: i32 = getParentNode(this)

		if (id == valueNotChanged) return this.__parentNode

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__parentNode = result as Node
		else this.__parentNode = null
		return this.__parentNode
	}

	private __parentElement: Element | null = null

	get parentElement(): Element | null {
		const id: i32 = getParentElement(this)

		if (id == valueNotChanged) return this.__parentElement

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__parentElement = result as Element
		else this.__parentElement = null
		return this.__parentElement
	}

	private __firstChild: Node | null = null

	get firstChild(): Node | null {
		const id: i32 = getFirstChild(this)

		if (id == valueNotChanged) return this.__firstChild

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__firstChild = result as Node
		else this.__firstChild = null
		return this.__firstChild
	}

	private __lastChild: Node | null = null

	get lastChild(): Node | null {
		const id: i32 = getLastChild(this)

		if (id == valueNotChanged) return this.__lastChild

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__lastChild = result as Node
		else this.__lastChild = null
		return this.__lastChild
	}

	private __nextSibling: Node | null = null

	get nextSibling(): Node | null {
		const id: i32 = getNextSibling(this)

		if (id == valueNotChanged) return this.__nextSibling

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__nextSibling = result as Node
		else this.__nextSibling = null
		return this.__nextSibling
	}

	private __previousSibling: Node | null = null

	get previousSibling(): Node | null {
		const id: i32 = getPreviousSibling(this)

		if (id == valueNotChanged) return this.__previousSibling

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__previousSibling = result as Node
		else this.__previousSibling = null
		return this.__previousSibling
	}

	cloneNode(deep: boolean = false): Node {
		const id: i32 = cloneNode(this, deep)
		return idToNullOrObject(id) as Node // The result must not be null if we just cloned a Node.
	}

	private __childNodes: NodeList<Node> | null = null

	get childNodes(): NodeList<Node> {
		let obj = this.__childNodes

		if (!obj) {
			this.__childNodes = obj = new NodeList()
			getChildNodes(this, obj)
		}

		return obj
	}
}
