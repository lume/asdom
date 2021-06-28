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
		asdomImports: {
			setDocument: id => {
				this.__refs.set(id, document)
			},
			getDocument: id => {
				if (!this.__refs.get(id)) this.wasmImports.asdomImports.setDocument(id)
				return this.__refs.get(id)
			},

			setElement: (docId, elId, tag) => {
				tag = this.__getString(tag)
				let el =
					tag === 'body'
						? document.body || thro('bug!')
						: this.wasmImports.asdomImports.documentCreateElement(docId, tag)
				this.__refs.set(elId, el)
			},
			getElement: id => {
				return this.__refs.get(id)
			},

			logusize: log,
			logstring: s => {
				log(this.__getString(s))
			},
			logstrnull: s => {
				log(this.__getString(s))
			},

			documentCreateElement: (id, tag) => {
				const document = this.__refs.get(id)
				return document.createElement(tag)
			},

			documentHasBody: id => {
				const document = this.__refs.get(id)
				return document.body ? true : false
			},

			elSetAttribute: (id, attr, value) => {
				const el = this.__refs.get(id)
				el.setAttribute(this.__getString(attr), this.__getString(value))
			},
			elGetAttribute: (id, attr) => {
				const el = this.__refs.get(id)
				return this.__newString(el.getAttribute(this.__getString(attr)))
			},

			elSetInnerHTML: (id, value) => {
				const el = this.__refs.get(id)
				el.innerHTML = this.__getString(value)
			},
			elGetInnerHTML: id => {
				const el = this.__refs.get(id)
				return this.__newString(el.innerHTML)
			},

			nodeAppendChild: (parentId, childId) => {
				const parent = this.__refs.get(parentId)
				const child = this.__refs.get(childId)
				/*return*/ parent.appendChild(child)
			},
		},
	}
}

function thro(err) {
	throw err
}
