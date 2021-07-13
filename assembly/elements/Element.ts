import {
	elClick,
	elGetAttribute,
	elGetInnerHTML,
	elGetInnerText,
	elOnClick,
	elSetAttribute,
	elSetInnerHTML,
	elSetInnerText,
	getChildren,
	getFirstElementChild,
	getLastElementChild,
	getNextElementSibling,
	getPreviousElementSibling,
	querySelector,
	querySelectorAll,
	remove,
} from '../imports'
import {idToNullOrObject} from '../utils'
import {Node} from '../Node'
import {HTMLCollection} from '../HTMLCollection'
import {NodeList} from '../NodeList'

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

	private __children: HTMLCollection | null = null

	get children(): HTMLCollection {
		let children = this.__children
		if (!children) {
			children = new HTMLCollection()
			this.__children = children
		}
		getChildren(this.__ptr__, children.__ptr__)
		return children
	}

	get firstElementChild(): Element | null {
		const id: i32 = getFirstElementChild(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	get lastElementChild(): Element | null {
		const id: i32 = getLastElementChild(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	get nextElementSibling(): Element | null {
		const id: i32 = getNextElementSibling(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	get previousElementSibling(): Element | null {
		const id: i32 = getPreviousElementSibling(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
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

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	querySelectorAll(selectors: string): NodeList<Element> {
		const id = querySelectorAll(this.__ptr__, selectors)
		return idToNullOrObject(id) as NodeList<Element>
	}
}
