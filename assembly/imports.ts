import { EventListener } from "./EventListener";

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
@external('asDOM_Object', 'toString')
export declare function toString(id: usize): string

// @ts-expect-error
@external('asDOM_History', 'pushState')
export declare function pushState(id: usize, state: usize, title: string, url: string): void

// @ts-expect-error
@external('asDOM_History', 'replaceState')
export declare function replaceState(id: usize, state: usize, title: string, url: string): void

// @ts-expect-error
@external('asDOM_Location', 'setHref')
export declare function setHref(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHref')
export declare function getHref(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setProtocol')
export declare function setProtocol(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getProtocol')
export declare function getProtocol(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setHost')
export declare function setHost(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHost')
export declare function getHost(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setHostname')
export declare function setHostname(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHostname')
export declare function getHostname(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setPort')
export declare function setPort(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPort')
export declare function getPort(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setPathname')
export declare function setPathname(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPathname')
export declare function getPathname(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setSearch')
export declare function setSearch(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getSearch')
export declare function getSearch(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'setHash')
export declare function setHash(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHash')
export declare function getHash(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'getOrigin')
export declare function getOrigin(id: usize): string

// @ts-expect-error
@external('asDOM_Location', 'reload')
export declare function reload(id: usize): void

// @ts-expect-error
@external('asDOM_Location', 'replace')
export declare function replace(id: usize, value: string): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerCallback')
export declare function addEventListenerCallback(id: usize, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerObject')
export declare function addEventListenerObject(id: usize, eventName: string, listenerPtr: usize): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerCallback')
export declare function removeEventListenerCallback(id: usize, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerObject')
export declare function removeEventListenerObject(id: usize, eventName: string, listenerPtr: usize): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
export declare function trackWindow(id: usize): void

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
@external('asDOM_Window', 'getLocation')
export declare function getLocation(id: usize, locationId: usize): void

// @ts-expect-error
@external('asDOM_Window', 'setOnpopstate')
export declare function setOnpopstate(id: usize, index: u32): void

// // @ts-expect-error
// @external('asDOM_Window', 'getOnpopstate')
// export declare function getOnpopstate(id: usize): ???

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
@external('asDOM_HTMLElement', 'setInnerText')
export declare function setInnerText(id: usize, value: string | null): void

// @ts-expect-error
@external('asDOM_HTMLElement', 'getInnerText')
export declare function getInnerText(id: usize): string

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
export declare function setOnclick(id: usize, index: u32): void

// // @ts-expect-error
// @external('asDOM_Element', 'getOnclick')
// export declare function getOnclick(id: usize): ???

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
