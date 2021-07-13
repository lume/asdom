// Export AssemblyScript-side glue code or not everything will work (for example the customElements API).
export * from '../node_modules/asdom/assembly/glue'

import {
	document,
	customElements,
	Audio,
	Element,
	HTMLDivElement,
	HTMLTemplateElement,
	unbind,
	Text,
	HTMLElement,
	HTMLImageElement,
	Node,
	HTMLHeadingElement,
	HTMLSpanElement,
} from '../node_modules/asdom/assembly/index'

// TODO move these into asdom, because requestAnimationFrame is a DOM API.
import {cancelAnimationFrame, requestAnimationFrame} from '../node_modules/ecmassembly/assembly/requestAnimationFrame'
import {setTimeout} from '../node_modules/ecmassembly/assembly/setTimeout'

import {log} from './imports'
import {SecondsCounter} from './SecondsCounter'

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

const style = document.createElement('div')

style.innerHTML = `
	<style>
		body {
			/* And there was 3D depth. */
			perspective: 800px;
			width: 100%;
			height: 100%;
			margin: 0;
		}
		.hello span {
			font-weight: normal;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%)
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
	</style>
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

const el2 = document.body!.querySelector('h1.hello')!
el2.setAttribute('class', 'hello selected')

let queryResult = el.querySelectorAll('*')
if (queryResult.length != 3) throw new Error('Wrong number of queried elements.')
if (!(queryResult[0]! instanceof HTMLSpanElement)) throw new Error('Expected a different type of element.')
if (!(queryResult[1]! instanceof HTMLElement)) throw new Error('Expected a different type of element.')
if (!(queryResult[2]! instanceof HTMLElement)) throw new Error('Expected a different type of element.')
if (queryResult[3] != null) throw new Error('There should be no more elements.')

queryResult = el.querySelectorAll('span > *')
if (queryResult.length != 2) throw new Error('Wrong number of queried elements.')
if (!(queryResult[0]! instanceof HTMLElement)) throw new Error('Expected a different type of element.')
if (!(queryResult[1]! instanceof HTMLElement)) throw new Error('Expected a different type of element.')
if (queryResult[2] != null) throw new Error('There should be no more elements.')

queryResult = el.querySelectorAll('.hellospan')
if (queryResult.length != 1) throw new Error('Wrong number of queried elements.')
if (!(queryResult[0]! instanceof HTMLSpanElement)) throw new Error('Expected a different type of element.')
if (queryResult[1] != null) throw new Error('There should be no more elements.')

queryResult = el.querySelectorAll('.nothing')
if (queryResult.length != 0) throw new Error('Wrong number of queried elements.')
if (queryResult[0] != null) throw new Error('There should be no more elements.')

// }}

img = document.createElement('img') as HTMLImageElement

img.setAttribute('src', '../assets/image.png')

// Animate the rotation of the logo.
requestAnimationFrame(
	(logoRotationLoop = () => {
		img.setAttribute(
			'style',
			'border-radius: 20px; position: absolute; top: 25%; left: 50%; transform: translate(-50%, -50%) rotateY(' +
				(imgRotation++).toString() +
				'deg)',
		)

		requestAnimationFrame(logoRotationLoop)
	}),
)

document.body!.appendChild(img)

document.body!.onclick = () => {
	cancelAnimationFrame(explosionLoopFrame)

	dotScale = 1.0

	for (let i = 0; i < dotsLength; i++) {
		if (!firstClick) {
			dots[i].remove()

			// Don't forget to unbind any element when done using it to avoid a memory leak!
			unbind(dots[i])
		}

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

document.body!.appendChild(text)

textParentElement = text.parentElement
if (!textParentElement) throw new Error('There should be a parent element!')

textParentNode = text.parentNode
if (!textParentNode) throw new Error('There should be a parent node!')

const br = document.createElement('br')

text.parentElement!.appendChild(br)

text2 = document.createTextNode('Another text node, appended using parentNode!')
text.parentNode!.appendChild(text2)

log('Text node type should be true:')
log((text.nodeType == 3).toString())

setTimeout(() => {
	document.body!.removeChild(text2)

	// When you no longer need an element, don't forget to call unbind on
	// it to avoid a memory leak.
	//
	// Although this is not needed in JS / TS, it is needed in AS.
	//
	// After unbinding, you should not use the unbound instances or else
	// things may not work as expected.
	unbind(text2)
}, 1000)

customElements.define('seconds-counter', () => new SecondsCounter(), SecondsCounter.observedAttributes)

container = document.createElement('div') as HTMLDivElement
container.innerHTML = /*html*/ `<seconds-counter></seconds-counter>
<seconds-counter some-attribute="foo"></seconds-counter>`

document.body!.appendChild(container)

log('--------------------')

setTimeout(() => {
	const el = container.firstChild as SecondsCounter

	// This causes the custom element's attributeChangedCallback to run,
	// and it logs to the console.
	el.setAttribute('some-attribute', 'bar')
}, 1000)
