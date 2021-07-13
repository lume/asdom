import {
	createTextNode,
	documentHasBody,
	getUrl,
	querySelector,
	querySelectorAll,
	setDocument,
	setElement,
} from './imports'
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
import {idToNullOrObject} from './utils'
import {Node} from './Node'
import {Text} from './Text'
import {NodeList} from './NodeList'

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

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	querySelectorAll(selectors: string): NodeList<Element> {
		const id = querySelectorAll(this.__ptr__, selectors)
		return idToNullOrObject(id) as NodeList<Element>
	}
}

export const document = new Document()
