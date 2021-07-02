import {Audio, document, Element, HTMLDivElement} from '../node_modules/asdom/assembly/index'

// TODO move these into asdom, because requestAnimationFrame is a DOM API.
import {cancelAnimationFrame, requestAnimationFrame} from '../node_modules/ecmassembly/assembly/requestAnimationFrame'

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

export function run(): void {
	const style = document.createElement('div')

	style.innerHTML = /*html*/ `
		<style>
			body {
				/* And there was 3D depth. */
				perspective: 800px;
				width: 100%;
				height: 100%;
				padding: 0;
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
			if (!firstClick) dots[i].remove()

			const dot = document.createElement('div') as HTMLDivElement
			dots[i] = dot
			dotPositions[i] = 0.0
			dotPositionDeltas[i] = 3.0 + Mathf.random() * 2.0
			dotRotations[i] = 360.0 * Mathf.random()
			dot.setAttribute('class', 'dot')
			// dot.setAttribute(
			// 	'style',
			// 	'position: absolute; top: 25%; left: 50%; transform: translate3d(-50%, -50%, 0) translate3d(0, 0, 0) rotateZ(0deg) ',
			// )
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
}
