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
import {idToNullOrObject, valueNotChanged} from './utils'
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
		return getUrl(this)
	}

	// Pattern: A value that can change, but if it hasn't changed, we should
	// return early rather than create a mirror object. We could prevent the
	// crossing to JS entirely, but that would only work assuming our AS code
	// is the only code manipulating the DOM. By crossing to JS, we also catch
	// the case where some other code on the JS side could change the value.
	//
	// {{

	private __body: HTMLBodyElement | null = null

	// @ts-expect-error, TS does not allow a getter type to be a superset of the setter type, only the other way around.
	get body(): HTMLBodyElement | null {
		const id: i32 = getBody(this)

		if (id == valueNotChanged) return this.__body

		// TODO NULL File a bug and eventually use this. This incorrectly returns `null` instead of the non-null instance... {{

		// return (this.__querySelector = idToNullOrObject(id) as Element | null) // The old value can then be GC'd.

		// }} ...but this version works fine only when the value is not actually null. {{

		// this.__querySelector = idToNullOrObject(id) as Element | null // The old value can then be GC'd.
		// return this.__querySelector

		// }} And finally, this is what works when the value might be null (issue https://github.com/AssemblyScript/assemblyscript/issues/2035) {{

		const result = idToNullOrObject(id)
		if (result) this.__body = result as HTMLBodyElement
		else this.__body = null
		return this.__body

		// }}
	}

	set body(el: HTMLBodyElement) {
		throw new Error('TODO: document.body setter is not implemented yet.')
	}

	// }}

	// Pattern: A value that we know can't ever change, so we can cache the
	// mirror object after the first call. {{

	private __location: Location | null = null

	get location(): Location {
		let obj = this.__location

		if (!obj) {
			this.__location = obj = new Location()
			getLocation(this, obj)
		}

		return obj
	}

	set location(l: Location) {
		ERROR('The setter for window.location cannot currently take a string. Use window.location.href instead.')
	}

	// }}

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

	createElement(tagName: string /*, TODO options */): HTMLElement {
		const id: i32 = createElement(this, tagName)
		return idToNullOrObject(id) as HTMLElement
	}

	// TODO, for SVG elements.
	// createElementNS(ns, name, options) { }

	/**
	 * Creates a text string from the specified value.
	 * @param data String that specifies the nodeValue property of the text node.
	 */
	createTextNode(data: string): Text {
		const id: i32 = createTextNode(this, data)
		return idToNullOrObject(id) as Text
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
