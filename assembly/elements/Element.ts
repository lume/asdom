import { makeNode } from "../ElementType"
import { Node } from "../Node"
import { refs } from "../refs"

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

// @ts-expect-error
@external('asDOM_Element', 'querySelector')
export declare function querySelector(id: usize, selectors : string): i32

// @ts-expect-error
@external('asDOM', 'trackNextRef')
declare function trackNextRef(id: usize): void

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

	querySelector(selectors : string) : Element | null {
		const id = querySelector(this.__ptr__, selectors)

		// if null, it means there is no element on the JS-side.
		if (id == 0) return null
		// If negative, there is an element on the JS-side that doesn't have a
		// corresponding AS-side instance yet. In this case we need to
		// create a new instance based on its type.
		else if (id < 0) {
			const el = makeNode(-id)

			// Associate the AS-side instance with the JS-side instance.
			// TODO use this.ownerDocument.__ptr__ instead of document.__ptr__
			// trackNextElement(document.__ptr__, el.__ptr__)
			trackNextRef(el.__ptr__)

			return el as Element
		}

		// If we reach here then there is already an AS-side instance
		// associated with a JS-side instance, and the JS side gave us the ID
		// (pointer) of our AS-side object to return. We might reach here, for
		// example, if we use appendChild to pass an existing child within AS
		// instead of using innerHTML. By using innerHTML and sending a string
		// to JS, it can create a whole tree but none of those nodes will be
		// tracked. Finally, if we do try to access them, we lazily associate
		// new AS-side objects in the previous conditional block.
		else {
			return refs.get(id) as Element // It must be a Node.
		}
	}
}
