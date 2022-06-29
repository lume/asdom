import {getLength, pushState, replaceState} from './imports'
import {Object} from './Object'

// TODO, for now, it is only possible to pass empty state. There are no dynamic objects in AssemblyScript.
export class EmptyHistoryState extends Object {}

export class History extends Object {
	get length(): i32 {
		return getLength(this)
	}

	pushState(state: EmptyHistoryState, title: string, url: string = ''): void {
		pushState(this, state, title, url)
	}

	replaceState(state: EmptyHistoryState, title: string, url: string = ''): void {
		replaceState(this, state, title, url)
	}
}
