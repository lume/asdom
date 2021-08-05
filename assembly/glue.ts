import './__finalize'
import {HTMLElement} from './elements/HTML/HTMLElement'
import {EventListener} from './EventListener'

export function asdom_connectedCallback(id: usize): void {
	const el = changetype<HTMLElement>(id)
	el.connectedCallback()
}

export function asdom_disconnectedCallback(id: usize): void {
	const el = changetype<HTMLElement>(id)
	el.disconnectedCallback()
}

export function asdom_adoptedCallback(id: usize): void {
	const el = changetype<HTMLElement>(id)
	el.disconnectedCallback()
}

export function asdom_attributeChangedCallback(
	id: usize,
	name: string,
	oldValue: string | null,
	newValue: string | null,
): void {
	const el = changetype<HTMLElement>(id)
	el.attributeChangedCallback(name, oldValue, newValue)
}

export function asdom_triggerEventListener(id: usize /*TODO , eventPtr: usize*/): void {
	const listener = changetype<EventListener>(id)
	listener.handleEvent()
}
