// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(id: usize): string

// @ts-expect-error
@external('asDOM_Document', 'setDocument')
export declare function setDocument(id: usize): void

// @ts-expect-error
@external('asDOM_Document', 'setElement')
export declare function setElement(docId: usize, elId: usize, tag: string): void

// @ts-expect-error
@external('asDOM_Document', 'documentHasBody')
export declare function documentHasBody(doc: usize): boolean

// @ts-expect-error
@external('asDOM_Document', 'createTextNode')
export declare function createTextNode(docId: usize, textId: usize, data: string): void

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
import {Node} from './Node'
import {Text} from './Text'

export class Document extends Node {
	get nodeType(): i32 { return 9 }

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
		else if (tag.indexOf('-') > -1) throw ERROR('TODO: Elements with hyphens or custom elements not supported yet.')
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
		const text = new Text
		createTextNode(this.__ptr__, text.__ptr__, data)
		return text
	}
}

export const document = new Document()
