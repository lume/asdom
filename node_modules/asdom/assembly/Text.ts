import {Node} from './Node'

/**
 * The CharacterData abstract interface represents a Node object that contains
 * characters. This is an abstract interface, meaning there aren't any object of
 * type CharacterData: it is implemented by other interfaces, like Text,
 * Comment, or ProcessingInstruction which aren't abstract.
 */
export abstract class CharacterData extends Node {
	// data: string
	// readonly length: number
	// readonly ownerDocument: Document
	// appendData(data: string): void
	// deleteData(offset: number, count: number): void
	// insertData(offset: number, data: string): void
	// replaceData(offset: number, count: number, data: string): void
	// substringData(offset: number, count: number): string
}

export class Text extends CharacterData {
	get nodeType(): i32 {
		return 3
	}
	/**
	 * Returns the combined data of all direct Text node siblings.
	 */
	// readonly wholeText: string;
	/**
	 * Splits data at the given offset and returns the remainder as Text node.
	 */
	// splitText(offset: number): Text;
}
