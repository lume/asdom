import { Node } from "../Node"

// @ts-expect-error
@external('asDOM_Element', 'elSetAttribute')
export declare function elSetAttribute(id: usize, attr: string, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetAttribute')
export declare function elGetAttribute(id: usize, attr: string): string | null

// @ts-expect-error
@external('asDOM_Element', 'elSetInnerHTML')
export declare function elSetInnerHTML(id: usize, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetInnerHTML')
export declare function elGetInnerHTML(id: usize): string

// @ts-expect-error
@external('asDOM_Element', 'elSetInnerText')
export declare function elSetInnerText(id: usize, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetInnerText')
export declare function elGetInnerText(id: usize): string

// @ts-expect-error
@external('asDOM_Element', 'elClick')
export declare function elClick(id: usize): void

// @ts-expect-error
@external('asDOM_Element', 'elOnClick')
export declare function elOnClick(id: usize, ptr: number): void

// @ts-expect-error
@external('asDOM_Element', 'remove')
export declare function remove(id: usize): void

export abstract class Element extends Node {
	get nodeType(): i32 { return 1 }

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

	get innerText(): string {
		return elGetInnerText(this.__ptr__)
	}
	set innerText(value: string | null) {
		elSetInnerText(this.__ptr__, value)
	}

	click(): void {
		elClick(this.__ptr__)
	}

    set onclick(cb: () => void) {
        elOnClick(this.__ptr__, cb.index)
    }

	remove(): void {
		remove(this.__ptr__)
	}
}

