// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(): string

// @ts-expect-error
@external('asDOM_Document', 'setDocument')
export declare function setDocument(id: usize): void

// @ts-expect-error
@external('asDOM_Document', 'setElement')
export declare function setElement(docId: usize, elId: usize, tag: string): void

// @ts-expect-error
@external('asDOM_Document', 'documentHasBody')
export declare function documentHasBody(doc: usize): boolean

// TODO Perhaps put these on a new `window` object, to make it more like on the JS side.
import { Element, Audio, HTMLBodyElement, HTMLAnchorElement, HTMLDivElement, HTMLParagraphElement, HTMLScriptElement, HTMLSpanElement, HTMLTemplateElement, HTMLUnknownElement, Image } from './elements/index'
import { Node } from './Node'

export class Document extends Node {
	constructor() {
		super()
		setDocument(this.__ptr__)
	}

	get URL(): string {
		return getUrl()
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
		throw new Error('TODO: document.body setter is not implemented yet.')
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
		else if (tag.indexOf('-') > -1) throw ERROR('TODO: Elements with hyphens or custom elements not supported yet.')
		else el = new HTMLUnknownElement()

		setElement(this.__ptr__, el.__ptr__, tag)

		return el
	}


	// TODO, for SVG elements.
	// createElementNS(ns, name, options) { }
}

export const document = new Document()
