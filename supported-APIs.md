# Suported APIs

The following APIs are supported , and in some cases only partially. For
example, `document.createElement()` can create currently any type of element,
however only a subset of available classes is supported (listed below). For any
elements that don't yet have a supporting class, an `HTMLUnknownElement`
instance will be returned. For example, `document.createElement('video')` will
currently return an instance of `HTMLUnknownElement` and you will not be able
to use video-specific properties or methods, but you can still set attributes
on the element and you can still pass it around to other DOM APIs.

Please open an issue or PR for any APIs you may need, and we'll prioritize that way.

# Class hierarchy

If a method or property is not listed in the outline, it means we haven't added support for it
yet (or someone forgot to update this outline).

- `Object`
  - Subclasses:
    - `History`
      - `pushState()`
      - `replaceState()`
      - `length`
    - `CustomElementRegistry`
      - `define()`
    - `NodeList`
    - `HTMLCollection`
    - `EventTarget`
      - `addEventListener`
      - `removeEventListener`
      - Subclasses:
        - `Window`
          - `document`
          - `customElements`
          - `history`
          - `onclick`
          - `onpopstate`
        - `Node`
          - `static ELEMENT_NODE`
          - `static ATTRIBUTE_NODE`
          - `static TEXT_NODE`
          - `static CDATA_SECTION_NODE`
          - `static PROCESSING_INSTRUCTION_NODE`
          - `static COMMENT_NODE`
          - `static DOCUMENT_NODE`
          - `static DOCUMENT_TYPE_NODE`
          - `static DOCUMENT_FRAGMENT_NODE`
          - `nodeType`
          - `parentNode`
          - `parentElement`
          - `childNodes`
          - `firstChild`
          - `lastChild`
          - `nextSibling`
          - `previousSibling`
          - `appendChild()`
          - `removeChild()`
          - `cloneNode()`
          - Subclasses:
            - `DocumentFragment`
              - `children`
              - `firstElementChild`
              - `lastElementChild`
              - `querySelector()`
              - `querySelectorAll()`
              - Subclasses:
                - `ShadowRoot`
                  - `innerHTML`
            - `CharacterData`
              - Subclasses:
                - `Text`
            - `Document`
              - `URL`
              - `body`
              - `createElement()`
              - `createTextNode()`
              - `children`
              - `firstElementChild`
              - `lastElementChild`
              - `querySelector()`
              - `querySelectorAll()`
            - `Element`
              - `tagName`
              - `setAttribute()`
              - `getAttribute()`
              - `innerHTML`
              - `children`
              - `firstElementChild`
              - `lastElementChild`
              - `nextElementSibling`
              - `previousElementSibling`
              - `click()`
              - `onclick` (No `Event` object is passed into the callback yet, but at least you can react to a click)
              - `remove()`
              - `querySelector()`
              - `querySelectorAll()`
              - `shadowRoot`
              - `attachShadow()`
              - Subclasses:
                - `HTMLElement` (`<section>` and various other elements extend from this)
                  - Subclasses:
                    - `HTMLBodyElement` (`<body>`)
                    - `HTMLDivElement` (`<div>`)
                    - `HTMLSpanElement` (`<span>`)
                    - `HTMLParagraphElement` (`<p>`)
                    - `HTMLAnchorElement` (`<a>`)
                    - `HTMLScriptElement` (`<script>`)
                    - `HTMLImageElement`/`Image` (`<img>`)
                    - `HTMLAudioElement`/`Audio` (`<audio>`)
                      - `play()`
                      - `pause()`
                      - `autoplay`
                    - `HTMLHeadingElement` (`<h1>` - `<h6>`)
                    - `HTMLTemplateElement` (`<template>`)
                      - `content`
                    - `HTMLUnknownElement` (any unrecognized non-hyphenated element)
                - `SVGElement`
                  - Subclasses:
                    - `SVGSVGElement` (`<svg>`)

# Additional APIs from ECMAseembly

In addition to DOM APIs, you might like to use [`ecmassembly`](https://github.com/aspkg/ecmassembly) for APIs such as

- `setTimeout`/`clearTimeout`
- `requestAnimationFrame`/`clearAnimationFrame`
- `Promise`
