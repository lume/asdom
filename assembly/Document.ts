// @ts-ignore
@external('asDOM_Document', 'getUrl')
export declare function getUrl(): string

// @ts-ignore
@external('asDOM_Document', 'setDocument')
export declare function setDocument(id: usize): void

// @ts-ignore
@external('asDOM_Document', 'setElement')
export declare function setElement(docId: usize, elId: usize, tag: string): void

// @ts-ignore
@external('asDOM_Document', 'documentHasBody')
export declare function documentHasBody(doc: usize): boolean

// TODO Perhaps put these on a new `window` objects, to make it more like on the JS side.
import { Element, HTMLBodyElement, HTMLAnchorElement, HTMLDivElement, HTMLParagraphElement, HTMLScriptElement, HTMLSpanElement, HTMLTemplateElement, HTMLUnknownElement } from './Element'
import { Node } from './Node'
import { Audio } from './Audio'

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

	createElement(tag: string): Element {
		let el: Element

		// Don't forget to add Elements here so they can be created with `document.createElement`.
		if (tag == 'div') el = new HTMLDivElement()
		else if (tag == 'span') el = new HTMLSpanElement()
		else if (tag == 'p') el = new HTMLParagraphElement()
		else if (tag == 'a') el = new HTMLAnchorElement()
		else if (tag == 'script') el = new HTMLScriptElement()
		else if (tag == 'template') el = new HTMLTemplateElement()
		else if (tag == 'audio') el = new Audio()
		else if (tag.indexOf('-') > -1) throw ERROR('TODO: Handle elements with hyphens or custom elements.')
		else el = new HTMLUnknownElement()

		setElement(this.__ptr__, el.__ptr__, tag)

		return el
	}
}

export const document = new Document()
