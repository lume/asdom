import {HTMLCollection, Element, NodeList} from '.'
import {getChildren, getFirstElementChild, getLastElementChild, querySelector, querySelectorAll} from './imports'
import {Node} from './Node'
import {idToNullOrObject, valueNotChanged} from './utils'

export class DocumentFragment extends Node {
	get nodeType(): i32 {
		return 11
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
}
