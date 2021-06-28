import {document} from '../node_modules/asdom/assembly/index'

export function run(): void {
	const el = document.createElement('h1')

	el.setAttribute('foo', 'bar')

	const s: string = el.getAttribute('foo')! // returns "bar"

	el.innerHTML = /*html*/ `
		<style>
			span {
				font-weight: normal;
				position: absolute;
				top: 50%; left: 50%;
				transform: translate(-50%, -50%)
			}
		</style>

		<span><em>hello</em> from <strong>AssemblyScript</strong></span>
	`

	document.body!.appendChild(el)
}
