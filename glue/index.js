class MapWithReverse extends Map {
	__reverse = new Map()

	set(a, b) {
		super.set(a, b)
		this.__reverse.set(b, a)
	}

	keyFrom(b) {
		return this.__reverse.get(b)
	}
}

export class Asdom {
	__refs = new MapWithReverse()
	__getString
	__newString
	__nextElementToTrack

	get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this.__getString = e.__getString
		this.__newString = e.__newString
		this._exports = e
	}

	_exports = null

	wasmImports = {
		asDOM_Document: {
			getUrl: () => {
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
			trackNextElement: (docId, elId) => {
				const el = this.__nextElementToTrack

				if (!el) {
					throw new Error(
						'Bug, this should not happen, trackNextElement should have been called synchronously right after an existing element was referenced and an AS-side objet created to mirror it.',
					)
				}
				this.__nextElementToTrack = undefined

				// TODO elements need to be associated with documents on the AS-side so they can have ownerDocument properties.
				this.__refs.set(elId, el)
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
		},
		asDOM_Element: {
			// element.setAttribute
			elSetAttribute: (id, attr, value) => {
				const el = this.__refs.get(id)
				el.setAttribute(this.__getString(attr), this.__getString(value))
			},
			// element.getAttribute
			elGetAttribute: (id, attr) => {
				const el = this.__refs.get(id)
				return this.__newString(el.getAttribute(this.__getString(attr)))
			},
			// element.innerHTML
			elSetInnerHTML: (id, value) => {
				const el = this.__refs.get(id)
				el.innerHTML = this.__getString(value)
			},
			// element.innerHTML
			elGetInnerHTML: id => {
				const el = this.__refs.get(id)
				return this.__newString(el.innerHTML)
			},
			// element.innerText
			elSetInnerText: (id, value) => {
				const el = this.__refs.get(id)
				el.innerText = this.__getString(value)
			},
			// element.innerText
			elGetInnerText: id => {
				new Audio()
				const el = this.__refs.get(id)
				return this.__newString(el.innerText)
			},
			// element.onclick
			elOnClick: (id, ptr) => {
				if (!this._exports.table) throw new Error('Table not exported. Add the --exportTable flag.')
				const el = this.__refs.get(id)
				el.onclick = this._exports.table.get(ptr)
			},
			// element.click()
			elClick: id => {
				const el = this.__refs.get(id)
				el.click()
			},
			// element.remove()
			remove: id => {
				const el = this.__refs.get(id)
				el.remove()
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
			// node.firstChild (readonly)
			getFirstChild: id => {
				/** @type {Node} */
				const node = this.__refs.get(id)
				const child = node.firstChild

				console.log('JS: first child:', child)
				if (!child) return 0 // null

				const key = this.__refs.keyFrom(child)

				if (!key) {
					this.__nextElementToTrack = child

					// Returning negative means the AS-side should create an instance to track the JS-side object.
					if (child instanceof Element) {
						const tag = child.tagName
						if (tag === 'BODY') return -2
						else if (tag === 'DIV') return -3
						else if (tag === 'SPAN') return -4
						else if (tag === 'P') return -5
						else if (tag === 'A') return -6
						else if (tag === 'SCRIPT') return -7
						else if (tag === 'TEMPLATE') return -8
						else if (tag === 'AUDIO') return -9
						else if (tag === 'IMG') return -10
						else if (tag === 'H1') return -11
						else if (tag === 'H2') return -12
						else if (tag === 'H3') return -13
						else if (tag === 'H4') return -14
						else if (tag === 'H5') return -15
						else if (tag === 'H6') return -16
						else if (tag.includes('-'))
							throw new Error('Hyphenated (possibly-custom) element not supported yet.')
						else return -1 // HTMLUnknownElement
					} else {
						throw new Error('TODO: firstChild not yet supported for nodes besides Element nodes.')
					}
				}

				console.log('JS: first child key:', key)

				return key
			},
			log: str => console.log(this.__getString(str)),
		},
		asDOM_Audio: {
			initAudio: (srcPtr, id) => {
				const src = this.__getString(srcPtr)
				this.__refs.set(id, new Audio(src))
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
			setAutoplay: (toggle, id) => {
				const el = this.__refs.get(id)
				el.autoplay = toggle ? true : false
			},
			// element.autoplay
			getAutoplay: id => {
				const el = this.__refs.get(id)
				return el.autoplay ? 1 : 0
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
	}
}

function thro(err) {
	throw err
}
