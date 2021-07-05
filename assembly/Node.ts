import {document} from './Document'
import {
	Audio,
	HTMLAnchorElement,
	HTMLBodyElement,
	HTMLDivElement,
	HTMLHeadingElement,
	HTMLParagraphElement,
	HTMLScriptElement,
	HTMLSpanElement,
	HTMLTemplateElement,
	HTMLUnknownElement,
	Image,
} from './elements/index'
import {Object} from './Object'
import {refs} from './refs'

// @ts-expect-error
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: usize, childId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: usize, childId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'getParentNode')
declare function getParentNode(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'getFirstChild')
export declare function getFirstChild(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'cloneNode')
export declare function cloneNode(id: usize, deep?: boolean): i32

// @ts-expect-error
@external('asDOM_Node', 'log')
declare function log(msg: string): void

// @ts-expect-error
@external('asDOM_Document', 'trackNextElement')
declare function trackNextElement(docId: usize, elId: usize): void

// TODO Put this in a file shared between glue code and AS code. We need to
// convert the glue code to TypeScript first, or compile the shared file to
// plain JS.
enum ElementType {
	unknown = 1,
	body = 2,
	div = 3,
	span = 4,
	p = 5,
	a = 6,
	script = 7,
	template = 8,
	audio = 9,
	img = 10,
	h1 = 11,
	h2 = 12,
	h3 = 13,
	h4 = 14,
	h5 = 15,
	h6 = 16,
}

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
			trackNextElement(document.__ptr__, el.__ptr__)

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
			trackNextElement(document.__ptr__, el.__ptr__)

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
			trackNextElement(document.__ptr__, el.__ptr__)

			return el
		}

		throw new Error('This should not happen.')
	}
}

function makeNode(type: ElementType): Node {
	let el: Node

	if (type == ElementType.body) el = new HTMLBodyElement()
	else if (type == ElementType.div) el = new HTMLDivElement()
	else if (type == ElementType.span) el = new HTMLSpanElement()
	else if (type == ElementType.p) el = new HTMLParagraphElement()
	else if (type == ElementType.a) el = new HTMLAnchorElement()
	else if (type == ElementType.script) el = new HTMLScriptElement()
	else if (type == ElementType.template) el = new HTMLTemplateElement()
	else if (type == ElementType.audio) el = new Audio()
	else if (type == ElementType.img) el = new Image()
	else if (type == ElementType.h1) el = new HTMLHeadingElement()
	else if (type == ElementType.h2) el = new HTMLHeadingElement()
	else if (type == ElementType.h3) el = new HTMLHeadingElement()
	else if (type == ElementType.h4) el = new HTMLHeadingElement()
	else if (type == ElementType.h5) el = new HTMLHeadingElement()
	else if (type == ElementType.h6) el = new HTMLHeadingElement()
	else if (type === ElementType.unknown) el = new HTMLUnknownElement()
	else throw new Error('Hyphenated or custom elements not yet supported.')

	return el
}
