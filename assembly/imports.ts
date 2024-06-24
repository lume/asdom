import { GLbitfield, GLboolean, GLclampf, GLenum, GLfloat, GLint, GLintptr, GLsizei, GLuint, WebGLBuffer, WebGLDataBufferTypes, WebGLExtension, WebGLProgram, WebGLRenderingContext, WebGLShader, WebGLUniformLocation } from "./elements";
import { JSObject } from "./JSObject";

// @ts-expect-error
@external('asDOM', 'trackNextRef')
export declare function trackNextRef(id: JSObject): void

// @ts-expect-error
@external('asDOM', 'releaseObject')
export declare function releaseObject(ptr: usize): void

// @ts-expect-error
@external('asDOM', 'log')
export declare function log(msg: string): void

// @ts-expect-error
@external('asDOM_Object', 'toString')
export declare function toString(id: JSObject): string

// @ts-expect-error
@external('asDOM_History', 'pushState')
export declare function pushState(id: JSObject, state: JSObject, title: string, url: string): void

// @ts-expect-error
@external('asDOM_History', 'replaceState')
export declare function replaceState(id: JSObject, state: JSObject, title: string, url: string): void

// @ts-expect-error
@external('asDOM_Location', 'setHref')
export declare function setHref(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHref')
export declare function getHref(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setProtocol')
export declare function setProtocol(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getProtocol')
export declare function getProtocol(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setHost')
export declare function setHost(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHost')
export declare function getHost(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setHostname')
export declare function setHostname(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHostname')
export declare function getHostname(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setPort')
export declare function setPort(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPort')
export declare function getPort(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setPathname')
export declare function setPathname(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getPathname')
export declare function getPathname(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setSearch')
export declare function setSearch(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getSearch')
export declare function getSearch(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'setHash')
export declare function setHash(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_Location', 'getHash')
export declare function getHash(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'getOrigin')
export declare function getOrigin(id: JSObject): string

// @ts-expect-error
@external('asDOM_Location', 'reload')
export declare function reload(id: JSObject): void

// @ts-expect-error
@external('asDOM_Location', 'replace')
export declare function replace(id: JSObject, value: string): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerCallback')
export declare function addEventListenerCallback(id: JSObject, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'addEventListenerObject')
export declare function addEventListenerObject(id: JSObject, eventName: string, listenerPtr: JSObject): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerCallback')
export declare function removeEventListenerCallback(id: JSObject, eventName: string, callbackIndex: u32): void

// @ts-expect-error
@external('asDOM_EventTarget', 'removeEventListenerObject')
export declare function removeEventListenerObject(id: JSObject, eventName: string, listenerPtr: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'trackWindow')
export declare function trackWindow(id: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'getDocument')
export declare function getDocument(id: JSObject, docId: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'getCustomElements')
export declare function getCustomElements(id: JSObject, ceId: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'getHistory')
export declare function getHistory(id: JSObject, histId: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'getLocation')
export declare function getLocation(id: JSObject, locationId: JSObject): void

// @ts-expect-error
@external('asDOM_Window', 'setOnpopstate')
export declare function setOnpopstate(id: JSObject, index: u32): void

// // @ts-expect-error
// @external('asDOM_Window', 'getOnpopstate')
// export declare function getOnpopstate(id: Object): ???

// @ts-expect-error
@external('asDOM_CustomElementRegistry', 'define')
export declare function define(id: JSObject, tag: string, factoryIndex: i32, attributes: string[]): void

// @ts-expect-error
@external('asDOM_Document', 'getBody')
export declare function getBody(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Document', 'getUrl')
export declare function getUrl(id: JSObject): string

// @ts-expect-error
@external('asDOM_Document', 'createElement')
export declare function createElement(docId: JSObject, tagName: string): i32

// @ts-expect-error
@external('asDOM_Document', 'createTextNode')
export declare function createTextNode(docId: JSObject, data: string): i32

// @ts-expect-error
@external('asDOM_Node', 'nodeAppendChild')
export declare function nodeAppendChild(parentId: JSObject, childId: JSObject): void

// @ts-expect-error
@external('asDOM_Node', 'nodeRemoveChild')
export declare function nodeRemoveChild(parentId: JSObject, childId: JSObject): void

// @ts-expect-error
@external('asDOM_Node', 'getParentNode')
export declare function getParentNode(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'getParentElement')
export declare function getParentElement(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'getFirstChild')
export declare function getFirstChild(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'getLastChild')
export declare function getLastChild(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'getNextSibling')
export declare function getNextSibling(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'getPreviousSibling')
export declare function getPreviousSibling(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Node', 'cloneNode')
export declare function cloneNode(id: JSObject, deep?: boolean): i32

// @ts-expect-error
@external('asDOM_Node', 'getChildNodes')
export declare function getChildNodes(nodeId: JSObject, listId: JSObject): void

// @ts-expect-error
@external('asDOM_HTMLElement', 'setInnerText')
export declare function setInnerText(id: JSObject, value: string | null): void

// @ts-expect-error
@external('asDOM_HTMLElement', 'getInnerText')
export declare function getInnerText(id: JSObject): string

// @ts-expect-error
@external('asDOM_Element', 'getTagName')
export declare function getTagName(id: JSObject): string

// @ts-expect-error
@external('asDOM_Element', 'elSetAttribute')
export declare function elSetAttribute(id: JSObject, attr: string, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'elGetAttribute')
export declare function elGetAttribute(id: JSObject, attr: string): string | null

// @ts-expect-error
@external('asDOM_Element', 'setInnerHTML')
export declare function setInnerHTML(id: JSObject, value: string | null): void

// @ts-expect-error
@external('asDOM_Element', 'getInnerHTML')
export declare function getInnerHTML(id: JSObject): string

// @ts-expect-error
@external('asDOM_Element', 'getChildren')
export declare function getChildren(nodeId: JSObject, listId: JSObject): void

// @ts-expect-error
@external('asDOM_Element', 'getClientWidth')
export declare function getClientWidth(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'getClientHeight')
export declare function getClientHeight(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'getFirstElementChild')
export declare function getFirstElementChild(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'getLastElementChild')
export declare function getLastElementChild(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'getNextElementSibling')
export declare function getNextElementSibling(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'getPreviousElementSibling')
export declare function getPreviousElementSibling(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'elClick')
export declare function elClick(id: JSObject): void

// @ts-expect-error
@external('asDOM_Element', 'setOnclick')
export declare function setOnclick(id: JSObject, index: u32): void

// // @ts-expect-error
// @external('asDOM_Element', 'getOnclick')
// export declare function getOnclick(id: Object): ???

// @ts-expect-error
@external('asDOM_Element', 'remove')
export declare function remove(id: JSObject): void

// @ts-expect-error
@external('asDOM_Element', 'querySelector')
export declare function querySelector(id: JSObject, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'querySelectorAll')
export declare function querySelectorAll(id: JSObject, selectors: string): i32

// @ts-expect-error
@external('asDOM_Element', 'getShadowRoot')
export declare function getShadowRoot(id: JSObject): i32

// @ts-expect-error
@external('asDOM_Element', 'attachShadow')
export declare function attachShadow(id: JSObject, rootId: JSObject, mode: string): i32

// @ts-expect-error
@external('asDOM_Audio', 'initAudio')
export declare function initAudio(id: JSObject, src: string): void

// @ts-expect-error
@external('asDOM_Audio', 'pauseAudio')
export declare function pauseAudio(id: JSObject): void

// @ts-expect-error
@external('asDOM_Audio', 'playAudio')
export declare function playAudio(id: JSObject): void

// @ts-expect-error
@external('asDOM_Audio', 'getAutoplay')
export declare function getAutoplay(id: JSObject): boolean

// @ts-expect-error
@external('asDOM_Audio', 'setAutoplay')
export declare function setAutoplay(id: JSObject, toggle: boolean): void

// @ts-expect-error
@external('asDOM_HTMLTemplateElement', 'getContent')
export declare function getContent(id: JSObject, fragId: JSObject): void

// @ts-expect-error
@external('asDOM_HTMLCanvasElement', 'getContext')
export declare function getContext(id: JSObject, ctxId: JSObject, typeNum: i32 /* TODO , options */): void

// @ts-expect-error
@external('asDOM_NodeList', 'getLength')
export declare function getLength(id: JSObject): i32

// @ts-expect-error
@external('asDOM_NodeList', 'item')
export declare function item(id: JSObject, index: i32): i32

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
@external('asDOM_WebGLRenderingContext', 'attachShader')
export declare function attachShader(gl: WebGLRenderingContext, program: WebGLProgram, shader: WebGLShader): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'bindBuffer')
export declare function bindBuffer(gl: WebGLRenderingContext, target: GLenum, buffer: WebGLBuffer): void

// TODO use TypedArray instead of StaticArray to match JS/TS APIs after this is fixed: https://github.com/AssemblyScript/assemblyscript/issues/2038
// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'bufferData')
// export declare function bufferData<T>(gl: WebGLRenderingContext, arrayType: WebGLDataBufferTypes, target: GLenum, data: TypedArray<T>, usage: GLenum): void
export declare function bufferData<T>(gl: WebGLRenderingContext, arrayType: WebGLDataBufferTypes, target: GLenum, data: StaticArray<T>, usage: GLenum): void

// Pattern: No glue code needed for WebGLRenderingContext.canvas because we
// know ahead of time that it will be the canvas on which getContext was
// called, so we assign that when making WebGLRenderingContext and we don't
// need to cross to JS for this readonly property.
// // @ts-expect-error
// @external('asDOM_WebGLRenderingContext', 'getCanvas')
// export declare function getCanvas(gl: WebGLRenderingContext): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'clear')
export declare function clear(gl: WebGLRenderingContext, mask: GLbitfield): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'clearColor')
export declare function clearColor(gl: WebGLRenderingContext, red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'clearDepth')
export declare function clearDepth(gl: WebGLRenderingContext, depth: GLclampf): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'compileShader')
export declare function compileShader(gl: WebGLRenderingContext, shader: WebGLShader): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'createBuffer')
export declare function createBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'createProgram')
export declare function createProgram(gl: WebGLRenderingContext, program: WebGLProgram): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'createShader')
export declare function createShader(gl: WebGLRenderingContext, shader: WebGLShader, type: GLenum): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'depthFunc')
export declare function depthFunc(gl: WebGLRenderingContext, func: GLenum): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'drawArrays')
export declare function drawArrays(gl: WebGLRenderingContext, mode: GLenum, first: GLint, count: GLsizei): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'enable')
export declare function enable(gl: WebGLRenderingContext, capability: GLenum): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'enableVertexAttribArray')
export declare function enableVertexAttribArray(gl: WebGLRenderingContext, index: GLuint): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'getAttribLocation')
export declare function getAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, name: string): GLint

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'getExtension')
export declare function getExtension(gl: WebGLRenderingContext, extId: WebGLExtension, typeNum: i32): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'getUniformLocation')
export declare function getUniformLocation(gl: WebGLRenderingContext, uniLocationId: WebGLUniformLocation, program: WebGLProgram, name: string): WebGLUniformLocation

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'linkProgram')
export declare function linkProgram(gl: WebGLRenderingContext, program: WebGLProgram): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'shaderSource')
export declare function shaderSource(gl: WebGLRenderingContext, shader: WebGLShader, source: string): void

// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'uniformMatrix4fv')
export declare function uniformMatrix4fv(gl: WebGLRenderingContext, location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'useProgram')
export declare function useProgram(gl: WebGLRenderingContext, program: WebGLProgram): void

// @ts-expect-error
@external('asDOM_WebGLRenderingContext', 'vertexAttribPointer')
export declare function vertexAttribPointer(gl: WebGLRenderingContext, indx: GLint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void
