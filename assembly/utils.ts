import {ElementType} from './ElementType'
import {trackNextRef} from './imports'
import {refs} from './refs'
import {
	Node,
	HTMLBodyElement,
	HTMLDivElement,
	HTMLSpanElement,
	HTMLParagraphElement,
	HTMLAnchorElement,
	HTMLScriptElement,
	HTMLTemplateElement,
	Audio,
	Image,
	HTMLHeadingElement,
	HTMLUnknownElement,
} from './index'

export function makeNode(type: ElementType): Node {
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

// Use idToNullOrNode only for APIs that return Node or Node|null!
export function idToNullOrNode(id: i32): Node | null {
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
		return refs.get(id) as Node // It must be a Node. Use idToNullOrNode only for APIs that return Node or Node|null.
	}
}
