import {HTMLElement} from './HTMLElement'

export * from './HTMLElement'
export * from './Audio'
export * from './HTMLTemplateElement'

// We can move any of these into their own file if/when they need custom implementation.
export class HTMLBodyElement extends HTMLElement {}
export class HTMLDivElement extends HTMLElement {}
export class HTMLSpanElement extends HTMLElement {}
export class HTMLParagraphElement extends HTMLElement {}
export class HTMLAnchorElement extends HTMLElement {}
export class HTMLScriptElement extends HTMLElement {}
export class HTMLImageElement extends HTMLElement {}
export class Image extends HTMLImageElement {}
export class HTMLHeadingElement extends HTMLElement {}

export class HTMLUnknownElement extends HTMLElement {}
