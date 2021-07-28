import {getLength} from './imports'
import {Object} from './Object'

export class History extends Object {
	get length(): i32 {
		return getLength(this.__ptr__)
	}
}
