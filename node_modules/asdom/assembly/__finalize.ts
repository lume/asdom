import {releaseObject} from './imports'
import {Object} from './Object'

// @ts-ignore
@global
function __finalize(ptr: usize): void {
	if (
		// prettier-ignore
		// @ts-ignore, function exists
		__instanceof(
			ptr, idof<Object>()
		)
	) {
		releaseObject(ptr)
	}
}
