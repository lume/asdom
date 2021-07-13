// @ts-expect-error
@external('asDOM', 'trackNextRef')
export declare function trackNextRef(id: usize): void

// @ts-expect-error
@external('asDOM', 'log')
export declare function log(msg: string): void

// @ts-expect-error
@external('asDOM_Window', 'getCustomElements')
export declare function getCustomElements(id: usize, ceId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
export declare function trackWindow(id: usize): void

// @ts-expect-error
@external('asDOM_CustomElementRegistry', 'define')
export declare function define(id: usize, tag: string, factoryIndex: i32, attributes: string[]): void

// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(id: usize): string

// @ts-expect-error
@external('asDOM_Document', 'setDocument')
export declare function setDocument(id: usize): void

// @ts-expect-error
@external('asDOM_Document', 'setElement')
export declare function setElement(docId: usize, elId: usize, tag: string): void

// @ts-expect-error
@external('asDOM_Document', 'documentHasBody')
export declare function documentHasBody(doc: usize): boolean

// @ts-expect-error
@external('asDOM_Document', 'createTextNode')
export declare function createTextNode(docId: usize, textId: usize, data: string): void

// // @ts-expect-error
// @external('asDOM_Document', 'trackNextElement')
// export declare function trackNextElement(docId: usize, elId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: usize, childId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: usize, childId: usize): void

// @ts-expect-error
@external('asDOM_Node', 'getParentNode')
export declare function getParentNode(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'getFirstChild')
export declare function getFirstChild(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'getLastChild')
export declare function getLastChild(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'getNextSibling')
export declare function getNextSibling(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'getPreviousSibling')
export declare function getPreviousSibling(id: usize): i32

// @ts-expect-error
@external('asDOM_Node', 'cloneNode')
export declare function cloneNode(id: usize, deep?: boolean): i32

// @ts-expect-error
@external('asDOM_Node', 'getChildNodes')
export declare function getChildNodes(nodeId: usize, listId: usize): void

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
export declare function querySelector(id: usize, selectors: string): i32

// @ts-expect-error
@external('asDOM_Audio', 'initAudio')
export declare function initAudio(id: usize, src: string): void

// @ts-expect-error
@external('asDOM_Audio', 'pauseAudio')
export declare function pauseAudio(id: usize): void

// @ts-expect-error
@external('asDOM_Audio', 'playAudio')
export declare function playAudio(id: usize): void

// @ts-expect-error
@external('asDOM_Audio', 'getAutoplay')
export declare function getAutoplay(id: usize): boolean

// @ts-expect-error
@external('asDOM_Audio', 'setAutoplay')
export declare function setAutoplay(id: usize, toggle: boolean): void

// @ts-expect-error
@external('asDOM_HTMLTemplateElement', 'getContent')
export declare function getContent(id: usize, fragId: usize): void

// @ts-expect-error
@external('asDOM_NodeList', 'getLength')
export declare function getLength(id: usize): i32

// @ts-expect-error
@external('asDOM_NodeList', 'item')
export declare function item(id: usize, index: i32): i32
