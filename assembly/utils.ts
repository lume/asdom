import {ObjectType} from './ObjectType'
import {log, trackNextRef} from './imports'
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
	Text,
	Object,
} from './index'

export const DEBUG: boolean = true

export function makeObject(type: ObjectType): Object {
	let obj: Node

	// Elements
	if (type == ObjectType.body) obj = new HTMLBodyElement()
	else if (type == ObjectType.div) obj = new HTMLDivElement()
	else if (type == ObjectType.span) obj = new HTMLSpanElement()
	else if (type == ObjectType.p) obj = new HTMLParagraphElement()
	else if (type == ObjectType.a) obj = new HTMLAnchorElement()
	else if (type == ObjectType.script) obj = new HTMLScriptElement()
	else if (type == ObjectType.template) obj = new HTMLTemplateElement()
	else if (type == ObjectType.audio) obj = new Audio()
	else if (type == ObjectType.img) obj = new Image()
	else if (type == ObjectType.h1) obj = new HTMLHeadingElement()
	else if (type == ObjectType.h2) obj = new HTMLHeadingElement()
	else if (type == ObjectType.h3) obj = new HTMLHeadingElement()
	else if (type == ObjectType.h4) obj = new HTMLHeadingElement()
	else if (type == ObjectType.h5) obj = new HTMLHeadingElement()
	else if (type == ObjectType.h6) obj = new HTMLHeadingElement()
	else if (type === ObjectType.unknown) obj = new HTMLUnknownElement()
	// Text nodes
	else if (type === ObjectType.text) obj = new Text()
	// Anything else
	else throw new Error('Hyphenated or custom elements not yet supported.')

	return obj
}

// Use this only for APIs that return Node or Node|null!
export function idToNullOrObject(id: i32): Object | null {
	if (DEBUG) log('AS DEBUG: idToNullOrObject, ' + id.toString())

	// if null, it means there is no element on the JS-side.
	if (id == 0) {
		if (DEBUG) log('AS DEBUG: idToNullOrObject returning null')

		return null
	}
	// If negative, there is an element on the JS-side that doesn't have a
	// corresponding AS-side instance yet. In this case we need to
	// create a new instance based on its type.
	else if (id < 0) {
		if (DEBUG) log('AS DEBUG: idToNullOrObject id < 0')

		const obj = makeObject(-id)

		// Associate the AS-side instance with the JS-side instance.
		// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
		// trackNextElement(document.__ptr__, el.__ptr__)
		trackNextRef(obj.__ptr__)

		return obj
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
		if (DEBUG) log('AS DEBUG: idToNullOrObject got reference ID: ' + id.toString())

		return refs.get(id) as Node // It must be a Node. Use this function only for APIs that return Object or Object|null.
	}
}
