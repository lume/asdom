import {
	elClick,
	elGetAttribute,
	getInnerHTML,
	setOnclick,
	elSetAttribute,
	setInnerHTML,
	getChildren,
	getFirstElementChild,
	getLastElementChild,
	getNextElementSibling,
	getPreviousElementSibling,
	querySelector,
	querySelectorAll,
	remove,
	getTagName,
	attachShadow,
} from '../imports'
import {idToNullOrObject} from '../utils'
import {Node} from '../Node'
import {HTMLCollection} from '../HTMLCollection'
import {NodeList} from '../NodeList'
import {ShadowRoot} from '../nodes/ShadowRoot'

export abstract class Element extends Node {
	get nodeType(): i32 {
		return 1
	}

	get tagName(): string {
		return getTagName(this.__ptr__)
	}

	setAttribute(attr: string, value: string | null): void {
		elSetAttribute(this.__ptr__, attr, value)
	}
	getAttribute(attr: string): string | null {
		return elGetAttribute(this.__ptr__, attr)
	}

	get innerHTML(): string {
		return getInnerHTML(this.__ptr__)
	}
	set innerHTML(value: string | null) {
		setInnerHTML(this.__ptr__, value)
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

	private __onclick: (() => void) | null = null

	set onclick(cb: (() => void) | null) {
		this.__onclick = cb
		setOnclick(this.__ptr__, cb ? cb.index : -1) // -1 means "null"
	}

	get onclick(): (() => void) | null {
		// For now there is no glue code here, and we assume manipulation of this
		// property happens only on the AS-side. TODO Eventually we'll have to
		// figure how to "get" a function that may already exist on the JS side
		// to be able to call it, for example, in a monkey patch.
		// return getOnclick()
		return this.__onclick
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

	private __shadowRoot: ShadowRoot | null = null

	get shadowRoot(): ShadowRoot | null {
		return this.__shadowRoot
	}

	attachShadow(options: ShadowRootInit): ShadowRoot {
		const root = new ShadowRoot()
		attachShadow(this.__ptr__, root.__ptr__, options.mode)
		if (options.mode == 'open') this.__shadowRoot = root
		return root
	}
}

export class ShadowRootInit {
	mode: string
}
