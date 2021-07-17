import {setInterval} from '../node_modules/ecmassembly/assembly/setInterval'
import {HTMLElement, ShadowRootInit} from '../node_modules/asdom/assembly/index'
import {log} from './imports'

let count: i32 = 0
const elements: SecondsCounter[] = []

setInterval(() => {
	count++
	for (let i = 0, l = elements.length; i < l; i++) elements[i].update()
}, 1000)

export class SecondsCounter extends HTMLElement {
	static observedAttributes: string[] = ['some-attribute']

	// count: i32 = 0

	constructor() {
		super()
		log('AS: <seconds-counter> constructed')
	}

	connectedCallback(): void {
		log('AS: <seconds-counter> connected')
		elements.push(this)
		if (!this.shadowRoot) this.attachShadow({mode: 'open'} as ShadowRootInit)
		this.shadowRoot!.innerHTML = this.template()
		this.countOutput = this.shadowRoot!.querySelector('strong') as HTMLElement
	}

	disconnectedCallback(): void {
		log('AS: <seconds-counter> disconnected')
		elements.splice(elements.indexOf(this), 1)
	}

	attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
		if (newVal == 'bar') {
			log('AS: some-attribute has a bar value!')
		} else {
			log('AS: some-attribute has some other value!')
		}
	}

	countOutput: HTMLElement | null = null

	template(): string {
		return /*html*/ `
			<style>
				:host { display: block; }
				.content { padding: 3px; color: white; background: deeppink; }
			</style>
			<span>
				I am a custom &lt;seconds-counter&gt; element. The seconds count is <strong>${count}</strong>!
				${this.childNodes.length ? /*html*/ `Distributed content: <span class="content"><slot></slot></span>` : ''}
			</span>
		`
	}

	update(): void {
		this.countOutput!.innerText = count.toString()
	}
}
