import { Node } from "../Node/Node"

// @ts-ignore
@external('asDOM_Element', 'elSetAttribute')
export declare function elSetAttribute(id: usize, attr: string, value: string | null): void

// @ts-ignore
@external('asDOM_Element', 'elGetAttribute')
export declare function elGetAttribute(id: usize, attr: string): string | null

// @ts-ignore
@external('asDOM_Element', 'elSetInnerHTML')
export declare function elSetInnerHTML(id: usize, value: string | null): void

// @ts-ignore
@external('asDOM_Element', 'elGetInnerHTML')
export declare function elGetInnerHTML(id: usize): string

// @ts-ignore
@external('asDOM_Element', 'elSetInnerText')
export declare function elSetInnerText(id: usize, value: string | null): void

// @ts-ignore
@external('asDOM_Element', 'elGetInnerText')
export declare function elGetInnerText(id: usize): string

// @ts-ignore
@external('asDOM_Element', 'elClick')
export declare function elClick(id: usize): void

// @ts-ignore
@external('asDOM_Element', 'elOnClick')
export declare function elOnClick(id: usize, ptr: number): void

export class Element extends Node {
	setAttribute(attr: string, value: string | null): void {
		elSetAttribute(this.__ptr__, attr, value)
	}
	getAttribute(attr: string): string | null {
		return elGetAttribute(this.__ptr__, attr)
	}

	get innerHTML(): string {
		return elGetInnerHTML(this.__ptr__)
	}
	set innerHTML(value: string | null) {
		elSetInnerHTML(this.__ptr__, value)
	}
}

export class HTMLElement extends Element {}
export class HTMLBodyElement extends HTMLElement {}
export class HTMLDivElement extends HTMLElement {}
export class HTMLSpanElement extends HTMLElement {}
export class HTMLParagraphElement extends HTMLElement {}
export class HTMLAnchorElement extends HTMLElement {}
export class HTMLScriptElement extends HTMLElement {}
export class HTMLTemplateElement extends HTMLElement {}
export class HTMLUnknownElement extends HTMLElement {}