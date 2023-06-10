import {releaseObject} from './imports'
import {JSObject} from './JSObject'

// @ts-ignore
@global
function __finalize(ptr: usize): void {
	if (changetype<Object>(ptr) instanceof JSObject) {
		releaseObject(ptr)
	}
}
