import {Element} from '../Element'

export abstract class HTMLElement extends Element {
	// The following are for use by custom elements, but not required to be
	// implemented so not abstract. {{{
	static observedAttributes: string[] = []
	connectedCallback(): void {}
	disconnectedCallback(): void {}
	adoptedCallback(): void {}
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {}
	// }}}
}
