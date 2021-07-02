// @ts-ignore
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: usize, childId: usize): void

export class Node {
	__ptr__: usize = changetype<usize>(this)

	appendChild<T extends Node>(child: T): T {
		nodeAppendChild(this.__ptr__, child.__ptr__)
		return child
	}
}
