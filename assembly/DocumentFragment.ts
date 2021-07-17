import {HTMLCollection, Element, NodeList} from '.'
import {getChildren, getFirstElementChild, getLastElementChild, querySelector, querySelectorAll} from './imports'
import {Node} from './Node'
import {idToNullOrObject} from './utils'

export class DocumentFragment extends Node {
	get nodeType(): i32 {
		return 11
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
