import {Audio, document} from '../node_modules/asdom/assembly/index'

export function run(): void {
	const style = document.createElement('div')

	style.innerHTML = /*html*/ `
		<style>
			span {
				font-weight: normal;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%)
			}
		</style>
	`

	document.body!.appendChild(style)

	const el = document.createElement('h1')

	el.innerHTML = /*html*/ `
		<span><em>hello</em> from <strong>AssemblyScript</strong></span>
	`

	document.body!.appendChild(el)

	const img = document.createElement('img')

	img.setAttribute('src', '../assets/image.png')

	img.setAttribute(
		'style',
		'border-radius: 20px; position: absolute; top: 25%; left: 50%; transform: translate(-50%, -50%)',
	)

	document.body!.appendChild(img)

	const audio = new Audio('../assets/audio2.mp3')

	audio.autoplay = true
}
