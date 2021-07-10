import {CustomElementRegistry} from './CustomElementRegistry'
import {getCustomElements, trackWindow} from './imports'
import {Object} from './Object'

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
