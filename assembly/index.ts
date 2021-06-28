import {
	documentHasBody,
	elGetAttribute,
	elGetInnerHTML,
	elSetAttribute,
	elSetInnerHTML,
	nodeAppendChild,
	setDocument,
	setElement,
} from './asdomImports'

export class Node {
	__ptr__: usize = changetype<usize>(this)

	appendChild<T extends Node>(child: T): T {
		nodeAppendChild(this.__ptr__, child.__ptr__)
		return child
	}
}

export class Element extends Node {
	setAttribute(attr: string, value: string | null): void {
		elSetAttribute(this.__ptr__, attr, value)
	}
	getAttribute(attr: string): string | null {
		return elGetAttribute(this.__ptr__, attr)
	}

	get innerHTML(): string {
		return elGetInnerHTML(this.__ptr__)
	}
	set innerHTML(value: string | null) {
		elSetInnerHTML(this.__ptr__, value)
	}
}

export class HTMLElement extends Element {}
export class HTMLBodyElement extends HTMLElement {}
export class HTMLDivElement extends HTMLElement {}
export class HTMLSpanElement extends HTMLElement {}
export class HTMLParagraphElement extends HTMLElement {}
export class HTMLAnchorElement extends HTMLElement {}
export class HTMLScriptElement extends HTMLElement {}
export class HTMLTemplateElement extends HTMLElement {}
export class HTMLUnknownElement extends HTMLElement {}

export class Document extends Node {
	constructor() {
		super()
		setDocument(this.__ptr__)
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

		if (tag == 'div') el = new HTMLDivElement()
		else if (tag == 'span') el = new HTMLSpanElement()
		else if (tag == 'p') el = new HTMLParagraphElement()
		else if (tag == 'a') el = new HTMLAnchorElement()
		else if (tag == 'script') el = new HTMLScriptElement()
		else if (tag == 'template') el = new HTMLTemplateElement()
		else if (tag.includes('-')) throw new Error('TODO: Handle elements with hyphens or custom elements.')
		else el = new HTMLUnknownElement()

		setElement(this.__ptr__, el.__ptr__, tag)

		return el
	}
}

// const b: HTMLBodyElement = new Document().body
// new Document().body = null
