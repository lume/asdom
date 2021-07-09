import {CustomElementRegistry} from './CustomElementRegistry'
import {Object} from './Object'

// @ts-expect-error
@external('asDOM_Window', 'getCustomElements')
declare function getCustomElements(id: usize, ceId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
declare function trackWindow(id: usize): void

export class Window extends Object {
	private __ceRegistry: CustomElementRegistry | null = null

	get customElements(): CustomElementRegistry {
		let reg = this.__ceRegistry

		if (!reg) {
			this.__ceRegistry = reg = new CustomElementRegistry()
			getCustomElements(this.__ptr__, reg.__ptr__)
		}

		return reg
	}
}

export const window = new Window()
trackWindow(window.__ptr__)

export const customElements = window.customElements
