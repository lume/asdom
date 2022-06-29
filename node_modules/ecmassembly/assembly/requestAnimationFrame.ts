declare function _requestAnimationFrame(fn: usize): i32

export {_requestAnimationFrame}

export function requestAnimationFrame<T>(fn: T): i32 {
	if (!isFunction<T>(fn)) {
		ERROR('Must pass a function.')
		throw new Error('Must pass a function.')
	}
	return _requestAnimationFrame(fn.index)
}

export declare function cancelAnimationFrame(id: i32): void
