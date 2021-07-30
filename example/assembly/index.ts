// Export AssemblyScript-side glue code or not everything will work (for example the customElements API).
export * from '../node_modules/asdom/assembly/glue'

import {
	document,
	Audio,
	Element,
	HTMLDivElement,
	HTMLTemplateElement,
	Text,
	HTMLElement,
	HTMLImageElement,
	Node,
	HTMLHeadingElement,
	HTMLSpanElement,
	window,
	EmptyHistoryState,
} from '../node_modules/asdom/assembly/index'

// TODO move these into asdom, because requestAnimationFrame is a DOM API.
import {cancelAnimationFrame, requestAnimationFrame} from '../node_modules/ecmassembly/assembly/requestAnimationFrame'
import {setTimeout} from '../node_modules/ecmassembly/assembly/setTimeout'

import {log} from './imports'
import './SecondsCounter'
import './HelloFrom'

log('History length: ' + window.history.length.toString())

setTimeout(() => {
	window.history.pushState(new EmptyHistoryState(), '', '/foo')

	setTimeout(() => {
		window.history.pushState(new EmptyHistoryState(), '', '/bar')
	}, 1000)
}, 1000)

// To test these work, press the browser back and forward buttons after the
// previous timeouts complete and have changed the URL.
window.addEventListener('popstate', () => {
	log('popstate 1')
})
window.onpopstate = () => {
	log('popstate 2')
}

if (document.children.length != 1) throw new Error('document.children.length should be 1')
if (document.children[0]!.tagName != 'HTML') throw new Error('document.children[0] should be <html>')
if (document.firstElementChild!.tagName != 'HTML') throw new Error('document.firstElementChild should be <html>')
if (document.lastElementChild!.tagName != 'HTML') throw new Error('document.lastElementChild should be <html>')

let imgRotation: f32 = 0
let img: HTMLImageElement
let logoRotationLoop: () => void

let firstClick: boolean = true

// This is quick and dirty. It is quickly wanting to become a class (ideally a
// re-usable <dot-burst> custom element once asdom supports custom elements).
let explosionLoop: () => void
const dotsLength: i32 = 10
const dots: StaticArray<HTMLDivElement> = new StaticArray(dotsLength)
const dotPositions: StaticArray<f32> = new StaticArray(dotsLength)
const dotRotations: StaticArray<f32> = new StaticArray(dotsLength)
const dotPositionDeltas: StaticArray<f32> = new StaticArray(dotsLength)
let dotScale: f32 = 1.0
let explosionLoopFrame: i32 = -1

let text2: Text

let container: HTMLElement

const style = document.createElement('style')

style.innerHTML = /*css*/ `
	body {
		/* And there was 3D depth. */
		perspective: 800px;
		width: 100%;
		height: 100%;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hello span {
		font-weight: normal;
	}
	.dot {
		width: 20px; height: 20px;
		border-radius: 100%;
		background: deeppink;
		position: absolute;
		top: 25%; left: 50%;
	}
	.selected * {
		background: #0fc;
	}
`

document.body!.appendChild(style)

const el = document.createElement('h1') as HTMLHeadingElement
el.setAttribute('class', 'hello')

el.innerHTML = /*html*/ `<span class="hellospan"><em>hello</em> from <strong>AssemblyScript</strong></span>`
document.body!.appendChild(el)
log('h1 child node count: ' + el.childNodes.length.toString())

let item = el.childNodes.item(0)!.childNodes.item(2)!
if (!(item instanceof HTMLElement && (item as HTMLElement).innerHTML == 'AssemblyScript'))
	throw new Error('Expected different result from childNodes.item()')

item = el.childNodes[0]!.childNodes[2]!
if (!(item instanceof HTMLElement && (item as HTMLElement).innerHTML == 'AssemblyScript'))
	throw new Error('Expected different result from childNodes[]')

// TEST Node.lastChild / Node.previousSibling {{

let i: i32 = 0

// All these should work. Github issue: https://github.com/AssemblyScript/assemblyscript/issues/1973
// for (let node: Node | null = el.childNodes[0]!.firstChild; node; node = node.nextSibling) i++ // COMPILE ERROR
for (let node: Node | null = el.childNodes[0]!.firstChild; node; node = node!.nextSibling) i++ // OK
// for (let node: Node | null = el.childNodes[0]!.firstChild; node!; node = node.nextSibling) i++ // COMPILE ERROR
// for (let node: Node | null = el.childNodes[0]!.firstChild; node!; node = node!.nextSibling) i++ // RUNTIME ERROR
// for (let node: Node | null = el.childNodes[0]!.firstChild; node != null; node = node.nextSibling) i++ // COMPILE ERROR
// for (let node: Node | null = el.childNodes[0]!.firstChild; node != null; node = node!.nextSibling) i++ // OK
//
// These while-loop variants should all work the same too.
// let node: Node | null = el.childNodes[0]!.firstChild
// while (node) { node = node.nextSibling; i++ } // ERROR
// while (node) { node = node!.nextSibling; i++ } // OK
// while (node!) { node = node.nextSibling; i++ } // ERROR
// while (node!) { node = node!.nextSibling; i++ } // ERROR
// while (node != null) { node = node.nextSibling; i++ } // ERROR
// while (node != null) { node = node!.nextSibling; i++ } // OK

if (i != 3) throw new Error('Unexpected number of child nodes.')

// }}

// TEST Node.lastChild / Node.previousSibling {{

i = 0
for (let node: Node | null = el.childNodes[0]!.lastChild; node; node = node!.previousSibling) i++

if (i != 3) throw new Error('Unexpected number of child nodes.')

// }}

// TEST Element.lastElementChild / Element.previousElementSibling {{

i = 0
for (let node: Element | null = el.children[0]!.firstElementChild; node; node = node!.nextElementSibling) i++

if (i != 2) throw new Error('Unexpected number of child elements.')

// }}

// TEST Element.lastElementChild / Element.previousElementSibling {{

i = 0
for (let node: Element | null = el.children[0]!.lastElementChild; node; node = node!.previousElementSibling) i++

if (i != 2) throw new Error('Unexpected number of child elements.')

// }}

// TEST querySelector / querySelectorAll {{
{
	const el2 = document.body!.querySelector('h1.hello')!
	el2.setAttribute('class', 'hello selected')

	let query = el.querySelectorAll('*')
	if (query.length != 3) throw new Error('Wrong number of queried elements.')
	if (!(query[0]! instanceof HTMLSpanElement)) throw new Error('Expected a span element.')
	if (!(query[1]! instanceof HTMLElement && query[1]!.tagName == 'EM')) throw new Error('Expected an em element.')
	if (!(query[2]! instanceof HTMLElement && query[2]!.tagName == 'STRONG'))
		throw new Error('Expected a strong element.')
	if (query[3] != null) throw new Error('There should be no more elements.')

	let query2 = el.querySelectorAll('span > *')
	if (query2.length != 2) throw new Error('Wrong number of queried elements.')
	if (!(query2[0]! instanceof HTMLElement && query2[0]!.tagName == 'EM')) throw new Error('Expected an em element.')
	if (!(query2[1]! instanceof HTMLElement && query2[1]!.tagName == 'STRONG'))
		throw new Error('Expected a strong element.')
	if (query2[2] != null) throw new Error('There should be no more elements.')

	let query3 = el.querySelectorAll('.hellospan')
	if (query3.length != 1) throw new Error('Wrong number of queried elements.')
	if (!(query3[0]! instanceof HTMLSpanElement)) throw new Error('Expected a span element.')
	if (query3[1] != null) throw new Error('There should be no more elements.')

	let query4 = el.querySelectorAll('.nothing')
	if (query4.length != 0) throw new Error('Wrong number of queried elements.')
	if (query4[0] != null) throw new Error('There should be no more elements.')
}
// }}

document.body!.onclick = () => {
	cancelAnimationFrame(explosionLoopFrame)

	dotScale = 1.0

	for (let i = 0; i < dotsLength; i++) {
		if (!firstClick) dots[i].remove()

		const dot = document.createElement('div') as HTMLDivElement
		dots[i] = dot
		dotPositions[i] = 0.0
		dotPositionDeltas[i] = 3.0 + Mathf.random() * 2.0
		dotRotations[i] = 360.0 * Mathf.random()
		dot.setAttribute('class', 'dot')
		document.body!.appendChild(dot)
	}

	firstClick = false

	explosionLoopFrame = requestAnimationFrame(
		(explosionLoop = () => {
			dotScale -= 0.03

			for (let i = 0; i < dotsLength; i++) {
				const dot = dots[i]
				dotPositions[i] += dotPositionDeltas[i]
				dot.setAttribute(
					'style',
					'transform: translate3d(-50%, -50%, 0.01px) rotateZ(' +
						dotRotations[i].toString() +
						'deg) translate(' +
						dotPositions[i].toString() +
						'px) scale(' +
						dotScale.toString() +
						')',
				)
			}

			if (dotScale > 0) explosionLoopFrame = requestAnimationFrame(explosionLoop)
		}),
	)
}

const clickHandler: () => void = () => {
	log('body clicked!')
}

document.body!.addEventListener('click', clickHandler)

const audio = new Audio('../assets/audio2.mp3')

audio.autoplay = true
log('audio autoplay: ' + audio.autoplay.toString())

const template = document.createElement('template') as HTMLTemplateElement
document.body!.appendChild(template)
template.innerHTML = '<h2>Hello yet again! (template.content)</h2>'
document.body!.appendChild(template.content)

const template2 = document.createElement('template') as HTMLTemplateElement
document.body!.appendChild(template2)
template2.innerHTML = '<h2>Hello even more! (template.content.firstChild)</h2>'

const first = template2.content.firstChild! as Element
document.body!.appendChild(first)

const cloned = first.cloneNode(true) as Element
cloned.innerHTML = cloned.innerHTML.replace('even more', 'one more time')
cloned.innerHTML = cloned.innerHTML.replace('template.content.firstChild', 'element.cloneNode()')
document.body!.appendChild(cloned)

const text = document.createTextNode('This is a text node!')

let textParentElement = text.parentElement
if (textParentElement) throw new Error('There should not be a parent element yet!')

let textParentNode = text.parentNode
if (textParentNode) throw new Error('There should not be a parent node yet!')

const span1 = document.createElement('span')
span1.setAttribute('class', 'span1')
document.body!.appendChild(span1)
span1.appendChild(text)

textParentElement = text.parentElement
if (!textParentElement) throw new Error('There should be a parent element!')

textParentNode = text.parentNode
if (!textParentNode) throw new Error('There should be a parent node!')

const br = document.createElement('br')

text.parentElement!.appendChild(br)

log('Text node type should be true:')
log((text.nodeType == 3).toString())

text2 = document.createTextNode('Another text node, appended using parentNode! ')

const span2 = document.createElement('span')
span2.setAttribute('class', 'span2')
document.body!.appendChild(span2)
;(span1.parentNode! as Element).querySelector('.span2')!.appendChild(text2)

const removeButton = document.createElement('button')
removeButton.innerText = 'Remove this line'
span2.appendChild(removeButton)

removeButton.onclick = () => {
	document.body!.removeChild(span2)
	document.body!.removeEventListener('click', clickHandler)
}

container = document.createElement('div') as HTMLDivElement
container.innerHTML = /*html*/ `
	<seconds-counter></seconds-counter>
	<seconds-counter some-attribute="foo">Yes!</seconds-counter>
`

document.body!.appendChild(container)

log('--------------------')

setTimeout(() => {
	const el = container.firstElementChild!

	// This causes the custom element's attributeChangedCallback to run,
	// and it logs to the console.
	el.setAttribute('some-attribute', 'bar')
}, 1000)

const div = document.createElement('div')
document.body!.appendChild(div)

div.setAttribute('style', 'margin-top: 40px;')
div.innerHTML = /*html*/ `
	<!-- Omitting attributes causes the default values to be used. -->
	<hello-from></hello-from>

	<!-- Custom attribute values provided. -->
	<hello-from place="Oakland, CA" avatar="https://avatars.githubusercontent.com/u/297678?v=4"></hello-from>
`

// You should normally not reach into an element's shadow DOM! But for sake of example...
const hiFrom = document.querySelector('hello-from')!
img = hiFrom.shadowRoot!.querySelector('img') as HTMLImageElement

// Animate the rotation of the logo.
requestAnimationFrame(
	(logoRotationLoop = () => {
		img.setAttribute('style', 'transform: rotateY(' + (imgRotation++).toString() + 'deg)')

		requestAnimationFrame(logoRotationLoop)
	}),
)
