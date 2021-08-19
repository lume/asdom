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
	getClientWidth,
	getClientHeight,
} from '../imports'
import {idToNullOrObject, valueNotChanged} from '../utils'
import {Node} from '../Node'
import {HTMLCollection} from '../HTMLCollection'
import {NodeList} from '../NodeList'
import {ShadowRoot} from '../nodes/ShadowRoot'

export abstract class Element extends Node {
	get nodeType(): i32 {
		return 1
	}

	get tagName(): string {
		return getTagName(this)
	}

	setAttribute(attr: string, value: string | null): void {
		elSetAttribute(this, attr, value)
	}
	getAttribute(attr: string): string | null {
		return elGetAttribute(this, attr)
	}

	get innerHTML(): string {
		return getInnerHTML(this)
	}
	set innerHTML(value: string | null) {
		setInnerHTML(this, value)
	}

	private __children: HTMLCollection | null = null

	get children(): HTMLCollection {
		let obj = this.__children

		if (!obj) {
			this.__children = obj = new HTMLCollection()
			getChildren(this, obj)
		}

		return obj
	}

	get clientWidth(): i32 {
		return getClientWidth(this)
	}

	get clientHeight(): i32 {
		return getClientHeight(this)
	}

	private __firstElementChild: Element | null = null

	get firstElementChild(): Element | null {
		const id: i32 = getFirstElementChild(this)

		if (id == valueNotChanged) return this.__firstElementChild

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__firstElementChild = result as Element
		else this.__firstElementChild = null
		return this.__firstElementChild
	}

	private __lastElementChild: Element | null = null

	get lastElementChild(): Element | null {
		const id: i32 = getLastElementChild(this)

		if (id == valueNotChanged) return this.__lastElementChild

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__lastElementChild = result as Element
		else this.__lastElementChild = null
		return this.__lastElementChild
	}

	private __nextElementSibling: Element | null = null

	get nextElementSibling(): Element | null {
		const id: i32 = getNextElementSibling(this)

		if (id == valueNotChanged) return this.__nextElementSibling

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__nextElementSibling = result as Element
		else this.__nextElementSibling = null
		return this.__nextElementSibling
	}

	private __previousElementSibling: Element | null = null

	get previousElementSibling(): Element | null {
		const id: i32 = getPreviousElementSibling(this)

		if (id == valueNotChanged) return this.__previousElementSibling

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__previousElementSibling = result as Element
		else this.__previousElementSibling = null
		return this.__previousElementSibling
	}

	click(): void {
		elClick(this)
	}

	private __onclick: (() => void) | null = null

	set onclick(cb: (() => void) | null) {
		this.__onclick = cb
		setOnclick(this, cb ? cb.index : -1) // -1 means "null"
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
		remove(this)
	}

	private __querySelector: Element | null = null

	querySelector(selectors: string): Element | null {
		const id = querySelector(this, selectors)

		if (id == valueNotChanged) return this.__querySelector

		// TODO update this once null issues fixed (see TODO NULL in Document)
		const result = idToNullOrObject(id)
		if (result) this.__querySelector = result as Element
		else this.__querySelector = null
		return this.__querySelector
	}

	querySelectorAll(selectors: string): NodeList<Element> {
		const id = querySelectorAll(this, selectors)
		return idToNullOrObject(id) as NodeList<Element>
	}

	private __shadowRoot: ShadowRoot | null = null

	get shadowRoot(): ShadowRoot | null {
		return this.__shadowRoot
	}

	attachShadow(options: ShadowRootInit): ShadowRoot {
		const root = new ShadowRoot()
		attachShadow(this, root, options.mode)
		if (options.mode == 'open') this.__shadowRoot = root
		return root
	}
}

export class ShadowRootInit {
	mode: string
}
