import {HTMLElement} from './elements/HTML/HTMLElement'
import {refs} from './refs'

export function asdom_connectedCallback(id: usize): void {
	const el = refs.get(id) as HTMLElement
	el.connectedCallback()
}

export function asdom_disconnectedCallback(id: usize): void {
	const el = refs.get(id) as HTMLElement
	el.disconnectedCallback()
}

export function asdom_adoptedCallback(id: usize): void {
	const el = refs.get(id) as HTMLElement
	el.disconnectedCallback()
}

export function asdom_attributeChangedCallback(
	id: usize,
	name: string,
	oldValue: string | null,
	newValue: string | null,
): void {
	const el = refs.get(id) as HTMLElement
	el.attributeChangedCallback(name, oldValue, newValue)
}

export const idof_Arrayi32 = idof<Array<i32>>()
