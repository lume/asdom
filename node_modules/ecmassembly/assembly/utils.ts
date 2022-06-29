export function fnPointerToIndex(fnPtr: usize): i32 {
	return load<i32>(fnPtr)
}

export function ptr<T>(any: T): usize {
	return changetype<usize>(any)
}
