import {DocumentFragment} from '../../DocumentFragment'
import {getContent} from '../../imports'
import {HTMLElement} from './HTMLElement'

export class HTMLTemplateElement extends HTMLElement {
	private __frag: DocumentFragment | null = null

	get content(): DocumentFragment {
		let frag = this.__frag

		if (!frag) {
			frag = new DocumentFragment()
			this.__frag = frag
		}

		getContent(this.__ptr__, frag.__ptr__)

		return frag
	}
}
