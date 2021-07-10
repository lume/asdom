import {makeNode} from './ElementType'
import {nodeAppendChild, nodeRemoveChild, log, trackNextRef, getFirstChild, cloneNode, getParentNode} from './imports'
import {Object} from './Object'
import {refs} from './refs'

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

export abstract class Node extends Object {
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

	// This property exists only for a small optimization in the first early
	// return of parentNode. Is it even worth it?
	private __parent: Node | null

	get parentNode(): Node | null {
		const id: i32 = getParentNode(this.__ptr__)

		log('AS: parent node ID:' + id.toString())

		const parent = this.__parent

		if (parent && parent.__ptr__ == id) return parent
		else if (id > 0) {
			this.__parent = refs.get(id as usize) as Node // It must be a Node.
			return this.__parent
		}

		// if null, it means there is no element on the JS-side.
		else if (id == 0) {
			this.__parent = null
			return null
		}
		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instance based on its type.
		else if (id < 0) {
			const el = makeNode(-id)

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			// trackNextElement(document.__ptr__, el.__ptr__)
			trackNextRef(el.__ptr__)

			this.__parent = el
			return el
		}

		throw new Error('This should not happen.')
	}

	get firstChild(): Node | null {
		const id: i32 = getFirstChild(this.__ptr__)

		log('AS: first child ID:' + id.toString())

		// if null, it means there is no element on the JS-side.
		if (id == 0) return null
		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instance based on its type.
		else if (id < 0) {
			const el = makeNode(-id)

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			// trackNextElement(document.__ptr__, el.__ptr__)
			trackNextRef(el.__ptr__)

			return el
		}

		// If we reach here then there is already an AS-side instance
		// associated with a JS-side instance, and the JS side gave us the ID
		// (pointer) of our AS-side object to return. We might reach here, for
		// example, if we use appendChild to pass an existing child within AS
		// instead of using innerHTML. By using innerHTML and sending a string
		// to JS, it can create a whole tree but none of those nodes will be
		// tracked. Finally, if we do try to access them, we lazily associate
		// new AS-side objects in the previous conditional block.
		else {
			return refs.get(id) as Node // It must be a Node.
		}
	}

	cloneNode(deep: boolean = false): Node {
		const id: i32 = cloneNode(this.__ptr__, deep)

		log('AS: cloned node ID:' + id.toString())

		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instance based on its type.
		if (id < 0) {
			const el = makeNode(-id)

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			// trackNextElement(document.__ptr__, el.__ptr__)
			trackNextRef(el.__ptr__)

			return el
		}

		throw new Error('This should not happen.')
	}
}
