// @ts-check

import {createAsdomCustomElementClass} from './AsdomCustomElement.js'

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

	delete(a) {
		this.__reverse.delete(this.get(a))
		super.delete(a)
	}
}

export class Asdom {
	__refs = new Refs()
	__nextRefToTrack

	// Direct refs to the Wasm module's exports for convenience {{

	__exports = null

	/** @type {(ptr: number) => string} */
	__getString
	__newString
	__getArray
	__newArray
	__pin
	__unpin
	__table
	__asdom_connectedCallback
	__asdom_disconnectedCallback
	__asdom_adoptedCallback
	__asdom_attributeChangedCallback

	// }}

	// cache vars {{

	/** @type {WeakMap<object, object>} */ __body = new WeakMap()
	/** @type {WeakMap<object, object>} */ __firstElementChild = new WeakMap()
	/** @type {WeakMap<object, object>} */ __lastElementChild = new WeakMap()
	/** @type {WeakMap<object, object>} */ __nextElementSibling = new WeakMap()
	/** @type {WeakMap<object, object>} */ __previousElementSibling = new WeakMap()
	/** @type {WeakMap<object, object>} */ __querySelector = new WeakMap()
	/** @type {WeakMap<object, object>} */ __parentNode = new WeakMap()
	/** @type {WeakMap<object, object>} */ __parentElement = new WeakMap()
	/** @type {WeakMap<object, object>} */ __firstChild = new WeakMap()
	/** @type {WeakMap<object, object>} */ __lastChild = new WeakMap()
	/** @type {WeakMap<object, object>} */ __nextSibling = new WeakMap()
	/** @type {WeakMap<object, object>} */ __previousSibling = new WeakMap()
	/** @type {WeakMap<object, object>} */ __item = new WeakMap()

	// }}

	get wasmExports() {
		return this.__exports
	}
	set wasmExports(e) {
		this.__exports = e

		this.__getString = e.__getString
		this.__newString = e.__newString
		this.__getArray = e.__getArray
		this.__newArray = e.__newArray
		this.__pin = e.__pin
		this.__unpin = e.__unpin
		this.__table = e.table
		this.__asdom_connectedCallback = e.asdom_connectedCallback
		this.__asdom_disconnectedCallback = e.asdom_disconnectedCallback
		this.__asdom_adoptedCallback = e.asdom_adoptedCallback
		this.__asdom_attributeChangedCallback = e.asdom_attributeChangedCallback
		this.__asdom_triggerEventListener = e.asdom_triggerEventListener
	}

	/**
	 * @param {number} fnIndex - The index into the WebAssembly.Table of a function inside the AssemblyScript module.
	 * @returns {(...args: any[]) => any} - A JavaScript-side function that proxies arguments and return value to the AssemblyScript function.
	 */
	fn(fnIndex) {
		return this.__table.get(fnIndex)
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
			releaseObject: id => {
				this.__refs.delete(id)
			},
			log: str => {
				console.log('AS: ' + this.__getString(str))
			},
		},
		asDOM_Object: {
			toString: noArgStringReturnFunction(this, 'toString'),
		},
		asDOM_History: {
			pushState: (id, state, title, url) => {
				/** @type {History} */
				const self = this.__refs.get(id)

				// TODO state is an pointer to an AS object, but AS doesn't have
				// dynamic objects. Handle state somehow (with ason or
				// as-json?).
				state = {}

				self.pushState(state, this.__getString(title), this.__getString(url))
			},
			replaceState: (id, state, title, url) => {
				/** @type {History} */
				const self = this.__refs.get(id)

				// TODO state is an pointer to an AS object, but AS doesn't have
				// dynamic objects. Handle state somehow (with ason or
				// as-json?).
				state = {}

				self.replaceState(state, this.__getString(title), this.__getString(url))
			},
		},
		asDOM_Location: {
			setHref: setString(this, 'href'),
			getHref: getString(this, 'href'),
			setProtocol: setString(this, 'protocol'),
			getProtocol: getString(this, 'protocol'),
			setHost: setString(this, 'host'),
			getHost: getString(this, 'host'),
			setHostname: setString(this, 'hostname'),
			getHostname: getString(this, 'hostname'),
			setPort: setString(this, 'port'),
			getPort: getString(this, 'port'),
			setPathname: setString(this, 'pathname'),
			getPathname: getString(this, 'pathname'),
			setSearch: setString(this, 'search'),
			getSearch: getString(this, 'search'),
			setHash: setString(this, 'hash'),
			getHash: getString(this, 'hash'),
			getOrigin: getString(this, 'origin'),
			reload: noArgNoReturnFunction(this, 'reload'),
			replace: stringArgNoReturnFunction(this, 'replace'),
		},
		asDOM_EventTarget: {
			addEventListenerCallback: (id, eventName, callback /* TODO , optionsOrUseCapture*/) => {
				/** @type {EventTarget} */
				const self = this.__refs.get(id)
				self.addEventListener(this.__getString(eventName), this.fn(callback))
			},
			addEventListenerObject: (id, eventName, listenerId /* TODO , optionsOrUseCapture*/) => {
				/** @type {EventTarget} */
				const self = this.__refs.get(id)

				// A listener can only be added once.
				if (this.__refs.get(listenerId)) return

				const listener = event => this.__asdom_triggerEventListener(listenerId /*TODO , event*/)

				this.__refs.set(listenerId, listener)

				self.addEventListener(this.__getString(eventName), listener)
				this.__pin(listenerId)
			},
			removeEventListenerCallback: (id, eventName, callback /* TODO , optionsOrUseCapture*/) => {
				/** @type {EventTarget} */
				const self = this.__refs.get(id)

				console.log('---------------------', this.fn(callback) === this.fn(callback))

				self.removeEventListener(this.__getString(eventName), this.fn(callback))
			},
			removeEventListenerObject: (id, eventName, listenerId /* TODO , optionsOrUseCapture*/) => {
				/** @type {EventTarget} */
				const self = this.__refs.get(id)

				const listener = this.__refs.get(listenerId)

				// Nothing to do if the listener wasn't added yet.
				if (!listener) return

				self.removeEventListener(this.__getString(eventName), listener)

				this.__refs.delete(listenerId)
				this.__unpin(listenerId)
			},
		},
		asDOM_Window: {
			trackWindow: id => {
				this.__refs.set(id, window)
			},
			/**
			 * @param {number} id
			 * @param {number} objId
			 */
			getDocument: (id, objId) => {
				/** @type {Window} */
				const self = this.__refs.get(id)
				const obj = self.document
				let key = this.__refs.keyFrom(obj)
				if (!key) this.__refs.set((key = objId), obj)
				return key
			},
			/**
			 * @param {number} id
			 * @param {number} objId
			 */
			getCustomElements: (id, objId) => {
				/** @type {Window} */
				const self = this.__refs.get(id)
				const obj = self.customElements
				let key = this.__refs.keyFrom(obj)
				if (!key) this.__refs.set((key = objId), obj)
				return key
			},
			/**
			 * @param {number} id
			 * @param {number} objId
			 */
			getHistory: (id, objId) => {
				/** @type {Window} */
				const self = this.__refs.get(id)
				const obj = self.history
				let key = this.__refs.keyFrom(obj)
				if (!key) this.__refs.set((key = objId), obj)
				return key
			},
			/**
			 * @param {number} id
			 * @param {number} objId
			 */
			getLocation: (id, objId) => {
				/** @type {Window | Document} */
				const self = this.__refs.get(id)
				const obj = self.location
				let key = this.__refs.keyFrom(obj)
				if (!key) this.__refs.set((key = objId), obj)
				return key
			},
			// window.onpopstate
			setOnpopstate: (id, callback) => {
				/** @type {Window} */
				const self = this.__refs.get(id)
				self.onpopstate = callback === -1 ? null : this.fn(callback)
			},
			getOnpopstate: id => {
				/** @type {Window} */
				const self = this.__refs.get(id)
				// TODO How to "return" a JS function so that AS can call it?
			},
		},
		asDOM_CustomElementRegistry: {
			// customElements.define()
			define: (id, tagName, factory, attributes) => {
				tagName = this.__getString(tagName)
				const customElements = this.__refs.get(id)
				customElements.define(tagName, createAsdomCustomElementClass(this, factory, attributes))
			},
		},
		asDOM_Document: {
			getUrl: id => {
				const self = this.__refs.get(id)
				return this.__newString(self.URL)
			},
			getBody: id => {
				/** @type {Document} */
				const self = this.__refs.get(id)
				const result = self.body

				if (this.__body.get(self) === result) return valueNotChanged
				this.__body.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			setBody: (id, bodyId) => {
				// TODO
			},
			// document.createElement()
			createElement: (id, tagName /*, TODO options */) => {
				/** @type {Document} */
				const self = this.__refs.get(id)
				const result = self.createElement(this.__getString(tagName))
				return this.getKeyOrObjectType(result)
			},
			// document.createTextNode()
			createTextNode: (id, data) => {
				/** @type {Document} */
				const self = this.__refs.get(id)
				const result = self.createTextNode(this.__getString(data))
				return this.getKeyOrObjectType(result)
			},
		},
		asDOM_Element: {
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
			setInnerHTML: setStringOrNull(this, 'innerHTML'),
			getInnerHTML: getString(this, 'innerHTML'),
			getChildren: (id, listId) => {
				/** @type {Element | Document | DocumentFragment} */
				const self = this.__refs.get(id)
				const list = self.children
				if (!this.__refs.keyFrom(list)) this.__refs.set(listId, list)
			},
			getFirstElementChild: id => {
				/** @type {Element | Document | DocumentFragment} */
				const self = this.__refs.get(id)
				const result = self.firstElementChild

				if (this.__firstElementChild.get(self) === result) return valueNotChanged
				this.__firstElementChild.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getLastElementChild: id => {
				/** @type {Element | Document | DocumentFragment} */
				const self = this.__refs.get(id)
				const result = self.lastElementChild

				if (this.__lastElementChild.get(self) === result) return valueNotChanged
				this.__lastElementChild.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getNextElementSibling: id => {
				/** @type {Element} */
				const self = this.__refs.get(id)
				const result = self.nextElementSibling

				if (this.__nextElementSibling.get(self) === result) return valueNotChanged
				this.__nextElementSibling.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getPreviousElementSibling: id => {
				/** @type {Element} */
				const self = this.__refs.get(id)
				const result = self.previousElementSibling

				if (this.__previousElementSibling.get(self) === result) return valueNotChanged
				this.__previousElementSibling.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			// element.onclick
			setOnclick: (id, callback) => {
				/** @type {Element} */
				const self = this.__refs.get(id)
				self.onclick = callback === -1 ? null : this.fn(callback)
			},
			getOnclick: id => {
				/** @type {Element} */
				const self = this.__refs.get(id)
				// TODO How to "return" a JS function so that AS can call it?
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
				/** @type {Element | Document | DocumentFragment} */
				const self = this.__refs.get(id)
				const result = self.querySelector(this.__getString(selectors))

				if (this.__querySelector.get(self) === result) return valueNotChanged
				this.__querySelector.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			querySelectorAll: (id, selectors) => {
				/** @type {Element | Document | DocumentFragment} */
				const node = this.__refs.get(id)
				const result = node.querySelectorAll(this.__getString(selectors))
				return this.getKeyOrObjectType(result, 202)
			},
			getShadowRoot: id => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				const root = el.shadowRoot
				if (!root) return 0 // null
				return this.__refs.keyFrom(root)
			},
			attachShadow: (id, rootId, mode) => {
				/** @type {Element} */
				const el = this.__refs.get(id)
				const root = el.attachShadow({mode: this.__getString(mode)})
				this.__refs.set(rootId, root)
			},
		},
		asDOM_HTMLElement: {
			// element.innerText
			setInnerText: setStringOrNull(this, 'innerText'),
			getInnerText: getString(this, 'innerText'),
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
				const self = this.__refs.get(id)
				const result = self.parentNode

				if (this.__parentNode.get(self) === result) return valueNotChanged
				this.__parentNode.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getParentElement: id => {
				/** @type {Node} */
				const self = this.__refs.get(id)
				const result = self.parentElement

				if (this.__parentElement.get(self) === result) return valueNotChanged
				this.__parentElement.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			// node.firstChild (readonly)
			getFirstChild: id => {
				/** @type {Node} */
				const self = this.__refs.get(id)
				const result = self.firstChild

				if (this.__firstChild.get(self) === result) return valueNotChanged
				this.__firstChild.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getLastChild: id => {
				/** @type {Node} */
				const self = this.__refs.get(id)
				const result = self.lastChild

				if (this.__lastChild.get(self) === result) return valueNotChanged
				this.__lastChild.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getNextSibling: id => {
				/** @type {Node} */
				const self = this.__refs.get(id)
				const result = self.nextSibling

				if (this.__nextSibling.get(self) === result) return valueNotChanged
				this.__nextSibling.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				return this.getKeyOrObjectType(result)
			},
			getPreviousSibling: id => {
				/** @type {Node} */
				const self = this.__refs.get(id)
				const result = self.previousSibling

				if (this.__previousSibling.get(self) === result) return valueNotChanged
				this.__previousSibling.set(self, result) // The old value can then be GC'd.

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
				const self = this.__refs.get(id)
				const list = self.childNodes
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
		asDOM_HTMLCanvasElement: {
			/**
			 * @param {number} id
			 * @param {number} ctxId
			 * @param {number} typeNum
			 */
			getContext: (id, ctxId, typeNum /*TODO , options*/) => {
				/** @type {HTMLCanvasElement} */
				const self = this.__refs.get(id)
				const result = self.getContext(getCanvasContextTypeString(typeNum))

				// It must be valid because the AS bindings calling this only allow a static (compile-time) set of extension types.
				if (!result) throw new Error('Invalid extension type.')

				this.__refs.set(ctxId, result)
			},
		},
		asDOM_NodeList: {
			// list.length
			getLength: id => {
				/** @type {NodeList} */
				const self = this.__refs.get(id)
				return self.length
			},
			item: (id, index) => {
				/** @type {NodeList} */
				const self = this.__refs.get(id)
				const result = self.item(index)

				if (this.__item.get(self) === result) return valueNotChanged
				this.__item.set(self, result) // The old value can then be GC'd.

				if (!result) return 0 // null

				// TODO this should be getKeyOrNodeType and consider non-element Nodes too.
				return this.getKeyOrObjectType(result)
			},
		},
		asDOM_WebGLRenderingContext: {
			// Specify the color to fill a cleared color buffer with
			clearColor: (id, r, g, b, a) => {
				/** @type {WebGLRenderingContext} */
				const self = this.__refs.get(id)
				self.clearColor(r, g, b, a)
			},

			// Clears the color, depth and stencil buffers
			clear: (id, mask) => {
				/** @type {WebGLRenderingContext} */
				const self = this.__refs.get(id)
				self.clear(mask)
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
	 *
	 * @param {object} obj - The object whose type ID we wish to get.
	 * @param {number} [explicitTypeOverride] - Optional. Provide an explicit
	 * type ID if we already know the object's type ahead of time, to skip
	 * the cost of instanceof checks, etc, but to still trigger the other
	 * machinery.
	 * @returns {number} - The object's type ID.
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
		else if (tag === 'CANVAS') return 17
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
		throw new Error('Unsupported object (either it is TODO, or an invalid type override was provided).')
	}
}

/**
 * @param {number} typeNum
 */
function getCanvasContextTypeString(typeNum) {
	if (typeNum === 0) return '2d'
	if (typeNum === 1) return 'bitmaprenderer'
	if (typeNum === 2) return 'webgl'
	if (typeNum === 3) return 'webgl2'
	// ...
}

/** @param {Asdom} asdom */
function setString(asdom, key) {
	return (id, str) => {
		const self = asdom.__refs.get(id)
		self[key] = asdom.__getString(str)
	}
}

/** @param {Asdom} asdom */
function setStringOrNull(asdom, key) {
	return (id, str) => {
		const self = asdom.__refs.get(id)
		if (str === 0) self[key] = null
		else self[key] = asdom.__getString(str)
	}
}

/** @param {Asdom} asdom */
function getString(asdom, key) {
	return id => {
		const self = asdom.__refs.get(id)
		return asdom.__newString(self[key])
	}
}

/** @param {Asdom} asdom */
function noArgNoReturnFunction(asdom, key) {
	return id => {
		const self = asdom.__refs.get(id)
		self[key]()
	}
}

/** @param {Asdom} asdom */
function stringArgNoReturnFunction(asdom, key) {
	return (id, str) => {
		const self = asdom.__refs.get(id)
		self[key](asdom.__getString(str))
	}
}

/** @param {Asdom} asdom */
function noArgStringReturnFunction(asdom, key) {
	return id => {
		const self = asdom.__refs.get(id)
		return asdom.__newString(self[key]())
	}
}

const i32min = -2147483648
const valueNotChanged = i32min
