import {document} from './Document'
import {
	Audio,
	DocumentFragment,
	Element,
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
} from './elements'

// @ts-expect-error
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: usize, childId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: usize, childId: usize): void

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
enum ElementTypes {
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

export class Node {
	__ptr__: usize = changetype<usize>(this)

	// All children, in no partiular order.
	private __children: Map<usize, Node> = new Map()

	appendChild<T extends Node>(child: T): T {
		nodeAppendChild(this.__ptr__, child.__ptr__)

		// if (child instanceof DocumentFragment)
		// 	this.__children.set(child.__ptr__, child)
		// else
			this.__children.set(child.__ptr__, child)

		return child
	}

	removeChild<T extends Node>(child: T): T {
		nodeRemoveChild(this.__ptr__, child.__ptr__)
		this.__children.delete(child.__ptr__)
		return child
	}

	get firstChild(): Node | null {
		const id: i32 = getFirstChild(this.__ptr__)

		log('AS: first child ID:' + id.toString())

		// if null, it means there is no firstChild on the JS-side.
		if (id == 0) return null
		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instanced based on its type.
		else if (id < 0) {
			let child: Element

			if (-id == ElementTypes.body) child = new HTMLBodyElement()
			else if (-id == ElementTypes.div) child = new HTMLDivElement()
			else if (-id == ElementTypes.span) child = new HTMLSpanElement()
			else if (-id == ElementTypes.p) child = new HTMLParagraphElement()
			else if (-id == ElementTypes.a) child = new HTMLAnchorElement()
			else if (-id == ElementTypes.script) child = new HTMLScriptElement()
			else if (-id == ElementTypes.template) child = new HTMLTemplateElement()
			else if (-id == ElementTypes.audio) child = new Audio()
			else if (-id == ElementTypes.img) child = new Image()
			else if (-id == ElementTypes.h1) child = new HTMLHeadingElement()
			else if (-id == ElementTypes.h2) child = new HTMLHeadingElement()
			else if (-id == ElementTypes.h3) child = new HTMLHeadingElement()
			else if (-id == ElementTypes.h4) child = new HTMLHeadingElement()
			else if (-id == ElementTypes.h5) child = new HTMLHeadingElement()
			else if (-id == ElementTypes.h6) child = new HTMLHeadingElement()
			else if (-id === ElementTypes.unknown) child = new HTMLUnknownElement()
			else throw new Error('Hyphenated or custom elements not yet supported.')

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			trackNextElement(document.__ptr__, child.__ptr__)

			this.__children.set(child.__ptr__, child)

			return child
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
			return this.__children.get(id)
		}
	}

	cloneNode(deep: boolean = false): Node {
		const id: i32 = cloneNode(this.__ptr__, deep)

		log('AS: cloned node ID:' + id.toString())

		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instanced based on its type.
		if (id < 0) {
			let clone: Node

			if (-id == ElementTypes.body) clone = new HTMLBodyElement()
			else if (-id == ElementTypes.div) clone = new HTMLDivElement()
			else if (-id == ElementTypes.span) clone = new HTMLSpanElement()
			else if (-id == ElementTypes.p) clone = new HTMLParagraphElement()
			else if (-id == ElementTypes.a) clone = new HTMLAnchorElement()
			else if (-id == ElementTypes.script) clone = new HTMLScriptElement()
			else if (-id == ElementTypes.template) clone = new HTMLTemplateElement()
			else if (-id == ElementTypes.audio) clone = new Audio()
			else if (-id == ElementTypes.img) clone = new Image()
			else if (-id == ElementTypes.h1) clone = new HTMLHeadingElement()
			else if (-id == ElementTypes.h2) clone = new HTMLHeadingElement()
			else if (-id == ElementTypes.h3) clone = new HTMLHeadingElement()
			else if (-id == ElementTypes.h4) clone = new HTMLHeadingElement()
			else if (-id == ElementTypes.h5) clone = new HTMLHeadingElement()
			else if (-id == ElementTypes.h6) clone = new HTMLHeadingElement()
			else if (-id === ElementTypes.unknown) clone = new HTMLUnknownElement()
			else throw new Error('Hyphenated or custom elements not yet supported.')

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			trackNextElement(document.__ptr__, clone.__ptr__)

			return clone
		}

		throw new Error('This should not happen.')
	}
}
