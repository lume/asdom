import {
	Audio,
	document,
	Element,
	HTMLDivElement,
	HTMLTemplateElement,
	unbind,
	Text
} from '../node_modules/asdom/assembly/index'

// @ts-expect-error
@external('asDOM_Node', 'log')
declare function log(msg: string): void

// TODO move these into asdom, because requestAnimationFrame is a DOM API.
import {cancelAnimationFrame, requestAnimationFrame} from '../node_modules/ecmassembly/assembly/requestAnimationFrame'
import {setTimeout} from '../node_modules/ecmassembly/assembly/setTimeout'

let imgRotation: f32 = 0
let img: Element // TODO: There's no HTMLImageElement yet.
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

export function run(): void {
	const style = document.createElement('div')

	style.innerHTML = /*html*/ `
		<style>
			body {
				/* And there was 3D depth. */
				perspective: 800px;
				width: 100%;
				height: 100%;
				margin: 0;
			}
			span {
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
		</style>
	`

	document.body!.appendChild(style)

	const el = document.createElement('h1')

	el.innerHTML = /*html*/ `
		<span><em>hello</em> from <strong>AssemblyScript</strong></span>
	`

	document.body!.appendChild(el)

	img = document.createElement('img')

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

	if (text.parentNode) throw new Error('There should not be a parent yet!')

	document.body!.appendChild(text)

	const br = document.createElement('br')

	text.parentNode!.appendChild(br)

	text2 = document.createTextNode('Another text node, appended using parentNode!')
	text.parentNode!.appendChild(text2)

	// Don't forget that in AssemblyScript (unlike in JavaScript or TypeScript)
	// you should unbind any DOM instances you are done using, otherwise there
	// will be a memory leak. After this, you should not use the unbound
	// instances or else the DOM bindings may not work as expected.
	unbind(style)
	unbind(el)
	unbind(img)
	unbind(audio)
	unbind(template)
	unbind(template2)
	unbind(first)
	unbind(cloned)
	unbind(text)
	unbind(br)
	unbind(text.parentNode!) // Because we used it.


	log('Text node type should be true:')
	log((text.nodeType == 3).toString())

	setTimeout(() => {
		document.body!.removeChild(text2)
		unbind(text2)
	}, 1000)
}
