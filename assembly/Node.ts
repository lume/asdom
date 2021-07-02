// @ts-ignore
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: usize, childId: usize): void

// @ts-ignore
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: usize, childId: usize): void

export class Node {
	__ptr__: usize = changetype<usize>(this)

	appendChild<T extends Node>(child: T): T {
		nodeAppendChild(this.__ptr__, child.__ptr__)
		return child
	}

	removeChild<T extends Node>(child: T): T {
		nodeRemoveChild(this.__ptr__, child.__ptr__)
		return child
	}
}
