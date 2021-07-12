import {
	elClick,
	elGetAttribute,
	elGetInnerHTML,
	elGetInnerText,
	elOnClick,
	elSetAttribute,
	elSetInnerHTML,
	elSetInnerText,
	querySelector,
	remove,
} from '../imports'
import {idToNullOrObject} from '../utils'
import {Node} from '../Node'

export abstract class Element extends Node {
	get nodeType(): i32 {
		return 1
	}

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

	get innerText(): string {
		return elGetInnerText(this.__ptr__)
	}
	set innerText(value: string | null) {
		elSetInnerText(this.__ptr__, value)
	}

	click(): void {
		elClick(this.__ptr__)
	}

	set onclick(cb: () => void) {
		elOnClick(this.__ptr__, cb.index)
	}

	remove(): void {
		remove(this.__ptr__)
	}

	querySelector(selectors: string): Element | null {
		const id = querySelector(this.__ptr__, selectors)
		return idToNullOrObject(id) as Element | null
	}
}
