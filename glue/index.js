const log = console.log.bind(console)

export class Asdom {
	__refs = new Map()
	__getString
	__newString

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
			getElement: id => {
				return this.__refs.get(id)
			},

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
			// element.click()
			elClick: id => {
				const el = this.__refs.get(id)
				el.click()
			},
		},
		asDOM_Node: {
			nodeAppendChild: (parentId, childId) => {
				const parent = this.__refs.get(parentId)
				const child = this.__refs.get(childId)
				/*return*/ parent.appendChild(child)
			},
		},
		asDOM_Audio: {
			initAudio: (srcPtr, id) => {
				const src = this.__getString(srcPtr)
				this.__refs.set(id, new Audio(src))
			},
			playAudio: (id) => {
				const el = this.__refs.get(id)
				el.play()
			},
			pauseAudio: (id) => {
				const el = this.__refs.get(id)
				el.pause()
			}
		}
	}
}

function thro(err) {
	throw err
}
