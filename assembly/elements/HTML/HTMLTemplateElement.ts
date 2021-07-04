import { Node } from '../../Node'
import {HTMLElement} from './HTMLElement'

// @ts-expect-error
@external('asDOM_HTMLTemplateElement', 'getContent')
declare function getContent(id: usize, fragId: usize): void

export class DocumentFragment extends Node { }

export class HTMLTemplateElement extends HTMLElement {
	private __frag: DocumentFragment | null = null

	get content(): DocumentFragment {
		let frag = this.__frag

		if (!frag) {
			frag = new DocumentFragment
			this.__frag = frag
		}

		getContent(this.__ptr__, frag.__ptr__)

		return frag
	}
}
