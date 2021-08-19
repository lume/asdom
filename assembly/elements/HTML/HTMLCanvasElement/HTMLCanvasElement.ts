import {Object} from '../../../Object'
import {WebGLRenderingContext} from './webgl/WebGLRenderingContext'
import {HTMLElement} from '../HTMLElement'
import {getContext} from '../../../imports'

class WebGL2RenderingContext extends Object {
	constructor(public canvas: HTMLCanvasElement) {
		super()
	}
	// TODO
}

class CanvasRenderingContext2D extends Object {
	constructor(public canvas: HTMLCanvasElement) {
		super()
	}
	// TODO
}

class ImageBitmapRenderingContext extends Object {
	constructor(public canvas: HTMLCanvasElement) {
		super()
	}
	// TODO
}

export class HTMLCanvasElement extends HTMLElement {
	private __contextType: string | null = null
	private __context: Object | null = null

	/**
	 * Get a canvas rendering context. Given a particular `type` string, a particular `T` generic must be provided.
	 * If `type` is `"webgl"` then `T` must be `WebGLRenderingContext`.
	 * If `type` is `"webgl2"` then `T` must be `WebGL2RenderingContext`.
	 * If `type` is `"2d"` then `T` must be `CanvasRenderingContext2D`.
	 * If any other combination is given, there will be a compile error.
	 */
	@inline getContext<T extends Object>(type: string): T | null {
		const currentType = this.__contextType
		if (currentType) {
			if (currentType != type) return null
			else return this.__context as T
		}

		const obj = instantiate<T>(this)

		let typeNum: i32 = -1

		if (/*type === '2d' &&*/ obj instanceof CanvasRenderingContext2D) {
			ERROR('CanvasRenderingContext2D is TODO')
			typeNum = 0
		} else if (/*type === 'bitmaprenderer' &&*/ obj instanceof ImageBitmapRenderingContext) {
			ERROR('ImageBitmapRenderingContext is TODO')
			typeNum = 1
		} else if (/*type === 'webgl' &&*/ obj instanceof WebGLRenderingContext) {
			typeNum = 2
		} else if (/*type === 'webgl2' &&*/ obj instanceof WebGL2RenderingContext) {
			ERROR('webgl2 is TODO')
			typeNum = 3
		} else {
			ERROR('Invalid context `type` string or `T` type provided, or mismatch between `type` and `T`.')
		}

		getContext(this, obj, typeNum)
		this.__context = obj
		this.__contextType = type

		return obj
	}
}
