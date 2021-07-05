import {Node} from './Node'

export class DocumentFragment extends Node {
	get nodeType(): i32 {
		return 11
	}
}
