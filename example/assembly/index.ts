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
	HTMLCanvasElement,
	WebGLRenderingContext,
	ANGLE_instanced_arrays,
	GLenum,
	WebGLShader,
	WebGLProgram,
	WebGLBuffer,
	GLint,
	WebGLUniformLocation,
	GLfloat,
} from '../node_modules/asdom/assembly/index'

// TODO move these into asdom, because requestAnimationFrame is a DOM API.
import {cancelAnimationFrame, requestAnimationFrame} from '../node_modules/ecmassembly/assembly/requestAnimationFrame'
import {setTimeout} from '../node_modules/ecmassembly/assembly/setTimeout'

import {log} from './imports'
import './SecondsCounter'
import './HelloFrom'

log('History length: ' + window.history.length.toString())

// setTimeout(() => {
// 	window.history.pushState(new EmptyHistoryState(), '', '/foo')

// 	setTimeout(() => {
// 		window.history.pushState(new EmptyHistoryState(), '', '/bar')
// 	}, 1000)
// }, 1000)

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
let img!: HTMLImageElement
let logoRotationLoop!: () => void

let firstClick: boolean = true

// This is quick and dirty. It is quickly wanting to become a class (ideally a
// re-usable <dot-burst> custom element once asdom supports custom elements).
let explosionLoop!: () => void
const dotsLength: i32 = 10
const dots: StaticArray<HTMLDivElement> = new StaticArray(dotsLength)
const dotPositions: StaticArray<f32> = new StaticArray(dotsLength)
const dotRotations: StaticArray<f32> = new StaticArray(dotsLength)
const dotPositionDeltas: StaticArray<f32> = new StaticArray(dotsLength)
let dotScale: f32 = 1.0
let explosionLoopFrame: i32 = -1

let text2!: Text

let container!: HTMLElement

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

const audio = new Audio('../assets/otherside - lena raine.ogg')

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

testGl()

function testGl(): void {
	const canvas = document.createElement('canvas') as HTMLCanvasElement
	document.body!.appendChild(canvas)

	// Get the WebGL rendering context.
	var gl = canvas.getContext<WebGLRenderingContext>('webgl')

	if (!gl) throw new Error('No WebGL')

	const ext = gl.getExtension<ANGLE_instanced_arrays>('ANGLE_instanced_arrays')

	log('HOONIGANS ' + changetype<usize>(ext!).toString())

	// Set the clear color to a vibrant pink.
	gl.clearColor(255 / 255, 20 / 255, 147 / 255, 1.0)

	// Clear the context with the newly set color. This is
	// the function call that actually does the drawing.
	gl.clear(gl.COLOR_BUFFER_BIT)

	const buffers = initBuffers(gl)
	log('buffer? ' + (buffers.position instanceof WebGLBuffer).toString())
	log('buffer? ' + (buffers.color instanceof WebGLBuffer).toString())

	// initShaderProgram(
	// 	gl,
	// 	/*glsl*/ `
	// 	void main() {
	// 		gl_Position = vec4(0, 0, 0, 1)
	// 	}
	// `,
	// 	/*glsl*/ `
	// 	void main() {
	// 		gl_FragColor = vec4(0, 0, 0, 1)
	// 	}
	// `,
	// )
}

///////////////////////////////////////////////////////////////////////////////

webglExample()

class AttribLocations {
	vertexPosition: GLint
	vertexColor: GLint
}

class UniformLocations {
	projectionMatrix: WebGLUniformLocation
	modelViewMatrix: WebGLUniformLocation
}

class ProgramInfo {
	program: WebGLProgram
	attribLocations: AttribLocations
	uniformLocations: UniformLocations
}

// Based on https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
function webglExample(): void {
	const canvas = document.createElement('canvas') as HTMLCanvasElement
	document.body!.appendChild(canvas)
	const gl = canvas.getContext<WebGLRenderingContext>('webgl')!

	// Vertex shader program

	const vsSource = /*glsl*/ `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;

		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		varying lowp vec4 vColor;

		void main(void) {
			gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
			vColor = aVertexColor;
		}
	`

	// Fragment shader program

	const fsSource = /*glsl*/ `
		varying lowp vec4 vColor;

		void main(void) {
			gl_FragColor = vColor;
		}
	`

	// Initialize a shader program; this is where all the lighting
	// for the vertices and so forth is established.
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

	// Collect all the info needed to use the shader program.
	// Look up which attributes our shader program is using
	// for aVertexPosition, aVertexColor and also
	// look up uniform locations.
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
		} as AttribLocations,
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		} as UniformLocations,
	} as ProgramInfo

	// Here's where we call the routine that builds all the
	// objects we'll be drawing.
	const buffers = initBuffers(gl)

	// Draw the scene
	drawScene(gl, programInfo, buffers)
}

class Buffers {
	position: WebGLBuffer
	color: WebGLBuffer
}

function initBuffers(gl: WebGLRenderingContext): Buffers {
	// Create a buffer for the square's positions.

	const positionBuffer = gl.createBuffer()

	// Select the positionBuffer as the one to apply buffer
	// operations to from here out.

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

	// Now create an array of positions for the square.

	// TODO use TypedArrays instead of StaticArray once this bug is fixed: https://github.com/AssemblyScript/assemblyscript/issues/2038 {{

	// const _positions: Array<f32> = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]
	// const positions = new Float32Array(_positions.length)
	// for (let i = 0, l = _positions.length; i < l; i++) positions[i] = _positions[i]
	// gl.bufferData<f32>(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	// }} Using StaticArray for now: {{

	const positions: StaticArray<f32> = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]
	gl.bufferData<f32>(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	// }}

	// Now set up the colors for the vertices

	// prettier-ignore
	var _colors: StaticArray<f32> = [
		1.0, 1.0, 1.0, 1.0, // white
		1.0, 0.0, 0.0, 1.0, // red
		0.0, 1.0, 0.0, 1.0, // green
		0.0, 0.0, 1.0, 1.0, // blue
	]
	// const colors = new Float32Array(_colors.length)
	// for (let i = 0, l = _colors.length; i < l; i++) positions[i] = _colors[i]

	const colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	// gl.bufferData<f32>(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
	gl.bufferData<f32>(gl.ARRAY_BUFFER, _colors, gl.STATIC_DRAW)

	return {
		position: positionBuffer,
		color: colorBuffer,
	} as Buffers
}

function drawScene(gl: WebGLRenderingContext, programInfo: ProgramInfo, buffers: Buffers): void {
	gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
	gl.clearDepth(1.0) // Clear everything
	gl.enable(gl.DEPTH_TEST) // Enable depth testing
	gl.depthFunc(gl.LEQUAL) // Near things obscure far things

	// Clear the canvas before we start drawing on it.

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// Create a perspective matrix, a special matrix that is
	// used to simulate the distortion of perspective in a camera.
	// Our field of view is 45 degrees, with a width/height
	// ratio that matches the display size of the canvas
	// and we only want to see objects between 0.1 units
	// and 100 units away from the camera.

	// prettier-ignore
	const projectionMatrix: StaticArray<GLfloat> = [
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1,
	]

	// const fieldOfView: f32 = (45 * Math.PI) / 180 // in radians
	// const aspect: f32 = gl.canvas.clientWidth / gl.canvas.clientHeight
	// const zNear = 0.1
	// const zFar = 100.0

	// const projectionMatrix = mat4.create()

	// // note: glmatrix.js always has the first argument
	// // as the destination to receive the result.
	// mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

	// prettier-ignore
	const modelViewMatrix: StaticArray<GLfloat> = [
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1,
	]

	// // Set the drawing position to the "identity" point, which is
	// // the center of the scene.
	// const modelViewMatrix = mat4.create()

	// // Now move the drawing position a bit to where we want to
	// // start drawing the square.

	// mat4.translate(
	// 	modelViewMatrix, // destination matrix
	// 	modelViewMatrix, // matrix to translate
	// 	[-0.0, 0.0, -6.0],
	// ) // amount to translate

	// Tell WebGL how to pull out the positions from the position
	// buffer into the vertexPosition attribute
	{
		const numComponents = 2
		const type = gl.FLOAT
		const normalize = false
		const stride = 0
		const offset = 0
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition,
			numComponents,
			type,
			normalize,
			stride,
			offset,
		)
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
	}

	// Tell WebGL how to pull out the colors from the color buffer
	// into the vertexColor attribute.
	{
		const numComponents = 4
		const type = gl.FLOAT
		const normalize = false
		const stride = 0
		const offset = 0
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
		gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset)
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor)
	}

	// Tell WebGL to use our program when drawing

	gl.useProgram(programInfo.program)

	// Set the shader uniforms

	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

	{
		const offset = 0
		const vertexCount = 4
		gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
	}
}

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

	// Create the shader program

	const shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vertexShader)
	gl.attachShader(shaderProgram, fragmentShader)
	gl.linkProgram(shaderProgram)

	// If creating the shader program failed, alert

	// if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	// 	alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
	// 	return null
	// }

	return shaderProgram
}

function loadShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader {
	const shader = gl.createShader(type)

	// Send the source to the shader object

	gl.shaderSource(shader, source)

	// Compile the shader program

	gl.compileShader(shader)

	// See if it compiled successfully

	// if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	// 	// log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
	// 	gl.deleteShader(shader)
	// 	return null
	// }

	return shader
}
