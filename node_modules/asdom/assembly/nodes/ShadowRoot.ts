import {DocumentFragment} from '../DocumentFragment'
import {getInnerHTML, setInnerHTML} from '../imports'

export class ShadowRoot extends DocumentFragment {
	// This is non-standard for ShadowRoot, but every browser has it.
	set innerHTML(str: string) {
		setInnerHTML(this, str)
	}
	get innerHTML(): string {
		return getInnerHTML(this)
	}
}
