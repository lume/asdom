import {CustomElementRegistry} from './CustomElementRegistry'
import {Document} from './Document'
import {getCustomElements, getDocument, setOnclick, trackWindow} from './imports'
import {Object} from './Object'

export class Window extends Object {
	private __document: Document | null = null

	get document(): Document {
		let obj = this.__document

		if (!obj) {
			this.__document = obj = new Document()
			getDocument(this.__ptr__, obj.__ptr__)
		}

		return obj
	}

	private __ceRegistry: CustomElementRegistry | null = null

	get customElements(): CustomElementRegistry {
		let obj = this.__ceRegistry

		if (!obj) {
			this.__ceRegistry = obj = new CustomElementRegistry()
			getCustomElements(this.__ptr__, obj.__ptr__)
		}

		return obj
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
}

export const window = new Window()
trackWindow(window.__ptr__)

export const customElements = window.customElements
export const document = window.document
