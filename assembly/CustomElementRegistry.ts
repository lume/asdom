import {HTMLElement} from './elements/HTML/HTMLElement'
import {define} from './imports'
import {Object} from './Object'

/*
 * Custom elements are a bit too dynamic to easily map an interface to them
 * one-to-one like with other DOM APIs, so currently we have to write a bit more
 * of a custom implementation in AssemblyScript. There are some differences in
 * the final API:
 *
 * - In AS we cannot reference constructors, so the second arg to
 *   customElements.define() is currently a factory function that returns an
 *   instance of your custom element class.
 */

export class CustomElementRegistry extends Object {
	private __defs: Map<string, () => HTMLElement> = new Map()

	define(tag: string, factory: () => HTMLElement, attributes: string[]): void {
		define(this.__ptr__, tag, factory.index, attributes)
		this.__defs.set(tag, factory)
	}

	whenDefined(): void {
		// TODO
	}
}
