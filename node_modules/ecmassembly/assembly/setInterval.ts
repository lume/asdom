declare function _setInterval(fn: usize, milliseconds: f32): i32

export {_setInterval}

export function setInterval(fn: () => void, milliseconds: f32 = 0.0): i32 {
	return _setInterval(fn.index, milliseconds)
}

export declare function clearInterval(id: i32): void
