class Refs extends Map {
	/** @type {Map<number, object>} */
	__reverse = new Map()

	/**
	 * @param {number} a
	 * @param {object} b
	 * @return {this}
	 */
	set(a, b) {
		this.__reverse.set(b, a)
		return super.set(a, b)
	}

	/**
	 * @param {object} b
	 * @return {number}
	 */
	keyFrom(b) {
		return this.__reverse.get(b)
	}
}

export class Asdom {
	__refs = new Refs()
	__nextRefToTrack

	// Direct refs to the Wasm module's exports for convenience
	__getString
	__newString
	__getArray
	__newArray
	table
	asdom_connectedCallback
	asdom_disconnectedCallback
	asdom_adoptedCallback
	asdom_attributeChangedCallback
	idof_Arrayi32

	__exports = null

	get wasmExports() {
		return this.__exports
	}
	set wasmExports(e) {
		this.__exports = e

		this.__getString = e.__getString
		this.__newString = e.__newString
		this.__getArray = e.__getArray
		this.__newArray = e.__newArray
		this.table = e.table
		this.asdom_connectedCallback = e.asdom_connectedCallback
		this.asdom_disconnectedCallback = e.asdom_disconnectedCallback
		this.asdom_adoptedCallback = e.asdom_adoptedCallback
		this.asdom_attributeChangedCallback = e.asdom_attributeChangedCallback
		this.idof_Arrayi32 = e.idof_Arrayi32
	}

	fn(fnIndex) {
		return this.table.get(fnIndex)
	}

	/**
	 * @param {number} arrayPtr
	 * @returns {Array<string>}
	 */
	stringArray(arrayPtr) {
		const array = this.__getArray(arrayPtr)
		for (let i = 0, l = array.length; i < l; i += 1) array[i] = this.__getString(array[i])
		return array
	}

	wasmImports = {
		asDOM: {
			trackNextRef: id => {
				const ref = this.__nextRefToTrack

				if (!ref) {
					throw new Error(`
						Bug: This should not happen, trackNextRef should have
						been called synchronously right after an existing ref
						was referenced on the JS-side and an AS-side objet
						created to mirror it.
					`)
				}

				this.__nextRefToTrack = undefined

				// TODO elements need to be associated with documents on the AS-side so they can have ownerDocument properties.
				this.__refs.set(id, ref)
			},
			log: str => {
				if (this.__getString(str) == null || this.__getString(str) === 'null') debugger
				console.log('AS: ' + this.__getString(str))
			},
		},
		asDOM_Window: {
			trackWindow: id => {
				this.__refs.set(id, window)
			},
			/**
			 * @param {number} id
			 * @param {number} ceId
			 */
			getCustomElements: (id, ceId) => {
				/** @type {Window} */
				const window = this.__refs.get(id)
				const ce = window.customElements
				let key = this.__refs.keyFrom(ce)
				if (!key) this.__refs.set((key = ceId), ce)
				return key
			},
		},
		asDOM_CustomElementRegistry: {
			// customElements.define()
			define: (id, tag, factory, attributes) => {
				tag = this.__getString(tag)

				const customElements = this.__refs.get(id)

				const asdom = this

				class AsdomElement extends HTMLElement {
					__asRef = -1

					static get observedAttributes() {
						return asdom.stringArray(attributes)
					}

					constructor() {
						super()

						this.__asRef = asdom.fn(factory)()
						asdom.__refs.set(this.__asRef, this)
					}

					connectedCallback() {
						asdom.asdom_connectedCallback(this.__asRef)
					}

					disconnectedCallback() {
						asdom.asdom_disconnectedCallback(this.__asRef)
					}

					adoptedCallback() {
						asdom.asdom_adoptedCallback(this.__asRef)
					}

					attributeChangedCallback(name, oldVal, newVal) {
						asdom.asdom_attributeChangedCallback(
							this.__asRef,
							asdom.__newString(name),
							asdom.__newString(oldVal),
							asdom.__newString(newVal),
						)
					}
				}

				customElements.define(tag, AsdomElement)
			},
		},
		asDOM_Document: {
			getUrl: id => {
				const document = this.__refs.get(id)
				return this.__newString(document.URL)
			},
			setDocument: id => {
				this.__refs.set(id, document)
			},
			getDocument: id => {
				if (!this.__refs.get(id)) this.wasmImports.asDOM_Document.setDocument(id)
				return this.__refs.get(id)
			},
			setElement: (docId, elId, tag) => {
				tag = this.__getString(tag)
				let el =
					tag === 'body'
						? document.body || thro('bug!')
						: this.wasmImports.asDOM_Document.documentCreateElement(docId, tag)
				this.__refs.set(elId, el)
			},
			trackNextElement: (docId, id) => {
				const ref = this.__nextRefToTrack

				if (!ref) {
					throw new Error(
						'Bug, this should not happen, trackNextElement should have been called synchronously right after an existing element was referenced and an AS-side objet created to mirror it.',
					)
				}

				this.__nextRefToTrack = undefined

				// TODO elements need to be associated with documents on the AS-side so they can have ownerDocument properties.
				this.__refs.set(id, ref)
			},
			getElement: id => {
				return this.__refs.get(id)
			},
			// document.createElement()
			documentCreateElement: (id, tag) => {
				const document = this.__refs.get(id)
				return document.createElement(tag)
			},
			documentHasBody: id => {
				const document = this.__refs.get(id)
				return document.body ? true : false
			},
			// document.createTextNode()
			createTextNode: (docId, textId, data) => {
				const document = this.__refs.get(docId)
				const text = document.createTextNode(this.__getString(data))
				this.__refs.set(textId, text)
			},
		},
		asDOM_Element: {
			// element.innerHTML
			getTagName: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				return this.__newString(el.tagName)
			},
			// element.setAttribute
			elSetAttribute: (id, attr, value) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.setAttribute(this.__getString(attr), this.__getString(value))
			},
			// element.getAttribute
			elGetAttribute: (id, attr) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				return this.__newString(el.getAttribute(this.__getString(attr)))
			},
			// element.innerHTML
			elSetInnerHTML: (id, value) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.innerHTML = this.__getString(value)
			},
			// element.innerHTML
			elGetInnerHTML: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				return this.__newString(el.innerHTML)
			},
			// element.innerText
			elSetInnerText: (id, value) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.innerText = this.__getString(value)
			},
			// element.innerText
			elGetInnerText: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				return this.__newString(el.innerText)
			},
			getChildren: (id, listId) => {
				/** @type {Element} */
				const obj = this.__refs.get(id)
				const list = obj.children
				if (!this.__refs.keyFrom(list)) this.__refs.set(listId, list)
			},
			getFirstElementChild: id => {
				/** @type {Element} */
				const node = this.__refs.get(id)
				const result = node.firstElementChild

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getLastElementChild: id => {
				/** @type {Element} */
				const node = this.__refs.get(id)
				const result = node.lastElementChild

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getNextElementSibling: id => {
				/** @type {Element} */
				const node = this.__refs.get(id)
				const result = node.nextElementSibling

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getPreviousElementSibling: id => {
				/** @type {Element} */
				const node = this.__refs.get(id)
				const result = node.previousElementSibling

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			// element.onclick
			elOnClick: (id, callback) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.onclick = this.fn(callback)
			},
			// element.click()
			elClick: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.click()
			},
			// element.remove()
			remove: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				el.remove()
			},
			querySelector: (id, selectors) => {
				/** @type {Document | Element | DocumentFragment | ShadowRoot} */
				const node = this.__refs.get(id)
				const result = node.querySelector(this.__getString(selectors))
				return this.getKeyOrObjectType(result)
			},
			querySelectorAll: (id, selectors) => {
				/** @type {Document | Element | DocumentFragment | ShadowRoot} */
				const node = this.__refs.get(id)
				const result = node.querySelectorAll(this.__getString(selectors))
				return this.getKeyOrObjectType(result, 202)
			},
		},
		asDOM_Node: {
			// node.appendChild()
			nodeAppendChild: (parentId, childId) => {
				const parent = this.__refs.get(parentId)
				const child = this.__refs.get(childId)
				// We'd actually return the object here when we switch to `externref`.
				/*return*/ parent.appendChild(child)
			},
			// node.removeChild()
			nodeRemoveChild: (parentId, childId) => {
				const parent = this.__refs.get(parentId)
				const child = this.__refs.get(childId)
				// We'd actually return the object here when we switch to `externref`.
				/*return*/ parent.removeChild(child)
			},
			getParentNode: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.parentNode

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getParentElement: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.parentElement

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			// node.firstChild (readonly)
			getFirstChild: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.firstChild

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getLastChild: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.lastChild

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getNextSibling: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.nextSibling

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getPreviousSibling: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const result = node.previousSibling

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			cloneNode: (id, deep = false) => {
				/** @type {Node} */
				const node = this.__refs.get(id)

				const result = node.cloneNode(deep)

				return this.getKeyOrObjectType(result)
			},
			getChildNodes: (id, listId) => {
				/** @type {Node} */
				const obj = this.__refs.get(id)
				const list = obj.childNodes
				if (!this.__refs.keyFrom(list)) this.__refs.set(listId, list)
			},
		},
		asDOM_Audio: {
			initAudio: (id, src) => {
				this.__refs.set(id, new Audio(this.__getString(src)))
			},
			// element.play()
			playAudio: id => {
				const el = this.__refs.get(id)
				el.play()
			},
			// element.pause()
			pauseAudio: id => {
				const el = this.__refs.get(id)
				el.pause()
			},
			// element.autoplay
			setAutoplay: (id, toggle) => {
				const el = this.__refs.get(id)
				el.autoplay = !!toggle
			},
			// element.autoplay
			getAutoplay: id => {
				/** @type {HTMLAudioElement} */
				const el = this.__refs.get(id)
				return el.autoplay
			},
		},
		asDOM_HTMLTemplateElement: {
			// element.content (readonly)
			getContent: (id, fragId) => {
				const el = this.__refs.get(id)
				const frag = el.content
				this.__refs.set(fragId, frag)
			},
		},
		asDOM_NodeList: {
			// list.length
			getLength: id => {
				/** @type {NodeList} */
				const list = this.__refs.get(id)
				return list.length
			},
			item: (id, index) => {
				/** @type {NodeList} */
				const list = this.__refs.get(id)
				const result = list.item(index)

				if (!result) return 0 // null

				// TODO this should be getKeyOrNodeType and consider non-element Nodes too.
				return this.getKeyOrObjectType(result)
			},
		},
	}

	/**
	 * If an JS-side element is tracked, returns the ID of the AS-side element
	 * if it exists, otherwise returns the negated type number of the
	 * element that should be created on the AS-side.  The type number is
	 * negative because the AS-side IDs are only ever positive, so negative
	 * numbers won't collide with IDs within the first IDs between 0 and
	 * 2^31.
	 */
	getKeyOrObjectType(obj, explicitTypeOverride) {
		const key = this.__refs.keyFrom(obj)

		if (!key) {
			this.__nextRefToTrack = obj

			return -(explicitTypeOverride ?? getObjectType(obj))
		}

		return key
	}
}

function thro(err) {
	throw err
}

function getObjectType(obj) {
	// Returning negative means the AS-side should create an instance to track the JS-side object.

	if (obj instanceof Element) {
		const tag = obj.tagName
		if (tag === 'BODY') return 2
		else if (tag === 'DIV') return 3
		else if (tag === 'SPAN') return 4
		else if (tag === 'P') return 5
		else if (tag === 'A') return 6
		else if (tag === 'SCRIPT') return 7
		else if (tag === 'TEMPLATE') return 8
		else if (tag === 'AUDIO') return 9
		else if (tag === 'IMG') return 10
		else if (tag === 'H1') return 11
		else if (tag === 'H2') return 12
		else if (tag === 'H3') return 13
		else if (tag === 'H4') return 14
		else if (tag === 'H5') return 15
		else if (tag === 'H6') return 16
		else if (tag.includes('-')) throw new Error('Hyphenated (possibly-custom) element not supported yet.')
		else return 1 // HTMLUnknownElement
	} else if (obj instanceof Text) {
		return 100
	} else if (obj instanceof HTMLCollection) {
		return 200
	} else if (obj instanceof NodeList) {
		return 201
	}
	// else if (obj instanceof NodeList<Element>) {
	// 	return 202
	// }
	else {
		throw new Error(
			'TODO: objects besides Element and Text instances not yet supported in the particular API that caused this error.',
		)
	}
}
