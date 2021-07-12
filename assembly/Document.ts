// TODO Perhaps put these on a new `window` object, to make it more like on the JS side.
import {
	Element,
	Audio,
	HTMLBodyElement,
	HTMLAnchorElement,
	HTMLDivElement,
	HTMLParagraphElement,
	HTMLScriptElement,
	HTMLSpanElement,
	HTMLTemplateElement,
	HTMLUnknownElement,
	Image,
	HTMLHeadingElement,
} from './elements/index'
import {makeObject} from './utils'
import {createTextNode, documentHasBody, getUrl, querySelector, setDocument, setElement, trackNextRef} from './imports'
import {Node} from './Node'
import {refs} from './refs'
import {Text} from './Text'

export class Document extends Node {
	get nodeType(): i32 {
		return 9
	}

	constructor() {
		super()
		setDocument(this.__ptr__)
	}

	get URL(): string {
		return getUrl(this.__ptr__)
	}

	// @ts-expect-error
	get body(): HTMLBodyElement | null {
		let el: HTMLBodyElement

		if (documentHasBody(this.__ptr__)) {
			el = new HTMLBodyElement()
			setElement(this.__ptr__, el.__ptr__, 'body')
		} else {
			return null
		}

		return el
	}
	set body(el: HTMLBodyElement) {
		throw ERROR('TODO: document.body setter is not implemented yet.')
	}

	createElement(tag: string /*, TODO options */): Element {
		let el: Element

		// Don't forget to add Elements here so they can be created with `document.createElement`.
		if (tag == 'body') el = new HTMLBodyElement()
		else if (tag == 'div') el = new HTMLDivElement()
		else if (tag == 'span') el = new HTMLSpanElement()
		else if (tag == 'p') el = new HTMLParagraphElement()
		else if (tag == 'a') el = new HTMLAnchorElement()
		else if (tag == 'script') el = new HTMLScriptElement()
		else if (tag == 'template') el = new HTMLTemplateElement()
		else if (tag == 'audio') el = new Audio()
		else if (tag == 'img') el = new Image()
		else if (tag == 'h1') el = new HTMLHeadingElement()
		else if (tag == 'h2') el = new HTMLHeadingElement()
		else if (tag == 'h3') el = new HTMLHeadingElement()
		else if (tag == 'h4') el = new HTMLHeadingElement()
		else if (tag == 'h5') el = new HTMLHeadingElement()
		else if (tag == 'h6') el = new HTMLHeadingElement()
		else if (tag.indexOf('-') > -1)
			throw new Error('TODO: Elements with hyphens or custom elements not supported yet.')
		else el = new HTMLUnknownElement()

		setElement(this.__ptr__, el.__ptr__, tag)

		return el
	}

	// TODO, for SVG elements.
	// createElementNS(ns, name, options) { }

	/**
	 * Creates a text string from the specified value.
	 * @param data String that specifies the nodeValue property of the text node.
	 */
	createTextNode(data: string): Text {
		const text = new Text()
		createTextNode(this.__ptr__, text.__ptr__, data)
		return text
	}

	querySelector(selectors: string): Element | null {
		const id = querySelector(this.__ptr__, selectors)

		// if null, it means there is no element on the JS-side.
		if (id == 0) return null
		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instance based on its type.
		else if (id < 0) {
			const el = makeObject(-id)

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			// trackNextElement(document.__ptr__, el.__ptr__)
			trackNextRef(el.__ptr__)

			return el as Element
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
			return refs.get(id) as Element // It must be a Node.
		}
	}
}

export const document = new Document()
