export declare function logusize(a: usize): void
export declare function logstring(a: string): void
export declare function logstrnull(a: string | null): void

export declare function setDocument(id: usize): void
// declare function getDocument(): i32

export declare function setElement(docId: usize, elId: usize, tag: string): void
// declare function getElement(elId: usize): i32

export declare function nodeAppendChild(parentId: usize, childId: usize): void

export declare function documentHasBody(doc: usize): boolean

export declare function elSetAttribute(id: usize, attr: string, value: string | null): void
export declare function elGetAttribute(id: usize, attr: string): string | null

export declare function elSetInnerHTML(id: usize, value: string | null): void
export declare function elGetInnerHTML(id: usize): string
