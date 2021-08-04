import {getInnerText, setInnerText} from '../../imports'
import {Element} from '../Element'

export abstract class HTMLElement extends Element {
	get innerText(): string {
		return getInnerText(this.__ptr__)
	}
	set innerText(value: string | null) {
		setInnerText(this.__ptr__, value)
	}

	// The following are for use by custom elements, but not required to be
	// implemented so not abstract. {{{
	static observedAttributes: string[] = []
	connectedCallback(): void {}
	disconnectedCallback(): void {}
	adoptedCallback(): void {}
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {}
	// }}}
}
