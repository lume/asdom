
// TODO Put this in a file shared between glue code and AS code. We need to
// convert the glue code to TypeScript first, or compile the shared file to

import { Node, HTMLBodyElement, HTMLDivElement, HTMLSpanElement, HTMLParagraphElement, HTMLAnchorElement, HTMLScriptElement, HTMLTemplateElement, Audio, Image, HTMLHeadingElement, HTMLUnknownElement } from "./index"

// plain JS.
export enum ElementType {
	unknown = 1,
	body = 2,
	div = 3,
	span = 4,
	p = 5,
	a = 6,
	script = 7,
	template = 8,
	audio = 9,
	img = 10,
	h1 = 11,
	h2 = 12,
	h3 = 13,
	h4 = 14,
	h5 = 15,
	h6 = 16,
}


export function makeNode(type: ElementType): Node {
	let el: Node

	if (type == ElementType.body) el = new HTMLBodyElement()
	else if (type == ElementType.div) el = new HTMLDivElement()
	else if (type == ElementType.span) el = new HTMLSpanElement()
	else if (type == ElementType.p) el = new HTMLParagraphElement()
	else if (type == ElementType.a) el = new HTMLAnchorElement()
	else if (type == ElementType.script) el = new HTMLScriptElement()
	else if (type == ElementType.template) el = new HTMLTemplateElement()
	else if (type == ElementType.audio) el = new Audio()
	else if (type == ElementType.img) el = new Image()
	else if (type == ElementType.h1) el = new HTMLHeadingElement()
	else if (type == ElementType.h2) el = new HTMLHeadingElement()
	else if (type == ElementType.h3) el = new HTMLHeadingElement()
	else if (type == ElementType.h4) el = new HTMLHeadingElement()
	else if (type == ElementType.h5) el = new HTMLHeadingElement()
	else if (type == ElementType.h6) el = new HTMLHeadingElement()
	else if (type === ElementType.unknown) el = new HTMLUnknownElement()
	else throw new Error('Hyphenated or custom elements not yet supported.')

	return el
}
