import { GLbitfield, GLclampf, GLenum, WebGLShader } from "./elements";
import { Object } from "./Object";

// @ts-expect-error
@external('asDOM', 'trackNextRef')
export declare function trackNextRef(id: Object): void

// @ts-expect-error
@external('asDOM', 'releaseObject')
export declare function releaseObject(ptr: usize): void

// @ts-expect-error
@external('asDOM', 'log')
export declare function log(msg: string): void

// @ts-expect-error
@external('asDOM_Object', 'toString')
export declare function toString(id: Object): string

// @ts-expect-error
@external('asDOM_History', 'pushState')
export declare function pushState(id: Object, state: Object, title: string, url: string): void

// @ts-expect-error
@external('asDOM_History', 'replaceState')
export declare function replaceState(id: Object, state: Object, title: string, url: string): void

// @ts-expect-error
@external('asDOM_Location', 'setHref')
export declare function setHref(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHref')
export declare function getHref(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setProtocol')
export declare function setProtocol(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getProtocol')
export declare function getProtocol(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setHost')
export declare function setHost(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHost')
export declare function getHost(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setHostname')
export declare function setHostname(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHostname')
export declare function getHostname(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setPort')
export declare function setPort(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPort')
export declare function getPort(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setPathname')
export declare function setPathname(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPathname')
export declare function getPathname(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setSearch')
export declare function setSearch(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getSearch')
export declare function getSearch(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'setHash')
export declare function setHash(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHash')
export declare function getHash(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'getOrigin')
export declare function getOrigin(id: Object): string

// @ts-expect-error
@external('asDOM_Location', 'reload')
export declare function reload(id: Object): void

// @ts-expect-error
@external('asDOM_Location', 'replace')
export declare function replace(id: Object, value: string): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerCallback')
export declare function addEventListenerCallback(id: Object, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerObject')
export declare function addEventListenerObject(id: Object, eventName: string, listenerPtr: Object): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerCallback')
export declare function removeEventListenerCallback(id: Object, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerObject')
export declare function removeEventListenerObject(id: Object, eventName: string, listenerPtr: Object): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
export declare function trackWindow(id: Object): void

// @ts-expect-error
@external('asDOM_Window', 'getDocument')
export declare function getDocument(id: Object, docId: Object): void

// @ts-expect-error
@external('asDOM_Window', 'getCustomElements')
export declare function getCustomElements(id: Object, ceId: Object): void

// @ts-expect-error
@external('asDOM_Window', 'getHistory')
export declare function getHistory(id: Object, histId: Object): void

// @ts-expect-error
@external('asDOM_Window', 'getLocation')
export declare function getLocation(id: Object, locationId: Object): void

// @ts-expect-error
@external('asDOM_Window', 'setOnpopstate')
export declare function setOnpopstate(id: Object, index: u32): void

// // @ts-expect-error
// @external('asDOM_Window', 'getOnpopstate')
// export declare function getOnpopstate(id: Object): ???

// @ts-expect-error
@external('asDOM_CustomElementRegistry', 'define')
export declare function define(id: Object, tag: string, factoryIndex: i32, attributes: string[]): void

// @ts-expect-error
@external('asDOM_Document', 'getBody')
export declare function getBody(id: Object): i32

// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(id: Object): string

// @ts-expect-error
@external('asDOM_Document', 'createElement')
export declare function createElement(docId: Object, tagName: string): i32

// @ts-expect-error
@external('asDOM_Document', 'createTextNode')
export declare function createTextNode(docId: Object, data: string): i32

// @ts-expect-error
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: Object, childId: Object): void

// @ts-expect-error
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: Object, childId: Object): void

// @ts-expect-error
@external('asDOM_Node', 'getParentNode')
export declare function getParentNode(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'getParentElement')
export declare function getParentElement(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'getFirstChild')
export declare function getFirstChild(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'getLastChild')
export declare function getLastChild(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'getNextSibling')
export declare function getNextSibling(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'getPreviousSibling')
export declare function getPreviousSibling(id: Object): i32

// @ts-expect-error
@external('asDOM_Node', 'cloneNode')
export declare function cloneNode(id: Object, deep?: boolean): i32

// @ts-expect-error
@external('asDOM_Node', 'getChildNodes')
export declare function getChildNodes(nodeId: Object, listId: Object): void

// @ts-expect-error
@external('asDOM_HTMLElement', 'setInnerText')
export declare function setInnerText(id: Object, value: string | null): void

// @ts-expect-error
@external('asDOM_HTMLElement', 'getInnerText')
export declare function getInnerText(id: Object): string

// @ts-expect-error
@external('asDOM_Element', 'getTagName')
export declare function getTagName(id: Object): string

// @ts-expect-error
@external('asDOM_Element', 'elSetAttribute')
export declare function elSetAttribute(id: Object, attr: string, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetAttribute')
export declare function elGetAttribute(id: Object, attr: string): string | null

// @ts-expect-error
@external('asDOM_Element', 'setInnerHTML')
export declare function setInnerHTML(id: Object, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'getInnerHTML')
export declare function getInnerHTML(id: Object): string

// @ts-expect-error
@external('asDOM_Element', 'getChildren')
export declare function getChildren(nodeId: Object, listId: Object): void

// @ts-expect-error
@external('asDOM_Element', 'getFirstElementChild')
export declare function getFirstElementChild(id: Object): i32

// @ts-expect-error
@external('asDOM_Element', 'getLastElementChild')
export declare function getLastElementChild(id: Object): i32

// @ts-expect-error
@external('asDOM_Element', 'getNextElementSibling')
export declare function getNextElementSibling(id: Object): i32

// @ts-expect-error
@external('asDOM_Element', 'getPreviousElementSibling')
export declare function getPreviousElementSibling(id: Object): i32

// @ts-expect-error
@external('asDOM_Element', 'elClick')
export declare function elClick(id: Object): void

// @ts-expect-error
@external('asDOM_Element', 'setOnclick')
export declare function setOnclick(id: Object, index: u32): void

// // @ts-expect-error
// @external('asDOM_Element', 'getOnclick')
// export declare function getOnclick(id: Object): ???

// @ts-expect-error
@external('asDOM_Element', 'remove')
export declare function remove(id: Object): void

// @ts-expect-error
@external('asDOM_Element', 'querySelector')
export declare function querySelector(id: Object, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'querySelectorAll')
export declare function querySelectorAll(id: Object, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'getShadowRoot')
export declare function getShadowRoot(id: Object): i32

// @ts-expect-error
@external('asDOM_Element', 'attachShadow')
export declare function attachShadow(id: Object, rootId: Object, mode: string): i32

// @ts-expect-error
@external('asDOM_Audio', 'initAudio')
export declare function initAudio(id: Object, src: string): void

// @ts-expect-error
@external('asDOM_Audio', 'pauseAudio')
export declare function pauseAudio(id: Object): void

// @ts-expect-error
@external('asDOM_Audio', 'playAudio')
export declare function playAudio(id: Object): void

// @ts-expect-error
@external('asDOM_Audio', 'getAutoplay')
export declare function getAutoplay(id: Object): boolean

// @ts-expect-error
@external('asDOM_Audio', 'setAutoplay')
export declare function setAutoplay(id: Object, toggle: boolean): void

// @ts-expect-error
@external('asDOM_HTMLTemplateElement', 'getContent')
export declare function getContent(id: Object, fragId: Object): void

// @ts-expect-error
@external('asDOM_HTMLCanvasElement', 'getContext')
export declare function getContext(id: Object, ctxId: Object, typeNum: i32 /* TODO , options */): void

// @ts-expect-error
@external('asDOM_NodeList', 'getLength')
export declare function getLength(id: Object): i32

// @ts-expect-error
@external('asDOM_NodeList', 'item')
export declare function item(id: Object, index: i32): i32

// // == debug function not part of WebGL
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'logi32')
// export declare function logi32(arg: i32): void
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'logf32')
// export declare function logf32(arg: f32): void

// // == Not a part of WebGL, but there must be a way to create and load images
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'createImage')
// export declare function createImage(image_location: string): ImageData
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'imageReady')
// export declare function imageReady(image_id: ImageData): bool

// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'getStencil')
// export declare function getStencil(gl: WebGLContextAttributes): GLboolean
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'setStencil')
// export declare function setStencil(gl: WebGLContextAttributes, value: GLboolean): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'createShader')
export declare function createShader(gl: Object, typ: GLenum): WebGLShader

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'shaderSource')
export declare function shaderSource(gl: Object, shader: WebGLShader, source: string): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'getExtension')
export declare function getExtension(gl: Object, extId: Object, typeNum: i32): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'clear')
export declare function clear(gl: Object, mask: GLbitfield): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'clearColor')
export declare function clearColor(gl: Object, red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void
