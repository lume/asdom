// @ts-expect-error
@external('asDOM', 'trackNextRef')
export declare function trackNextRef(id: usize): void

// @ts-expect-error
@external('asDOM', 'releaseObject')
export declare function releaseObject(ptr: usize): void

// @ts-expect-error
@external('asDOM', 'log')
export declare function log(msg: string): void

// @ts-expect-error
@external('asDOM_Window', 'getDocument')
export declare function getDocument(id: usize, docId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'getCustomElements')
export declare function getCustomElements(id: usize, ceId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'getHistory')
export declare function getHistory(id: usize, histId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
export declare function trackWindow(id: usize): void

// @ts-expect-error
@external('asDOM_CustomElementRegistry', 'define')
export declare function define(id: usize, tag: string, factoryIndex: i32, attributes: string[]): void

// @ts-expect-error
@external('asDOM_Document', 'getBody')
export declare function getBody(id: usize): i32

// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(id: usize): string

// @ts-expect-error
@external('asDOM_Document', 'createElement')
export declare function createElement(docId: usize, tagName: string): i32

// @ts-expect-error
@external('asDOM_Document', 'createTextNode')
export declare function createTextNode(docId: usize, data: string): i32

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
@external('asDOM_Node', 'getParentElement')
export declare function getParentElement(id: usize): i32

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
@external('asDOM_Element', 'getTagName')
export declare function getTagName(id: usize): string

// @ts-expect-error
@external('asDOM_Element', 'elSetAttribute')
export declare function elSetAttribute(id: usize, attr: string, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetAttribute')
export declare function elGetAttribute(id: usize, attr: string): string | null

// @ts-expect-error
@external('asDOM_Element', 'setInnerHTML')
export declare function setInnerHTML(id: usize, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'getInnerHTML')
export declare function getInnerHTML(id: usize): string

// @ts-expect-error
@external('asDOM_Element', 'elSetInnerText')
export declare function elSetInnerText(id: usize, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetInnerText')
export declare function elGetInnerText(id: usize): string

// @ts-expect-error
@external('asDOM_Element', 'getChildren')
export declare function getChildren(nodeId: usize, listId: usize): void

// @ts-expect-error
@external('asDOM_Element', 'getFirstElementChild')
export declare function getFirstElementChild(id: usize): i32

// @ts-expect-error
@external('asDOM_Element', 'getLastElementChild')
export declare function getLastElementChild(id: usize): i32

// @ts-expect-error
@external('asDOM_Element', 'getNextElementSibling')
export declare function getNextElementSibling(id: usize): i32

// @ts-expect-error
@external('asDOM_Element', 'getPreviousElementSibling')
export declare function getPreviousElementSibling(id: usize): i32

// @ts-expect-error
@external('asDOM_Element', 'elClick')
export declare function elClick(id: usize): void

// @ts-expect-error
@external('asDOM_Element', 'setOnclick')
export declare function setOnclick(id: usize, ptr: u32): void

// // @ts-expect-error
// @external('asDOM_Element', 'getOnclick')
// export declare function getOnclick(id: usize, ptr: u32): ???

// @ts-expect-error
@external('asDOM_Element', 'remove')
export declare function remove(id: usize): void

// @ts-expect-error
@external('asDOM_Element', 'querySelector')
export declare function querySelector(id: usize, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'querySelectorAll')
export declare function querySelectorAll(id: usize, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'getShadowRoot')
export declare function getShadowRoot(id: usize): i32

// @ts-expect-error
@external('asDOM_Element', 'attachShadow')
export declare function attachShadow(id: usize, rootId: usize, mode: string): i32

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
