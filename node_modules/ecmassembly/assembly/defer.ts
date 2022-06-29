/////////////////////////////////////////

declare function _defer(fn: usize): void

export {_defer}

export function defer(fn: () => void): void {
	_defer(fn.index)
}

/////////////////////////////////////////

declare function _deferWithArg(fn: usize, arg: usize): void

export {_deferWithArg}

export function deferWithArg<T>(fn: T, arg: usize): void {
	if (!isFunction<T>(fn)) {
		ERROR('Must pass a function with one parameter.')
		throw new Error('Must pass a function with one parameter.')
	}
	_deferWithArg(fn.index, arg)
}
