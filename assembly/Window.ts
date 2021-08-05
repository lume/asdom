import {CustomElementRegistry} from './CustomElementRegistry'
import {Document} from './Document'
import {
	getCustomElements,
	getDocument,
	getHistory,
	getLocation,
	setOnclick,
	setOnpopstate,
	trackWindow,
} from './imports'
import {History} from './History'
import {EventTarget} from './EventTarget'
import {Location} from './Location'

export class Window extends EventTarget {
	private __document: Document | null = null

	get document(): Document {
		let obj = this.__document

		if (!obj) {
			this.__document = obj = new Document()
			getDocument(this.__ptr__, obj.__ptr__)
		}

		return obj
	}

	private __customElements: CustomElementRegistry | null = null

	get customElements(): CustomElementRegistry {
		let obj = this.__customElements

		if (!obj) {
			this.__customElements = obj = new CustomElementRegistry()
			getCustomElements(this.__ptr__, obj.__ptr__)
		}

		return obj
	}

	private __history: History | null = null

	get history(): History {
		let obj = this.__history

		if (!obj) {
			this.__history = obj = new History()
			getHistory(this.__ptr__, obj.__ptr__)
		}

		return obj
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

	private __onpopstate: (() => void) | null = null

	set onpopstate(cb: (() => void) | null) {
		this.__onpopstate = cb
		setOnpopstate(this.__ptr__, cb ? cb.index : -1) // -1 means "null"
	}

	get onpopstate(): (() => void) | null {
		// For now there is no glue code here, and we assume manipulation of this
		// property happens only on the AS-side. TODO Eventually we'll have to
		// figure how to "get" a function that may already exist on the JS side
		// to be able to call it, for example, in a monkey patch.
		// return getOnpopstate()
		return this.__onpopstate
	}
}

export const window = new Window()
trackWindow(window.__ptr__)

// export "globals"
export const document = window.document
export const customElements = window.customElements
export const history = window.history
