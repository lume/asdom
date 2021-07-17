// Export AssemblyScript-side glue code or not everything will work (for example the customElements API).

import {customElements, Element, HTMLElement} from '../node_modules/asdom/assembly/index'

// Define a class for our custom <hello-from> element.
export class HelloFrom extends HTMLElement {
	static observedAttributes: string[] = ['place', 'avatar']

	private static readonly __placeDefault: string = 'AssemblyScript'
	private __place: string = HelloFrom.__placeDefault
	private __placeRef: Element | null = null

	get place(): string {
		return this.__place
	}

	set place(value: string) {
		this.__place = value
		if (this.__placeRef) this.__placeRef!.innerText = value
	}

	private static readonly __avatarDefault: string = 'https://www.assemblyscript.org/images/icon.svg'
	private __avatar: string = HelloFrom.__avatarDefault
	private __avatarRef: Element | null = null

	get avatar(): string {
		return this.__avatar
	}

	set avatar(value: string) {
		this.__avatar = value
		if (this.__avatarRef) this.__avatarRef!.setAttribute('src', value)
	}

	attributeChangedCallback(attr: string, oldVal: string | null, newVal: string | null): void {
		if (attr == 'place') {
			if (!newVal) this.place = HelloFrom.__placeDefault
			else this.place = newVal!
		} else if (attr == 'avatar') {
			if (!newVal) this.avatar = HelloFrom.__avatarDefault
			else this.avatar = newVal!
		}
	}

	connectedCallback(): void {
		let root = this.shadowRoot
		if (!root) root = this.attachShadow({mode: 'open'})

		root.innerHTML = this.template()

		this.__placeRef = root.querySelector('[ref=placeRef]')
		this.__avatarRef = root.querySelector('[ref=avatarRef]')
	}

	template(): string {
		return /*html*/ `
			<style>
				:host {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				img {
					width: 150px;
				}
				p {
					font-size: 2rem;
				}
			</style>

			<img ref="avatarRef" src="${this.avatar}" />
			<p>
				<em>Hello</em> from <strong ref="placeRef">${this.place}</strong>!
			</p>
		`
	}
}

// The customElements.define call has to be slightly different in
// AssemblyScript because AS does not yet support constructor function
// references.
customElements.define('hello-from', () => new HelloFrom(), HelloFrom.observedAttributes)
