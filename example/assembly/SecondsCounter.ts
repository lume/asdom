import {setInterval} from '../node_modules/ecmassembly/assembly/setInterval'
import {HTMLElement} from '../node_modules/asdom/assembly/index'
import {log} from './imports'

let count: i32 = 0
const elements: SecondsCounter[] = []

setInterval(() => {
	count++
	for (let i = 0, l = elements.length; i < l; i++) {
		elements[i].render()
	}
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

		this.setAttribute('style', 'display: block')

		elements.push(this)

		this.render()
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

	render(): void {
		this.innerHTML = /*html*/ `
			<span>I am a custom &lt;seconds-counter&gt; element. The seconds count is <strong>${count}</strong>!</span>
		`
	}
}
