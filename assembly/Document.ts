import {
	createElement,
	createTextNode,
	getBody,
	getChildren,
	getFirstElementChild,
	getLastElementChild,
	getLocation,
	getUrl,
	querySelector,
	querySelectorAll,
	setOnclick,
} from './imports'
// TODO Perhaps put these on a new `window` object, to make it more like on the JS side.
import {Element, HTMLBodyElement, HTMLElement} from './elements/index'
import {idToNullOrObject} from './utils'
import {Node} from './Node'
import {Text} from './Text'
import {NodeList} from './NodeList'
import {HTMLCollection} from './HTMLCollection'
import {Location} from './Location'

export class Document extends Node {
	get nodeType(): i32 {
		return 9
	}

	get URL(): string {
		return getUrl(this.__ptr__)
	}

	// @ts-expect-error
	get body(): HTMLBodyElement | null {
		const id: i32 = getBody(this.__ptr__)

		// TODO restore after issue is fixed: https://github.com/AssemblyScript/assemblyscript/issues/1976
		// return idToNullOrObject(id) as Element | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as HTMLBodyElement
	}

	set body(el: HTMLBodyElement) {
		throw new Error('TODO: document.body setter is not implemented yet.')
	}

	private __location: Location | null = null

	get location(): Location {
		let obj = this.__location

		if (!obj) {
			this.__location = obj = new Location()
			getLocation(this.__ptr__, obj.__ptr__)
		}

		return obj
	}

	set location(l: Location) {
		ERROR('The setter for window.location cannot currently take a string. Use window.location.href instead.')
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

	createElement(tagName: string /*, TODO options */): HTMLElement {
		const id: i32 = createElement(this.__ptr__, tagName)
		return idToNullOrObject(id) as HTMLElement
	}

	// TODO, for SVG elements.
	// createElementNS(ns, name, options) { }

	/**
	 * Creates a text string from the specified value.
	 * @param data String that specifies the nodeValue property of the text node.
	 */
	createTextNode(data: string): Text {
		const id: i32 = createTextNode(this.__ptr__, data)
		return idToNullOrObject(id) as Text
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
		// return idToNullOrObject(id) as Node | null
		const result = idToNullOrObject(id)
		if (!result) return null
		else return result as Element
	}

	querySelectorAll(selectors: string): NodeList<Element> {
		const id = querySelectorAll(this.__ptr__, selectors)
		return idToNullOrObject(id) as NodeList<Element>
	}
}
