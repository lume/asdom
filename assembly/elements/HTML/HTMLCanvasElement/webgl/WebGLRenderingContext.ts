import {HTMLCanvasElement} from '../../../..'
import {
	attachShader,
	bindBuffer,
	bufferData,
	clear,
	clearColor,
	clearDepth,
	compileShader,
	createBuffer,
	createProgram,
	createShader,
	depthFunc,
	drawArrays,
	enable,
	enableVertexAttribArray,
	getAttribLocation,
	getExtension,
	getUniformLocation,
	linkProgram,
	shaderSource,
	uniformMatrix4fv,
	useProgram,
	vertexAttribPointer,
} from '../../../../imports'
import {Object} from '../../../../Object'

type WebGLContextAttributes = i32

export type GLenum = u32
export type GLboolean = bool
export type GLbitfield = u32
export type GLbyte = i8
export type GLshort = i16
export type GLint = i32
export type GLsizei = i32
export type GLintptr = i32 //i64;
export type GLsizeiptr = i32 //i64;
export type GLubyte = u8
export type GLushort = u16
export type GLuint = u32
export type GLfloat = f32
export type GLclampf = f32
export type GLuint64 = u32 //u64;
export type GLint64 = i32 //i64;

export class WebGLUniformLocation extends Object {}
export type TexImageSource = i32
export type Int32List = i32
export type Uint32List = i32
export type Float32List = i32
export type WebGLQuery = i32
export type WebGLSampler = i32
export type WebGLSync = i32
export type WebGLTransformFeedback = i32
export type ImageData = i32
export type DOMString = string
export type HTMLImageElement = externref
export type HTMLVideoElement = externref
export type WebGLVertexArrayObject = i32

// === WebGLContextAttributes ===
export const ALPHA_DEFAULT = true
export const FALSE: GLboolean = false
export const DEPTH_DEFAULT = true
export const STENCIL_DEFAULT = false
export const ANTIALIAS_DEFAULT = true
export const PREMULTIPLIED_ALPHA_DEFAULT = true
export const PRESERVE_DRAWING_BUFFER_DEFAULT = false

/* ClearBufferMask */
export const DEPTH_BUFFER_BIT: GLenum = 0x00000100
export const STENCIL_BUFFER_BIT: GLenum = 0x00000400
export const COLOR_BUFFER_BIT: GLenum = 0x00004000

/* BeginMode */
export const POINTS: GLenum = 0x0000
export const LINES: GLenum = 0x0001
export const LINE_LOOP: GLenum = 0x0002
export const LINE_STRIP: GLenum = 0x0003
export const TRIANGLES: GLenum = 0x0004
export const TRIANGLE_STRIP: GLenum = 0x0005
export const TRIANGLE_FAN: GLenum = 0x0006

/* AlphaFunction (not supported in ES20) */
/*      NEVER */
/*      LESS */
/*      EQUAL */
/*      LEQUAL */
/*      GREATER */
/*      NOTEQUAL */
/*      GEQUAL */
/*      ALWAYS */

/* BlendingFactorDest */
export const ZERO: GLenum = 0
export const ONE: GLenum = 1
export const SRC_COLOR: GLenum = 0x0300
export const ONE_MINUS_SRC_COLOR: GLenum = 0x0301
export const SRC_ALPHA: GLenum = 0x0302
export const ONE_MINUS_SRC_ALPHA: GLenum = 0x0303
export const DST_ALPHA: GLenum = 0x0304
export const ONE_MINUS_DST_ALPHA: GLenum = 0x0305

/* BlendingFactorSrc */
/*      ZERO */
/*      ONE */
export const DST_COLOR: GLenum = 0x0306
export const ONE_MINUS_DST_COLOR: GLenum = 0x0307
export const SRC_ALPHA_SATURATE: GLenum = 0x0308
/*      SRC_ALPHA */
/*      ONE_MINUS_SRC_ALPHA */
/*      DST_ALPHA */
/*      ONE_MINUS_DST_ALPHA */

/* BlendEquationSeparate */
export const FUNC_ADD: GLenum = 0x8006
export const BLEND_EQUATION: GLenum = 0x8009
export const BLEND_EQUATION_RGB: GLenum = 0x8009
export const BLEND_EQUATION_ALPHA: GLenum = 0x883d

/* BlendSubtract */
export const FUNC_SUBTRACT: GLenum = 0x800a
export const FUNC_REVERSE_SUBTRACT: GLenum = 0x800b

/* Separate Blend Functions */
export const BLEND_DST_RGB: GLenum = 0x80c8
export const BLEND_SRC_RGB: GLenum = 0x80c9
export const BLEND_DST_ALPHA: GLenum = 0x80ca
export const BLEND_SRC_ALPHA: GLenum = 0x80cb
export const CONSTANT_COLOR: GLenum = 0x8001
export const ONE_MINUS_CONSTANT_COLOR: GLenum = 0x8002
export const CONSTANT_ALPHA: GLenum = 0x8003
export const ONE_MINUS_CONSTANT_ALPHA: GLenum = 0x8004
export const BLEND_COLOR: GLenum = 0x8005

/* Buffer Objects */
export const ARRAY_BUFFER: GLenum = 0x8892
export const ELEMENT_ARRAY_BUFFER: GLenum = 0x8893
export const ARRAY_BUFFER_BINDING: GLenum = 0x8894
export const ELEMENT_ARRAY_BUFFER_BINDING: GLenum = 0x8895

export const STREAM_DRAW: GLenum = 0x88e0
export const STATIC_DRAW: GLenum = 0x88e4
export const DYNAMIC_DRAW: GLenum = 0x88e8

export const BUFFER_SIZE: GLenum = 0x8764
export const BUFFER_USAGE: GLenum = 0x8765

export const CURRENT_VERTEX_ATTRIB: GLenum = 0x8626

/* CullFaceMode */
export const FRONT: GLenum = 0x0404
export const BACK: GLenum = 0x0405
export const FRONT_AND_BACK: GLenum = 0x0408

/* DepthFunction */
/*      NEVER */
/*      LESS */
/*      EQUAL */
/*      LEQUAL */
/*      GREATER */
/*      NOTEQUAL */
/*      GEQUAL */
/*      ALWAYS */

/* EnableCap */
/* TEXTURE_2D */
export const CULL_FACE: GLenum = 0x0b44
export const BLEND: GLenum = 0x0be2
export const DITHER: GLenum = 0x0bd0
export const STENCIL_TEST: GLenum = 0x0b90
export const DEPTH_TEST: GLenum = 0x0b71
export const SCISSOR_TEST: GLenum = 0x0c11
export const POLYGON_OFFSET_FILL: GLenum = 0x8037
export const SAMPLE_ALPHA_TO_COVERAGE: GLenum = 0x809e
export const SAMPLE_COVERAGE: GLenum = 0x80a0

/* ErrorCode */
export const NO_ERROR: GLenum = 0
export const INVALID_ENUM: GLenum = 0x0500
export const INVALID_VALUE: GLenum = 0x0501
export const INVALID_OPERATION: GLenum = 0x0502
export const OUT_OF_MEMORY: GLenum = 0x0505

/* FrontFaceDirection */
export const CW: GLenum = 0x0900
export const CCW: GLenum = 0x0901

/* GetPName */
export const LINE_WIDTH: GLenum = 0x0b21
export const ALIASED_POINT_SIZE_RANGE: GLenum = 0x846d
export const ALIASED_LINE_WIDTH_RANGE: GLenum = 0x846e
export const CULL_FACE_MODE: GLenum = 0x0b45
export const FRONT_FACE: GLenum = 0x0b46
export const DEPTH_RANGE: GLenum = 0x0b70
export const DEPTH_WRITEMASK: GLenum = 0x0b72
export const DEPTH_CLEAR_VALUE: GLenum = 0x0b73
export const DEPTH_FUNC: GLenum = 0x0b74
export const STENCIL_CLEAR_VALUE: GLenum = 0x0b91
export const STENCIL_FUNC: GLenum = 0x0b92
export const STENCIL_FAIL: GLenum = 0x0b94
export const STENCIL_PASS_DEPTH_FAIL: GLenum = 0x0b95
export const STENCIL_PASS_DEPTH_PASS: GLenum = 0x0b96
export const STENCIL_REF: GLenum = 0x0b97
export const STENCIL_VALUE_MASK: GLenum = 0x0b93
export const STENCIL_WRITEMASK: GLenum = 0x0b98
export const STENCIL_BACK_FUNC: GLenum = 0x8800
export const STENCIL_BACK_FAIL: GLenum = 0x8801
export const STENCIL_BACK_PASS_DEPTH_FAIL: GLenum = 0x8802
export const STENCIL_BACK_PASS_DEPTH_PASS: GLenum = 0x8803
export const STENCIL_BACK_REF: GLenum = 0x8ca3
export const STENCIL_BACK_VALUE_MASK: GLenum = 0x8ca4
export const STENCIL_BACK_WRITEMASK: GLenum = 0x8ca5
export const VIEWPORT: GLenum = 0x0ba2
export const SCISSOR_BOX: GLenum = 0x0c10
/*      SCISSOR_TEST */
export const COLOR_CLEAR_VALUE: GLenum = 0x0c22
export const COLOR_WRITEMASK: GLenum = 0x0c23
export const UNPACK_ALIGNMENT: GLenum = 0x0cf5
export const PACK_ALIGNMENT: GLenum = 0x0d05
export const MAX_TEXTURE_SIZE: GLenum = 0x0d33
export const MAX_VIEWPORT_DIMS: GLenum = 0x0d3a
export const SUBPIXEL_BITS: GLenum = 0x0d50
export const RED_BITS: GLenum = 0x0d52
export const GREEN_BITS: GLenum = 0x0d53
export const BLUE_BITS: GLenum = 0x0d54
export const ALPHA_BITS: GLenum = 0x0d55
export const DEPTH_BITS: GLenum = 0x0d56
export const STENCIL_BITS: GLenum = 0x0d57
export const POLYGON_OFFSET_UNITS: GLenum = 0x2a00
/*      POLYGON_OFFSET_FILL */
export const POLYGON_OFFSET_FACTOR: GLenum = 0x8038
export const TEXTURE_BINDING_2D: GLenum = 0x8069
export const SAMPLE_BUFFERS: GLenum = 0x80a8
export const SAMPLES: GLenum = 0x80a9
export const SAMPLE_COVERAGE_VALUE: GLenum = 0x80aa
export const SAMPLE_COVERAGE_INVERT: GLenum = 0x80ab

/* GetTextureParameter */
/*      TEXTURE_MAG_FILTER */
/*      TEXTURE_MIN_FILTER */
/*      TEXTURE_WRAP_S */
/*      TEXTURE_WRAP_T */

export const COMPRESSED_TEXTURE_FORMATS: GLenum = 0x86a3

/* HintMode */
export const DONT_CARE: GLenum = 0x1100
export const FASTEST: GLenum = 0x1101
export const NICEST: GLenum = 0x1102

/* HintTarget */
export const GENERATE_MIPMAP_HINT: GLenum = 0x8192

/* DataType */
export const BYTE: GLenum = 0x1400
export const UNSIGNED_BYTE: GLenum = 0x1401
export const SHORT: GLenum = 0x1402
export const UNSIGNED_SHORT: GLenum = 0x1403
export const INT: GLenum = 0x1404
export const UNSIGNED_INT: GLenum = 0x1405
export const FLOAT: GLenum = 0x1406

/* PixelFormat */
export const DEPTH_COMPONENT: GLenum = 0x1902
export const ALPHA: GLenum = 0x1906
export const RGB: GLenum = 0x1907
export const RGBA: GLenum = 0x1908
export const LUMINANCE: GLenum = 0x1909
export const LUMINANCE_ALPHA: GLenum = 0x190a

/* PixelType */
/*      UNSIGNED_BYTE */
export const UNSIGNED_SHORT_4_4_4_4: GLenum = 0x8033
export const UNSIGNED_SHORT_5_5_5_1: GLenum = 0x8034
export const UNSIGNED_SHORT_5_6_5: GLenum = 0x8363

/* Shaders */
export const FRAGMENT_SHADER: GLenum = 0x8b30
export const VERTEX_SHADER: GLenum = 0x8b31
export const MAX_VERTEX_ATTRIBS: GLenum = 0x8869
export const MAX_VERTEX_UNIFORM_VECTORS: GLenum = 0x8dfb
export const MAX_VARYING_VECTORS: GLenum = 0x8dfc
export const MAX_COMBINED_TEXTURE_IMAGE_UNITS: GLenum = 0x8b4d
export const MAX_VERTEX_TEXTURE_IMAGE_UNITS: GLenum = 0x8b4c
export const MAX_TEXTURE_IMAGE_UNITS: GLenum = 0x8872
export const MAX_FRAGMENT_UNIFORM_VECTORS: GLenum = 0x8dfd
export const SHADER_TYPE: GLenum = 0x8b4f
export const DELETE_STATUS: GLenum = 0x8b80
export const LINK_STATUS: GLenum = 0x8b82
export const VALIDATE_STATUS: GLenum = 0x8b83
export const ATTACHED_SHADERS: GLenum = 0x8b85
export const ACTIVE_UNIFORMS: GLenum = 0x8b86
export const ACTIVE_ATTRIBUTES: GLenum = 0x8b89
export const SHADING_LANGUAGE_VERSION: GLenum = 0x8b8c
export const CURRENT_PROGRAM: GLenum = 0x8b8d

/* StencilFunction */
export const NEVER: GLenum = 0x0200
export const LESS: GLenum = 0x0201
export const EQUAL: GLenum = 0x0202
export const LEQUAL: GLenum = 0x0203
export const GREATER: GLenum = 0x0204
export const NOTEQUAL: GLenum = 0x0205
export const GEQUAL: GLenum = 0x0206
export const ALWAYS: GLenum = 0x0207

/* StencilOp */
/*      ZERO */
export const KEEP: GLenum = 0x1e00
export const REPLACE: GLenum = 0x1e01
export const INCR: GLenum = 0x1e02
export const DECR: GLenum = 0x1e03
export const INVERT: GLenum = 0x150a
export const INCR_WRAP: GLenum = 0x8507
export const DECR_WRAP: GLenum = 0x8508

/* StringName */
export const VENDOR: GLenum = 0x1f00
export const RENDERER: GLenum = 0x1f01
export const VERSION: GLenum = 0x1f02

/* TextureMagFilter */
export const NEAREST: GLenum = 0x2600
export const LINEAR: GLenum = 0x2601

/* TextureMinFilter */
/*      NEAREST */
/*      LINEAR */
export const NEAREST_MIPMAP_NEAREST: GLenum = 0x2700
export const LINEAR_MIPMAP_NEAREST: GLenum = 0x2701
export const NEAREST_MIPMAP_LINEAR: GLenum = 0x2702
export const LINEAR_MIPMAP_LINEAR: GLenum = 0x2703

/* TextureParameterName */
export const TEXTURE_MAG_FILTER: GLenum = 0x2800
export const TEXTURE_MIN_FILTER: GLenum = 0x2801
export const TEXTURE_WRAP_S: GLenum = 0x2802
export const TEXTURE_WRAP_T: GLenum = 0x2803

/* TextureTarget */
export const TEXTURE_2D: GLenum = 0x0de1
export const TEXTURE: GLenum = 0x1702

export const TEXTURE_CUBE_MAP: GLenum = 0x8513
export const TEXTURE_BINDING_CUBE_MAP: GLenum = 0x8514
export const TEXTURE_CUBE_MAP_POSITIVE_X: GLenum = 0x8515
export const TEXTURE_CUBE_MAP_NEGATIVE_X: GLenum = 0x8516
export const TEXTURE_CUBE_MAP_POSITIVE_Y: GLenum = 0x8517
export const TEXTURE_CUBE_MAP_NEGATIVE_Y: GLenum = 0x8518
export const TEXTURE_CUBE_MAP_POSITIVE_Z: GLenum = 0x8519
export const TEXTURE_CUBE_MAP_NEGATIVE_Z: GLenum = 0x851a
export const MAX_CUBE_MAP_TEXTURE_SIZE: GLenum = 0x851c

/* TextureUnit */
export const TEXTURE0: GLenum = 0x84c0
export const TEXTURE1: GLenum = 0x84c1
export const TEXTURE2: GLenum = 0x84c2
export const TEXTURE3: GLenum = 0x84c3
export const TEXTURE4: GLenum = 0x84c4
export const TEXTURE5: GLenum = 0x84c5
export const TEXTURE6: GLenum = 0x84c6
export const TEXTURE7: GLenum = 0x84c7
export const TEXTURE8: GLenum = 0x84c8
export const TEXTURE9: GLenum = 0x84c9
export const TEXTURE10: GLenum = 0x84ca
export const TEXTURE11: GLenum = 0x84cb
export const TEXTURE12: GLenum = 0x84cc
export const TEXTURE13: GLenum = 0x84cd
export const TEXTURE14: GLenum = 0x84ce
export const TEXTURE15: GLenum = 0x84cf
export const TEXTURE16: GLenum = 0x84d0
export const TEXTURE17: GLenum = 0x84d1
export const TEXTURE18: GLenum = 0x84d2
export const TEXTURE19: GLenum = 0x84d3
export const TEXTURE20: GLenum = 0x84d4
export const TEXTURE21: GLenum = 0x84d5
export const TEXTURE22: GLenum = 0x84d6
export const TEXTURE23: GLenum = 0x84d7
export const TEXTURE24: GLenum = 0x84d8
export const TEXTURE25: GLenum = 0x84d9
export const TEXTURE26: GLenum = 0x84da
export const TEXTURE27: GLenum = 0x84db
export const TEXTURE28: GLenum = 0x84dc
export const TEXTURE29: GLenum = 0x84dd
export const TEXTURE30: GLenum = 0x84de
export const TEXTURE31: GLenum = 0x84df
export const ACTIVE_TEXTURE: GLenum = 0x84e0

/* TextureWrapMode */
export const REPEAT: GLenum = 0x2901
export const CLAMP_TO_EDGE: GLenum = 0x812f
export const MIRRORED_REPEAT: GLenum = 0x8370

/* Uniform Types */
export const FLOAT_VEC2: GLenum = 0x8b50
export const FLOAT_VEC3: GLenum = 0x8b51
export const FLOAT_VEC4: GLenum = 0x8b52
export const INT_VEC2: GLenum = 0x8b53
export const INT_VEC3: GLenum = 0x8b54
export const INT_VEC4: GLenum = 0x8b55
export const BOOL: GLenum = 0x8b56
export const BOOL_VEC2: GLenum = 0x8b57
export const BOOL_VEC3: GLenum = 0x8b58
export const BOOL_VEC4: GLenum = 0x8b59
export const FLOAT_MAT2: GLenum = 0x8b5a
export const FLOAT_MAT3: GLenum = 0x8b5b
export const FLOAT_MAT4: GLenum = 0x8b5c
export const SAMPLER_2D: GLenum = 0x8b5e
export const SAMPLER_CUBE: GLenum = 0x8b60

/* Vertex Arrays */
export const VERTEX_ATTRIB_ARRAY_ENABLED: GLenum = 0x8622
export const VERTEX_ATTRIB_ARRAY_SIZE: GLenum = 0x8623
export const VERTEX_ATTRIB_ARRAY_STRIDE: GLenum = 0x8624
export const VERTEX_ATTRIB_ARRAY_TYPE: GLenum = 0x8625
export const VERTEX_ATTRIB_ARRAY_NORMALIZED: GLenum = 0x886a
export const VERTEX_ATTRIB_ARRAY_POINTER: GLenum = 0x8645
export const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: GLenum = 0x889f

/* Shader Source */
export const COMPILE_STATUS: GLenum = 0x8b81

/* Shader Precision-Specified Types */
export const LOW_FLOAT: GLenum = 0x8df0
export const MEDIUM_FLOAT: GLenum = 0x8df1
export const HIGH_FLOAT: GLenum = 0x8df2
export const LOW_INT: GLenum = 0x8df3
export const MEDIUM_INT: GLenum = 0x8df4
export const HIGH_INT: GLenum = 0x8df5

/* Framebuffer Object. */
export const FRAMEBUFFER: GLenum = 0x8d40
export const RENDERBUFFER: GLenum = 0x8d41

export const RGBA4: GLenum = 0x8056
export const RGB5_A1: GLenum = 0x8057
export const RGB565: GLenum = 0x8d62
export const DEPTH_COMPONENT16: GLenum = 0x81a5
export const STENCIL_INDEX: GLenum = 0x1901
export const STENCIL_INDEX8: GLenum = 0x8d48
export const DEPTH_STENCIL: GLenum = 0x84f9

export const RENDERBUFFER_WIDTH: GLenum = 0x8d42
export const RENDERBUFFER_HEIGHT: GLenum = 0x8d43
export const RENDERBUFFER_INTERNAL_FORMAT: GLenum = 0x8d44
export const RENDERBUFFER_RED_SIZE: GLenum = 0x8d50
export const RENDERBUFFER_GREEN_SIZE: GLenum = 0x8d51
export const RENDERBUFFER_BLUE_SIZE: GLenum = 0x8d52
export const RENDERBUFFER_ALPHA_SIZE: GLenum = 0x8d53
export const RENDERBUFFER_DEPTH_SIZE: GLenum = 0x8d54
export const RENDERBUFFER_STENCIL_SIZE: GLenum = 0x8d55

export const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: GLenum = 0x8cd0
export const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: GLenum = 0x8cd1
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: GLenum = 0x8cd2
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: GLenum = 0x8cd3

export const COLOR_ATTACHMENT0: GLenum = 0x8ce0
export const DEPTH_ATTACHMENT: GLenum = 0x8d00
export const STENCIL_ATTACHMENT: GLenum = 0x8d20
export const DEPTH_STENCIL_ATTACHMENT: GLenum = 0x821a

export const NONE: GLenum = 0

export const FRAMEBUFFER_COMPLETE: GLenum = 0x8cd5
export const FRAMEBUFFER_INCOMPLETE_ATTACHMENT: GLenum = 0x8cd6
export const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: GLenum = 0x8cd7
export const FRAMEBUFFER_INCOMPLETE_DIMENSIONS: GLenum = 0x8cd9
export const FRAMEBUFFER_UNSUPPORTED: GLenum = 0x8cdd

export const FRAMEBUFFER_BINDING: GLenum = 0x8ca6
export const RENDERBUFFER_BINDING: GLenum = 0x8ca7
export const MAX_RENDERBUFFER_SIZE: GLenum = 0x84e8

export const INVALID_FRAMEBUFFER_OPERATION: GLenum = 0x0506

/* WebGL-specific enums */
export const UNPACK_FLIP_Y_WEBGL: GLenum = 0x9240
export const UNPACK_PREMULTIPLY_ALPHA_WEBGL: GLenum = 0x9241
export const CONTEXT_LOST_WEBGL: GLenum = 0x9242
export const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243
export const BROWSER_DEFAULT_WEBGL: GLenum = 0x9244

export declare function getDrawingBufferWidth(gl: WebGLRenderingContext): GLsizei
export declare function getDrawingBufferHeight(gl: WebGLRenderingContext): GLsizei

export declare function getContextAttributes(gl: usize): WebGLContextAttributes
export declare function isContextLost(gl: usize): bool

export declare function getSupportedExtensions(gl: usize): string[]

export class WebGLExtension extends Object {}

export class ANGLE_instanced_arrays extends WebGLExtension {
	// TODO
}

export class EXT_blend_minmax extends WebGLExtension {
	// TODO
}

export class WebGLProgram extends Object {}

let id = 1

export class WebGLShader extends Object {}

export class WebGLBuffer extends Object {
	// TODO
}
export class WebGLFramebuffer extends Object {
	// TODO
}
export class WebGLRenderbuffer extends Object {
	// TODO
}
export class WebGLTexture extends Object {
	// TODO
}

export declare function activeTexture(gl: WebGLRenderingContext, texture: GLenum): void
// export declare function bindAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, index: GLuint, name: string): void;
export declare function bindFramebuffer(gl: WebGLRenderingContext, target: GLenum, framebuffer: WebGLFramebuffer): void
export declare function bindRenderbuffer(
	gl: WebGLRenderingContext,
	target: GLenum,
	renderbuffer: WebGLRenderbuffer,
): void
export declare function bindTexture(gl: WebGLRenderingContext, target: GLenum, texture: WebGLTexture): void
export declare function blendColor(
	gl: WebGLRenderingContext,
	red: GLclampf,
	green: GLclampf,
	blue: GLclampf,
	alpha: GLclampf,
): void
export declare function blendEquation(gl: WebGLRenderingContext, mode: GLenum): void
export declare function blendEquationSeparate(gl: WebGLRenderingContext, modeRGB: GLenum, modeAlpha: GLenum): void
export declare function blendFunc(gl: WebGLRenderingContext, sfactor: GLenum, dfactor: GLenum): void
export declare function blendFuncSeparate(
	gl: WebGLRenderingContext,
	srcRGB: GLenum,
	dstRGB: GLenum,
	srcAlpha: GLenum,
	dstAlpha: GLenum,
): void
export declare function bufferSubData<T>(
	gl: WebGLRenderingContext,
	target: GLenum,
	offset: GLintptr,
	data: Array<T>,
): void

export declare function checkFramebufferStatus(gl: WebGLRenderingContext, target: GLenum): GLenum

export declare function clearStencil(gl: WebGLRenderingContext, s: GLint): void

export declare function colorMask(
	gl: WebGLRenderingContext,
	red: GLboolean,
	green: GLboolean,
	blue: GLboolean,
	alpha: GLboolean,
): void

export declare function compressedTexImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
	border: GLint,
	data: ArrayBufferView,
): void
export declare function compressedTexSubImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	width: GLsizei,
	height: GLsizei,
	format: GLenum,
	data: ArrayBufferView,
): void

export declare function copyTexImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	internalformat: GLenum,
	x: GLint,
	y: GLint,
	width: GLsizei,
	height: GLsizei,
	border: GLint,
): void
export declare function copyTexSubImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	x: GLint,
	y: GLint,
	width: GLsizei,
	height: GLsizei,
): void

export declare function createFramebuffer(gl: WebGLRenderingContext): WebGLFramebuffer
export declare function createRenderbuffer(gl: WebGLRenderingContext): WebGLRenderbuffer
export declare function createTexture(gl: WebGLRenderingContext): WebGLTexture

export declare function cullFace(gl: WebGLRenderingContext, mode: GLenum): void
//...

export declare function deleteBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): void
export declare function deleteFramebuffer(gl: WebGLRenderingContext, framebuffer: WebGLFramebuffer): void
export declare function deleteProgram(gl: WebGLRenderingContext, program: WebGLProgram): void
export declare function deleteRenderbuffer(gl: WebGLRenderingContext, renderbuffer: WebGLRenderbuffer): void
export declare function deleteShader(gl: WebGLRenderingContext, shader: WebGLShader): void
export declare function deleteTexture(gl: WebGLRenderingContext, texture: WebGLTexture): void

export declare function depthMask(gl: WebGLRenderingContext, flag: GLboolean): void
export declare function depthRange(gl: WebGLRenderingContext, zNear: GLclampf, zFar: GLclampf): void
export declare function detachShader(gl: WebGLRenderingContext, program: WebGLProgram, shader: WebGLShader): void
export declare function disable(gl: WebGLRenderingContext, cap: GLenum): void
export declare function disableVertexAttribArray(gl: WebGLRenderingContext, index: GLuint): void
export declare function drawElements(
	gl: WebGLRenderingContext,
	mode: GLenum,
	count: GLsizei,
	typ: GLenum,
	offset: GLintptr,
): void

export declare function finish(gl: WebGLRenderingContext): void
export declare function flush(gl: WebGLRenderingContext): void
export declare function framebufferRenderbuffer(
	gl: WebGLRenderingContext,
	target: GLenum,
	attachment: GLenum,
	renderbuffertarget: GLenum,
	renderbuffer: WebGLRenderbuffer,
): void
export declare function framebufferTexture2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	attachment: GLenum,
	textarget: GLenum,
	texture: WebGLTexture,
	level: GLint,
): void
export declare function frontFace(gl: WebGLRenderingContext, mode: GLenum): void

export declare function generateMipmap(gl: WebGLRenderingContext, target: GLenum): void

// export declare function getActiveAttrib(
// 	gl: WebGLRenderingContext,
// 	program: WebGLProgram,
// 	index: GLuint,
// ): WebGLActiveInfo
// export declare function getActiveUniform(
// 	gl: WebGLRenderingContext,
// 	program: WebGLProgram,
// 	index: GLuint,
// ): WebGLActiveInfo
// export declare function getAttachedShaders(gl: WebGLRenderingContext, program: WebGLProgram): WebGLShader[]

export declare function getBufferParameter(gl: WebGLRenderingContext, target: GLenum, pname: GLenum): externref // any
export declare function getParameter(gl: WebGLRenderingContext, pname: GLenum): externref // any

export declare function getError(gl: WebGLRenderingContext): GLenum

export declare function getFramebufferAttachmentParameter(
	gl: WebGLRenderingContext,
	target: GLenum,
	attachment: GLenum,
	pname: GLenum,
): externref // any
export declare function getProgramParameter(gl: WebGLRenderingContext, program: WebGLProgram, pname: GLenum): bool // any
export declare function getProgramInfoLog(gl: WebGLRenderingContext, program: WebGLProgram): DOMString
export declare function getRenderbufferParameter(gl: WebGLRenderingContext, target: GLenum, pname: GLenum): externref // any
export declare function getShaderParameter(gl: WebGLRenderingContext, shader: WebGLShader, pname: GLenum): bool // any
// export declare function getShaderPrecisionFormat(
// 	gl: WebGLRenderingContext,
// 	shadertype: GLenum,
// 	precisiontype: GLenum,
// ): WebGLShaderPrecisionFormat
export declare function getShaderInfoLog(gl: WebGLRenderingContext, shader: WebGLShader): DOMString

export declare function getShaderSource(gl: WebGLRenderingContext, shader: WebGLShader): DOMString

export declare function getTexParameter(gl: WebGLRenderingContext, target: GLenum, pname: GLenum): externref // any

export declare function getUniform(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	location: WebGLUniformLocation,
): externref // any

export declare function getVertexAttrib(gl: WebGLRenderingContext, index: GLuint, pname: GLenum): externref // any

export declare function getVertexAttribOffset(gl: WebGLRenderingContext, index: GLuint, pname: GLenum): GLsizeiptr

export declare function hint(gl: WebGLRenderingContext, target: GLenum, mode: GLenum): void
export declare function isBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): GLboolean
export declare function isEnabled(gl: WebGLRenderingContext, cap: GLenum): GLboolean
export declare function isFramebuffer(gl: WebGLRenderingContext, framebuffer: WebGLFramebuffer): GLboolean
export declare function isProgram(gl: WebGLRenderingContext, program: WebGLProgram): GLboolean
export declare function isRenderbuffer(gl: WebGLRenderingContext, renderbuffer: WebGLRenderbuffer): GLboolean
export declare function isShader(gl: WebGLRenderingContext, shader: WebGLShader): GLboolean
export declare function isTexture(gl: WebGLRenderingContext, texture: WebGLTexture): GLboolean
export declare function lineWidth(gl: WebGLRenderingContext, width: GLfloat): void
export declare function pixelStorei(gl: WebGLRenderingContext, pname: GLenum, param: GLint): void
export declare function polygonOffset(gl: WebGLRenderingContext, factor: GLfloat, units: GLfloat): void

export declare function readPixels(
	gl: WebGLRenderingContext,
	x: GLint,
	y: GLint,
	width: GLsizei,
	height: GLsizei,
	format: GLenum,
	typ: GLenum,
	pixels: ArrayBufferView,
): void

export declare function renderbufferStorage(
	gl: WebGLRenderingContext,
	target: GLenum,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
): void
export declare function sampleCoverage(gl: WebGLRenderingContext, value: GLclampf, invert: GLboolean): void
export declare function scissor(gl: WebGLRenderingContext, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

// export declare function shaderSource(gl: WebGLRenderingContext, shader: WebGLShader, source: string): void

export declare function stencilFunc(gl: WebGLRenderingContext, func: GLenum, ref: GLint, mask: GLuint): void
export declare function stencilFuncSeparate(
	gl: WebGLRenderingContext,
	face: GLenum,
	func: GLenum,
	ref: GLint,
	mask: GLuint,
): void
export declare function stencilMask(gl: WebGLRenderingContext, mask: GLuint): void
export declare function stencilMaskSeparate(gl: WebGLRenderingContext, face: GLenum, mask: GLuint): void
export declare function stencilOp(gl: WebGLRenderingContext, fail: GLenum, zfail: GLenum, zpass: GLenum): void
export declare function stencilOpSeparate(
	gl: WebGLRenderingContext,
	face: GLenum,
	fail: GLenum,
	zfail: GLenum,
	zpass: GLenum,
): void

export declare function texImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	internalformat: GLenum,
	format: GLenum,
	typ: GLenum,
	image: ImageData,
): void

export declare function texParameterf(gl: WebGLRenderingContext, target: GLenum, pname: GLenum, param: GLfloat): void
export declare function texParameteri(gl: WebGLRenderingContext, target: GLenum, pname: GLenum, param: GLint): void

export declare function texSubImage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	format: GLenum,
	typ: GLenum,
	pixels: ImageData,
): void

export declare function uniform1f(gl: WebGLRenderingContext, location: WebGLUniformLocation, x: GLfloat): void
export declare function uniform1fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLfloat> /*Float32Array*/,
): void

export declare function uniform1i(gl: WebGLRenderingContext, location: WebGLUniformLocation, x: GLint): void
export declare function uniform1iv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLint> /*Int32Array*/,
): void

export declare function uniform2f(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	x: GLfloat,
	y: GLfloat,
): void
export declare function uniform2fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLfloat> /*Float32Array*/,
): void

export declare function uniform2i(gl: WebGLRenderingContext, location: WebGLUniformLocation, x: GLint, y: GLint): void
export declare function uniform2iv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLint> /*Int32Array*/,
): void

export declare function uniform3f(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	x: GLfloat,
	y: GLfloat,
	z: GLfloat,
): void
export declare function uniform3fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLfloat> /*Float32Array*/,
): void

export declare function uniform3i(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	x: GLint,
	y: GLint,
	z: GLint,
): void
export declare function uniform3iv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLint> /*Int32Array*/,
): void

export declare function uniform4f(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	x: GLfloat,
	y: GLfloat,
	z: GLfloat,
	w: GLfloat,
): void
export declare function uniform4fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLfloat> /*JSFloat32Array*/,
): void

export declare function uniform4i(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	x: GLint,
	y: GLint,
	z: GLint,
	w: GLint,
): void
export declare function uniform4iv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v: StaticArray<GLint> /*JSInt32Array*/,
): void

export declare function uniformMatrix2fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	value: StaticArray<GLfloat>,
): void
/*
export declare function uniformMatrix2fv( gl: WebGLRenderingContext, location: WebGLUniformLocation, transpose: GLboolean,
	value: sequence<GLfloat>): void;
*/
export declare function uniformMatrix3fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	value: StaticArray<GLfloat>,
): void
/*
export declare function uniformMatrix3fv( gl: WebGLRenderingContext, location: WebGLUniformLocation, transpose: GLboolean,
	value: sequence<GLfloat>): void;
*/
export declare function validateProgram(gl: WebGLRenderingContext, program: WebGLProgram): void

export declare function vertexAttrib1f(gl: WebGLRenderingContext, indx: GLuint, x: GLfloat): void
export declare function vertexAttrib1fv(gl: WebGLRenderingContext, indx: GLuint, values: StaticArray<GLfloat>): void

export declare function vertexAttrib2f(gl: WebGLRenderingContext, indx: GLuint, x: GLfloat, y: GLfloat): void
export declare function vertexAttrib2fv(gl: WebGLRenderingContext, indx: GLuint, values: StaticArray<GLfloat>): void

export declare function vertexAttrib3f(
	gl: WebGLRenderingContext,
	indx: GLuint,
	x: GLfloat,
	y: GLfloat,
	z: GLfloat,
): void
export declare function vertexAttrib3fv(gl: WebGLRenderingContext, indx: GLuint, values: StaticArray<GLfloat>): void

export declare function vertexAttrib4f(
	gl: WebGLRenderingContext,
	indx: GLuint,
	x: GLfloat,
	y: GLfloat,
	z: GLfloat,
	w: GLfloat,
): void
export declare function vertexAttrib4fv(gl: WebGLRenderingContext, indx: GLuint, values: StaticArray<GLfloat>): void

export declare function viewport(gl: WebGLRenderingContext, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void

// ... WEBGL 2 ...
/* Buffer objects */
export declare function copyBufferSubData(
	gl: WebGLRenderingContext,
	readTarget: GLenum,
	writeTarget: GLenum,
	readOffset: GLintptr,
	writeOffset: GLintptr,
	size: GLsizeiptr,
): void

// @ts-ignore
export declare function getBufferSubData(
	gl: WebGLRenderingContext,
	target: GLenum,
	srcByteOffset: GLintptr,
	/*[AllowShared]*/ dstBuffer: ArrayBufferView,
	dstOffset: GLuint = 0,
	length: GLuint = 0,
): void

/* Framebuffer objects */
export declare function blitFramebuffer(
	gl: WebGLRenderingContext,
	srcX0: GLint,
	srcY0: GLint,
	srcX1: GLint,
	srcY1: GLint,
	dstX0: GLint,
	dstY0: GLint,
	dstX1: GLint,
	dstY1: GLint,
	mask: GLbitfield,
	filter: GLenum,
): void
export declare function framebufferTextureLayer(
	gl: WebGLRenderingContext,
	target: GLenum,
	attachment: GLenum,
	texture: WebGLTexture,
	level: GLint,
	layer: GLint,
): void
export declare function invalidateFramebuffer(gl: WebGLRenderingContext, target: GLenum, attachments: GLenum[]): void
export declare function invalidateSubFramebuffer(
	gl: WebGLRenderingContext,
	target: GLenum,
	attachments: GLenum[],
	x: GLint,
	y: GLint,
	width: GLsizei,
	height: GLsizei,
): void
export declare function readBuffer(gl: WebGLRenderingContext, src: GLenum): void

/* Renderbuffer objects */
export declare function getInternalformatParameter(
	gl: WebGLRenderingContext,
	target: GLenum,
	internalformat: GLenum,
	pname: GLenum,
): externref // any
export declare function renderbufferStorageMultisample(
	gl: WebGLRenderingContext,
	target: GLenum,
	samples: GLsizei,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
): void

/* Texture objects */
export declare function texStorage2D(
	gl: WebGLRenderingContext,
	target: GLenum,
	levels: GLsizei,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
): void
export declare function texStorage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	levels: GLsizei,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
	depth: GLsizei,
): void

export declare function texImage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	internalformat: GLint,
	width: GLsizei,
	height: GLsizei,
	depth: GLsizei,
	border: GLint,
	format: GLenum,
	typ: GLenum,
	pboOffset: GLintptr,
): void

export declare function texSubImage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	zoffset: GLint,
	width: GLsizei,
	height: GLsizei,
	depth: GLsizei,
	format: GLenum,
	typ: GLenum,
	pboOffset: GLintptr,
): void

export declare function copyTexSubImage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	zoffset: GLint,
	x: GLint,
	y: GLint,
	width: GLsizei,
	height: GLsizei,
): void

export declare function compressedTexImage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	internalformat: GLenum,
	width: GLsizei,
	height: GLsizei,
	depth: GLsizei,
	border: GLint,
	imageSize: GLsizei,
	offset: GLintptr,
): void

export declare function compressedTexSubImage3D(
	gl: WebGLRenderingContext,
	target: GLenum,
	level: GLint,
	xoffset: GLint,
	yoffset: GLint,
	zoffset: GLint,
	width: GLsizei,
	height: GLsizei,
	depth: GLsizei,
	format: GLenum,
	imageSize: GLsizei,
	offset: GLintptr,
): void

/* Programs and shaders */
export declare function getFragDataLocation(gl: WebGLRenderingContext, program: WebGLProgram, name: DOMString): GLint

/* Uniforms */
export declare function uniform1ui(gl: WebGLRenderingContext, location: WebGLUniformLocation, v0: GLuint): void
export declare function uniform2ui(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v0: GLuint,
	v1: GLuint,
): void
export declare function uniform3ui(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v0: GLuint,
	v1: GLuint,
	v2: GLuint,
): void
export declare function uniform4ui(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	v0: GLuint,
	v1: GLuint,
	v2: GLuint,
	v3: GLuint,
): void

// @ts-ignore
export declare function uniform1uiv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	data: Uint32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniform2uiv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	data: Uint32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniform3uiv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	data: Uint32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniform4uiv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	data: Uint32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniformMatrix3x2fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniformMatrix4x2fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void

// @ts-ignore
export declare function uniformMatrix2x3fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniformMatrix4x3fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void

// @ts-ignore
export declare function uniformMatrix2x4fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void
// @ts-ignore
export declare function uniformMatrix3x4fv(
	gl: WebGLRenderingContext,
	location: WebGLUniformLocation,
	transpose: GLboolean,
	data: Float32List,
	srcOffset: GLuint = 0,
	srcLength: GLuint = 0,
): void

/* Vertex attribs */
export declare function vertexAttribI4i(
	gl: WebGLRenderingContext,
	index: GLuint,
	x: GLint,
	y: GLint,
	z: GLint,
	w: GLint,
): void
export declare function vertexAttribI4iv(gl: WebGLRenderingContext, index: GLuint, values: Int32List): void
export declare function vertexAttribI4ui(
	gl: WebGLRenderingContext,
	index: GLuint,
	x: GLuint,
	y: GLuint,
	z: GLuint,
	w: GLuint,
): void
export declare function vertexAttribI4uiv(gl: WebGLRenderingContext, index: GLuint, values: Uint32List): void
export declare function vertexAttribIPointer(
	gl: WebGLRenderingContext,
	index: GLuint,
	size: GLint,
	typ: GLenum,
	stride: GLsizei,
	offset: GLintptr,
): void

/* Writing to the drawing buffer */
export declare function vertexAttribDivisor(gl: WebGLRenderingContext, index: GLuint, divisor: GLuint): void
export declare function drawArraysInstanced(
	gl: WebGLRenderingContext,
	mode: GLenum,
	first: GLint,
	count: GLsizei,
	instanceCount: GLsizei,
): void
export declare function drawElementsInstanced(
	gl: WebGLRenderingContext,
	mode: GLenum,
	count: GLsizei,
	typ: GLenum,
	offset: GLintptr,
	instanceCount: GLsizei,
): void
export declare function drawRangeElements(
	gl: WebGLRenderingContext,
	mode: GLenum,
	start: GLuint,
	end: GLuint,
	count: GLsizei,
	typ: GLenum,
	offset: GLintptr,
): void

/* Multiple Render Targets */
export declare function drawBuffers(gl: WebGLRenderingContext, buffers: GLenum[]): void

// @ts-ignore
export declare function clearBufferfv(
	gl: WebGLRenderingContext,
	buffer: GLenum,
	drawbuffer: GLint,
	values: Float32List,
	srcOffset: GLuint = 0,
): void
// @ts-ignore
export declare function clearBufferiv(
	gl: WebGLRenderingContext,
	buffer: GLenum,
	drawbuffer: GLint,
	values: Int32List,
	srcOffset: GLuint = 0,
): void
// @ts-ignore
export declare function clearBufferuiv(
	gl: WebGLRenderingContext,
	buffer: GLenum,
	drawbuffer: GLint,
	values: Uint32List,
	srcOffset: GLuint = 0,
): void

export declare function clearBufferfi(
	gl: WebGLRenderingContext,
	buffer: GLenum,
	drawbuffer: GLint,
	depth: GLfloat,
	stencil: GLint,
): void

/* Query Objects */
export declare function createQuery(gl: WebGLRenderingContext): WebGLQuery
export declare function deleteQuery(gl: WebGLRenderingContext, query: WebGLQuery): void
/*[WebGLHandlesContextLoss]*/
export declare function isQuery(gl: WebGLRenderingContext, query: WebGLQuery): GLboolean
export declare function beginQuery(gl: WebGLRenderingContext, target: GLenum, query: WebGLQuery): void
export declare function endQuery(gl: WebGLRenderingContext, target: GLenum): void
export declare function getQuery(gl: WebGLRenderingContext, target: GLenum, pname: GLenum): WebGLQuery
export declare function getQueryParameter(gl: WebGLRenderingContext, query: WebGLQuery, pname: GLenum): externref // any

/* Sampler Objects */
export declare function createSampler(gl: WebGLRenderingContext): WebGLSampler
export declare function deleteSampler(gl: WebGLRenderingContext, sampler: WebGLSampler): void
/*[WebGLHandlesContextLoss]*/
export declare function isSampler(gl: WebGLRenderingContext, sampler: WebGLSampler): GLboolean
export declare function bindSampler(gl: WebGLRenderingContext, unit: GLuint, sampler: WebGLSampler): void
export declare function samplerParameteri(
	gl: WebGLRenderingContext,
	sampler: WebGLSampler,
	pname: GLenum,
	param: GLint,
): void
export declare function samplerParameterf(
	gl: WebGLRenderingContext,
	sampler: WebGLSampler,
	pname: GLenum,
	param: GLfloat,
): void
export declare function getSamplerParameter(gl: WebGLRenderingContext, sampler: WebGLSampler, pname: GLenum): externref // any

/* Sync objects */
export declare function fenceSync(gl: WebGLRenderingContext, condition: GLenum, flags: GLbitfield): WebGLSync
/*[WebGLHandlesContextLoss]*/
export declare function isSync(gl: WebGLRenderingContext, sync: WebGLSync): GLboolean
export declare function deleteSync(gl: WebGLRenderingContext, sync: WebGLSync): void
export declare function clientWaitSync(
	gl: WebGLRenderingContext,
	sync: WebGLSync,
	flags: GLbitfield,
	timeout: GLuint64,
): GLenum
export declare function waitSync(gl: WebGLRenderingContext, sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void
export declare function getSyncParameter(gl: WebGLRenderingContext, sync: WebGLSync, pname: GLenum): externref // any

/* Transform Feedback */
export declare function createTransformFeedback(gl: WebGLRenderingContext): WebGLTransformFeedback
export declare function deleteTransformFeedback(gl: WebGLRenderingContext, tf: WebGLTransformFeedback): void
/*[WebGLHandlesContextLoss]*/
export declare function isTransformFeedback(gl: WebGLRenderingContext, tf: WebGLTransformFeedback): GLboolean
export declare function bindTransformFeedback(
	gl: WebGLRenderingContext,
	target: GLenum,
	tf: WebGLTransformFeedback,
): void
export declare function beginTransformFeedback(gl: WebGLRenderingContext, primitiveMode: GLenum): void
export declare function endTransformFeedback(gl: WebGLRenderingContext): void
export declare function transformFeedbackVaryings(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	varyings: DOMString[],
	bufferMode: GLenum,
): void
// export declare function getTransformFeedbackVarying(
// 	gl: WebGLRenderingContext,
// 	program: WebGLProgram,
// 	index: GLuint,
// ): WebGLActiveInfo
export declare function pauseTransformFeedback(gl: WebGLRenderingContext): void
export declare function resumeTransformFeedback(gl: WebGLRenderingContext): void

/* Uniform Buffer Objects and Transform Feedback Buffers */
export declare function bindBufferBase(
	gl: WebGLRenderingContext,
	target: GLenum,
	index: GLuint,
	buffer: WebGLBuffer,
): void
export declare function bindBufferRange(
	gl: WebGLRenderingContext,
	target: GLenum,
	index: GLuint,
	buffer: WebGLBuffer,
	offset: GLintptr,
	size: GLsizeiptr,
): void
export declare function getIndexedParameter(gl: WebGLRenderingContext, target: GLenum, index: GLuint): externref // any
export declare function getUniformIndices(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformNames: DOMString[],
): GLuint[]
export declare function getActiveUniforms(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformIndices: GLuint[],
	pname: GLenum,
): externref // any
export declare function getUniformBlockIndex(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformBlockName: DOMString,
): GLuint
export declare function getActiveUniformBlockParameter(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformBlockIndex: GLuint,
	pname: GLenum,
): externref // any
export declare function getActiveUniformBlockName(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformBlockIndex: GLuint,
): DOMString
export declare function uniformBlockBinding(
	gl: WebGLRenderingContext,
	program: WebGLProgram,
	uniformBlockIndex: GLuint,
	uniformBlockBinding: GLuint,
): void

/* Vertex Array Objects */
export declare function createVertexArray(gl: WebGLRenderingContext): WebGLVertexArrayObject
export declare function deleteVertexArray(gl: WebGLRenderingContext, vertexArray: WebGLVertexArrayObject): void
/*[WebGLHandlesContextLoss]*/
export declare function isVertexArray(gl: WebGLRenderingContext, vertexArray: WebGLVertexArrayObject): GLboolean
export declare function bindVertexArray(gl: WebGLRenderingContext, array: WebGLVertexArrayObject): void

// @final
// @unmanaged
export class WebGLRenderingContext extends Object {
	// @inline
	constructor(public canvas: HTMLCanvasElement) {
		super()
	}

	/*
	@inline get ptr(): usize {
		return changetype<usize>(this);
	}
	*/

	@inline get DEPTH_BUFFER_BIT(): GLenum {
		return DEPTH_BUFFER_BIT
	}

	@inline get STENCIL_BUFFER_BIT(): GLenum {
		return STENCIL_BUFFER_BIT
	}

	@inline get COLOR_BUFFER_BIT(): GLenum {
		return COLOR_BUFFER_BIT
	}

	@inline get POINTS(): GLenum {
		return POINTS
	}

	@inline get LINES(): GLenum {
		return LINES
	}

	@inline get LINE_LOOP(): GLenum {
		return LINE_LOOP
	}

	@inline get LINE_STRIP(): GLenum {
		return LINE_STRIP
	}

	@inline get TRIANGLES(): GLenum {
		return TRIANGLES
	}

	@inline get TRIANGLE_STRIP(): GLenum {
		return TRIANGLE_STRIP
	}

	@inline get TRIANGLE_FAN(): GLenum {
		return TRIANGLE_FAN
	}

	@inline get ZERO(): GLenum {
		return ZERO
	}

	@inline get ONE(): GLenum {
		return ONE
	}

	@inline get SRC_COLOR(): GLenum {
		return SRC_COLOR
	}

	@inline get ONE_MINUS_SRC_COLOR(): GLenum {
		return ONE_MINUS_SRC_COLOR
	}

	@inline get SRC_ALPHA(): GLenum {
		return SRC_ALPHA
	}

	@inline get ONE_MINUS_SRC_ALPHA(): GLenum {
		return ONE_MINUS_SRC_ALPHA
	}

	@inline get DST_ALPHA(): GLenum {
		return DST_ALPHA
	}

	@inline get ONE_MINUS_DST_ALPHA(): GLenum {
		return ONE_MINUS_DST_ALPHA
	}

	@inline get DST_COLOR(): GLenum {
		return DST_COLOR
	}

	@inline get ONE_MINUS_DST_COLOR(): GLenum {
		return ONE_MINUS_DST_COLOR
	}

	@inline get SRC_ALPHA_SATURATE(): GLenum {
		return SRC_ALPHA_SATURATE
	}

	@inline get FUNC_ADD(): GLenum {
		return FUNC_ADD
	}

	@inline get BLEND_EQUATION(): GLenum {
		return BLEND_EQUATION
	}

	@inline get BLEND_EQUATION_RGB(): GLenum {
		return BLEND_EQUATION_RGB
	}

	@inline get BLEND_EQUATION_ALPHA(): GLenum {
		return BLEND_EQUATION_ALPHA
	}

	@inline get FUNC_SUBTRACT(): GLenum {
		return FUNC_SUBTRACT
	}

	@inline get FUNC_REVERSE_SUBTRACT(): GLenum {
		return FUNC_REVERSE_SUBTRACT
	}

	@inline get BLEND_DST_RGB(): GLenum {
		return BLEND_DST_RGB
	}

	@inline get BLEND_SRC_RGB(): GLenum {
		return BLEND_SRC_RGB
	}

	@inline get BLEND_DST_ALPHA(): GLenum {
		return BLEND_DST_ALPHA
	}

	@inline get BLEND_SRC_ALPHA(): GLenum {
		return BLEND_SRC_ALPHA
	}

	@inline get CONSTANT_COLOR(): GLenum {
		return CONSTANT_COLOR
	}

	@inline get ONE_MINUS_CONSTANT_COLOR(): GLenum {
		return ONE_MINUS_CONSTANT_COLOR
	}

	@inline get CONSTANT_ALPHA(): GLenum {
		return CONSTANT_ALPHA
	}

	@inline get ONE_MINUS_CONSTANT_ALPHA(): GLenum {
		return ONE_MINUS_CONSTANT_ALPHA
	}

	@inline get BLEND_COLOR(): GLenum {
		return BLEND_COLOR
	}

	@inline get ARRAY_BUFFER(): GLenum {
		return ARRAY_BUFFER
	}

	@inline get ELEMENT_ARRAY_BUFFER(): GLenum {
		return ELEMENT_ARRAY_BUFFER
	}

	@inline get ARRAY_BUFFER_BINDING(): GLenum {
		return ARRAY_BUFFER_BINDING
	}

	@inline get ELEMENT_ARRAY_BUFFER_BINDING(): GLenum {
		return ELEMENT_ARRAY_BUFFER_BINDING
	}

	@inline get STREAM_DRAW(): GLenum {
		return STREAM_DRAW
	}

	@inline get STATIC_DRAW(): GLenum {
		return STATIC_DRAW
	}

	@inline get DYNAMIC_DRAW(): GLenum {
		return DYNAMIC_DRAW
	}

	@inline get BUFFER_SIZE(): GLenum {
		return BUFFER_SIZE
	}

	@inline get BUFFER_USAGE(): GLenum {
		return BUFFER_USAGE
	}

	@inline get CURRENT_VERTEX_ATTRIB(): GLenum {
		return CURRENT_VERTEX_ATTRIB
	}

	@inline get FRONT(): GLenum {
		return FRONT
	}

	@inline get BACK(): GLenum {
		return BACK
	}

	@inline get FRONT_AND_BACK(): GLenum {
		return FRONT_AND_BACK
	}

	@inline get CULL_FACE(): GLenum {
		return CULL_FACE
	}

	@inline get BLEND(): GLenum {
		return BLEND
	}

	@inline get DITHER(): GLenum {
		return DITHER
	}

	@inline get STENCIL_TEST(): GLenum {
		return STENCIL_TEST
	}

	@inline get DEPTH_TEST(): GLenum {
		return DEPTH_TEST
	}

	@inline get SCISSOR_TEST(): GLenum {
		return SCISSOR_TEST
	}

	@inline get POLYGON_OFFSET_FILL(): GLenum {
		return POLYGON_OFFSET_FILL
	}

	@inline get SAMPLE_ALPHA_TO_COVERAGE(): GLenum {
		return SAMPLE_ALPHA_TO_COVERAGE
	}

	@inline get SAMPLE_COVERAGE(): GLenum {
		return SAMPLE_COVERAGE
	}

	@inline get NO_ERROR(): GLenum {
		return NO_ERROR
	}

	@inline get INVALID_ENUM(): GLenum {
		return INVALID_ENUM
	}

	@inline get INVALID_VALUE(): GLenum {
		return INVALID_VALUE
	}

	@inline get INVALID_OPERATION(): GLenum {
		return INVALID_OPERATION
	}

	@inline get OUT_OF_MEMORY(): GLenum {
		return OUT_OF_MEMORY
	}

	@inline get CW(): GLenum {
		return CW
	}

	@inline get CCW(): GLenum {
		return CCW
	}

	@inline get LINE_WIDTH(): GLenum {
		return LINE_WIDTH
	}

	@inline get ALIASED_POINT_SIZE_RANGE(): GLenum {
		return ALIASED_POINT_SIZE_RANGE
	}

	@inline get ALIASED_LINE_WIDTH_RANGE(): GLenum {
		return ALIASED_LINE_WIDTH_RANGE
	}

	@inline get CULL_FACE_MODE(): GLenum {
		return CULL_FACE_MODE
	}

	@inline get FRONT_FACE(): GLenum {
		return FRONT_FACE
	}

	@inline get DEPTH_RANGE(): GLenum {
		return DEPTH_RANGE
	}

	@inline get DEPTH_WRITEMASK(): GLenum {
		return DEPTH_WRITEMASK
	}

	@inline get DEPTH_CLEAR_VALUE(): GLenum {
		return DEPTH_CLEAR_VALUE
	}

	@inline get DEPTH_FUNC(): GLenum {
		return DEPTH_FUNC
	}

	@inline get STENCIL_CLEAR_VALUE(): GLenum {
		return STENCIL_CLEAR_VALUE
	}

	@inline get STENCIL_FUNC(): GLenum {
		return STENCIL_FUNC
	}

	@inline get STENCIL_FAIL(): GLenum {
		return STENCIL_FAIL
	}

	@inline get STENCIL_PASS_DEPTH_FAIL(): GLenum {
		return STENCIL_PASS_DEPTH_FAIL
	}

	@inline get STENCIL_PASS_DEPTH_PASS(): GLenum {
		return STENCIL_PASS_DEPTH_PASS
	}

	@inline get STENCIL_REF(): GLenum {
		return STENCIL_REF
	}

	@inline get STENCIL_VALUE_MASK(): GLenum {
		return STENCIL_VALUE_MASK
	}

	@inline get STENCIL_WRITEMASK(): GLenum {
		return STENCIL_WRITEMASK
	}

	@inline get STENCIL_BACK_FUNC(): GLenum {
		return STENCIL_BACK_FUNC
	}

	@inline get STENCIL_BACK_FAIL(): GLenum {
		return STENCIL_BACK_FAIL
	}

	@inline get STENCIL_BACK_PASS_DEPTH_FAIL(): GLenum {
		return STENCIL_BACK_PASS_DEPTH_FAIL
	}

	@inline get STENCIL_BACK_PASS_DEPTH_PASS(): GLenum {
		return STENCIL_BACK_PASS_DEPTH_PASS
	}

	@inline get STENCIL_BACK_REF(): GLenum {
		return STENCIL_BACK_REF
	}

	@inline get STENCIL_BACK_VALUE_MASK(): GLenum {
		return STENCIL_BACK_VALUE_MASK
	}

	@inline get STENCIL_BACK_WRITEMASK(): GLenum {
		return STENCIL_BACK_WRITEMASK
	}

	@inline get VIEWPORT(): GLenum {
		return VIEWPORT
	}

	@inline get SCISSOR_BOX(): GLenum {
		return SCISSOR_BOX
	}

	@inline get COLOR_CLEAR_VALUE(): GLenum {
		return COLOR_CLEAR_VALUE
	}

	@inline get COLOR_WRITEMASK(): GLenum {
		return COLOR_WRITEMASK
	}

	@inline get UNPACK_ALIGNMENT(): GLenum {
		return UNPACK_ALIGNMENT
	}

	@inline get PACK_ALIGNMENT(): GLenum {
		return PACK_ALIGNMENT
	}

	@inline get MAX_TEXTURE_SIZE(): GLenum {
		return MAX_TEXTURE_SIZE
	}

	@inline get MAX_VIEWPORT_DIMS(): GLenum {
		return MAX_VIEWPORT_DIMS
	}

	@inline get SUBPIXEL_BITS(): GLenum {
		return SUBPIXEL_BITS
	}

	@inline get RED_BITS(): GLenum {
		return RED_BITS
	}

	@inline get GREEN_BITS(): GLenum {
		return GREEN_BITS
	}

	@inline get BLUE_BITS(): GLenum {
		return BLUE_BITS
	}

	@inline get ALPHA_BITS(): GLenum {
		return ALPHA_BITS
	}

	@inline get DEPTH_BITS(): GLenum {
		return DEPTH_BITS
	}

	@inline get STENCIL_BITS(): GLenum {
		return STENCIL_BITS
	}

	@inline get POLYGON_OFFSET_UNITS(): GLenum {
		return POLYGON_OFFSET_UNITS
	}

	@inline get POLYGON_OFFSET_FACTOR(): GLenum {
		return POLYGON_OFFSET_FACTOR
	}

	@inline get TEXTURE_BINDING_2D(): GLenum {
		return TEXTURE_BINDING_2D
	}

	@inline get SAMPLE_BUFFERS(): GLenum {
		return SAMPLE_BUFFERS
	}

	@inline get SAMPLES(): GLenum {
		return SAMPLES
	}

	@inline get SAMPLE_COVERAGE_VALUE(): GLenum {
		return SAMPLE_COVERAGE_VALUE
	}

	@inline get SAMPLE_COVERAGE_INVERT(): GLenum {
		return SAMPLE_COVERAGE_INVERT
	}

	@inline get COMPRESSED_TEXTURE_FORMATS(): GLenum {
		return COMPRESSED_TEXTURE_FORMATS
	}

	@inline get DONT_CARE(): GLenum {
		return DONT_CARE
	}

	@inline get FASTEST(): GLenum {
		return FASTEST
	}

	@inline get NICEST(): GLenum {
		return NICEST
	}

	@inline get GENERATE_MIPMAP_HINT(): GLenum {
		return GENERATE_MIPMAP_HINT
	}

	@inline get BYTE(): GLenum {
		return BYTE
	}

	@inline get UNSIGNED_BYTE(): GLenum {
		return UNSIGNED_BYTE
	}

	@inline get SHORT(): GLenum {
		return SHORT
	}

	@inline get UNSIGNED_SHORT(): GLenum {
		return UNSIGNED_SHORT
	}

	@inline get INT(): GLenum {
		return INT
	}

	@inline get UNSIGNED_INT(): GLenum {
		return UNSIGNED_INT
	}

	@inline get FLOAT(): GLenum {
		return FLOAT
	}

	@inline get DEPTH_COMPONENT(): GLenum {
		return DEPTH_COMPONENT
	}

	@inline get ALPHA(): GLenum {
		return ALPHA
	}

	@inline get RGB(): GLenum {
		return RGB
	}

	@inline get RGBA(): GLenum {
		return RGBA
	}

	@inline get LUMINANCE(): GLenum {
		return LUMINANCE
	}

	@inline get LUMINANCE_ALPHA(): GLenum {
		return LUMINANCE_ALPHA
	}

	@inline get UNSIGNED_SHORT_4_4_4_4(): GLenum {
		return UNSIGNED_SHORT_4_4_4_4
	}

	@inline get UNSIGNED_SHORT_5_5_5_1(): GLenum {
		return UNSIGNED_SHORT_5_5_5_1
	}

	@inline get UNSIGNED_SHORT_5_6_5(): GLenum {
		return UNSIGNED_SHORT_5_6_5
	}

	@inline get FRAGMENT_SHADER(): GLenum {
		return FRAGMENT_SHADER
	}

	@inline get VERTEX_SHADER(): GLenum {
		return VERTEX_SHADER
	}

	@inline get MAX_VERTEX_ATTRIBS(): GLenum {
		return MAX_VERTEX_ATTRIBS
	}

	@inline get MAX_VERTEX_UNIFORM_VECTORS(): GLenum {
		return MAX_VERTEX_UNIFORM_VECTORS
	}

	@inline get MAX_VARYING_VECTORS(): GLenum {
		return MAX_VARYING_VECTORS
	}

	@inline get MAX_COMBINED_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_COMBINED_TEXTURE_IMAGE_UNITS
	}

	@inline get MAX_VERTEX_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_VERTEX_TEXTURE_IMAGE_UNITS
	}

	@inline get MAX_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_TEXTURE_IMAGE_UNITS
	}

	@inline get MAX_FRAGMENT_UNIFORM_VECTORS(): GLenum {
		return MAX_FRAGMENT_UNIFORM_VECTORS
	}

	@inline get SHADER_TYPE(): GLenum {
		return SHADER_TYPE
	}

	@inline get DELETE_STATUS(): GLenum {
		return DELETE_STATUS
	}

	@inline get LINK_STATUS(): GLenum {
		return LINK_STATUS
	}

	@inline get VALIDATE_STATUS(): GLenum {
		return VALIDATE_STATUS
	}

	@inline get ATTACHED_SHADERS(): GLenum {
		return ATTACHED_SHADERS
	}

	@inline get ACTIVE_UNIFORMS(): GLenum {
		return ACTIVE_UNIFORMS
	}

	@inline get ACTIVE_ATTRIBUTES(): GLenum {
		return ACTIVE_ATTRIBUTES
	}

	@inline get SHADING_LANGUAGE_VERSION(): GLenum {
		return SHADING_LANGUAGE_VERSION
	}

	@inline get CURRENT_PROGRAM(): GLenum {
		return CURRENT_PROGRAM
	}

	@inline get NEVER(): GLenum {
		return NEVER
	}

	@inline get LESS(): GLenum {
		return LESS
	}

	@inline get EQUAL(): GLenum {
		return EQUAL
	}

	@inline get LEQUAL(): GLenum {
		return LEQUAL
	}

	@inline get GREATER(): GLenum {
		return GREATER
	}

	@inline get NOTEQUAL(): GLenum {
		return NOTEQUAL
	}

	@inline get GEQUAL(): GLenum {
		return GEQUAL
	}

	@inline get ALWAYS(): GLenum {
		return ALWAYS
	}

	@inline get KEEP(): GLenum {
		return KEEP
	}

	@inline get REPLACE(): GLenum {
		return REPLACE
	}

	@inline get INCR(): GLenum {
		return INCR
	}

	@inline get DECR(): GLenum {
		return DECR
	}

	@inline get INVERT(): GLenum {
		return INVERT
	}

	@inline get INCR_WRAP(): GLenum {
		return INCR_WRAP
	}

	@inline get DECR_WRAP(): GLenum {
		return DECR_WRAP
	}

	@inline get VENDOR(): GLenum {
		return VENDOR
	}

	@inline get RENDERER(): GLenum {
		return RENDERER
	}

	@inline get VERSION(): GLenum {
		return VERSION
	}

	@inline get NEAREST(): GLenum {
		return NEAREST
	}

	@inline get LINEAR(): GLenum {
		return LINEAR
	}

	@inline get NEAREST_MIPMAP_NEAREST(): GLenum {
		return NEAREST_MIPMAP_NEAREST
	}

	@inline get LINEAR_MIPMAP_NEAREST(): GLenum {
		return LINEAR_MIPMAP_NEAREST
	}

	@inline get NEAREST_MIPMAP_LINEAR(): GLenum {
		return NEAREST_MIPMAP_LINEAR
	}

	@inline get LINEAR_MIPMAP_LINEAR(): GLenum {
		return LINEAR_MIPMAP_LINEAR
	}

	@inline get TEXTURE_MAG_FILTER(): GLenum {
		return TEXTURE_MAG_FILTER
	}

	@inline get TEXTURE_MIN_FILTER(): GLenum {
		return TEXTURE_MIN_FILTER
	}

	@inline get TEXTURE_WRAP_S(): GLenum {
		return LINEAR
	}

	@inline get TEXTURE_WRAP_T(): GLenum {
		return TEXTURE_WRAP_T
	}

	@inline get TEXTURE_2D(): GLenum {
		return TEXTURE_2D
	}

	@inline get TEXTURE(): GLenum {
		return TEXTURE
	}

	@inline get TEXTURE_CUBE_MAP(): GLenum {
		return TEXTURE_CUBE_MAP
	}

	@inline get TEXTURE_BINDING_CUBE_MAP(): GLenum {
		return TEXTURE_BINDING_CUBE_MAP
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_X(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_X
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_X(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_X
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_Y(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_Y
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_Y(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_Y
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_Z(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_Z
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_Z(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_Z
	}

	@inline get MAX_CUBE_MAP_TEXTURE_SIZE(): GLenum {
		return MAX_CUBE_MAP_TEXTURE_SIZE
	}

	@inline get TEXTURE0(): GLenum {
		return TEXTURE0
	}
	@inline get TEXTURE1(): GLenum {
		return TEXTURE1
	}
	@inline get TEXTURE2(): GLenum {
		return TEXTURE2
	}
	@inline get TEXTURE3(): GLenum {
		return TEXTURE3
	}
	@inline get TEXTURE4(): GLenum {
		return TEXTURE4
	}
	@inline get TEXTURE5(): GLenum {
		return TEXTURE5
	}
	@inline get TEXTURE6(): GLenum {
		return TEXTURE6
	}
	@inline get TEXTURE7(): GLenum {
		return TEXTURE7
	}
	@inline get TEXTURE8(): GLenum {
		return TEXTURE8
	}
	@inline get TEXTURE9(): GLenum {
		return TEXTURE9
	}
	//---

	@inline get TEXTURE10(): GLenum {
		return TEXTURE10
	}
	@inline get TEXTURE11(): GLenum {
		return TEXTURE11
	}
	@inline get TEXTURE12(): GLenum {
		return TEXTURE12
	}
	@inline get TEXTURE13(): GLenum {
		return TEXTURE13
	}
	@inline get TEXTURE14(): GLenum {
		return TEXTURE14
	}
	@inline get TEXTURE15(): GLenum {
		return TEXTURE15
	}
	@inline get TEXTURE16(): GLenum {
		return TEXTURE16
	}
	@inline get TEXTURE17(): GLenum {
		return TEXTURE17
	}
	@inline get TEXTURE18(): GLenum {
		return TEXTURE18
	}
	@inline get TEXTURE19(): GLenum {
		return TEXTURE19
	}
	// --
	@inline get TEXTURE20(): GLenum {
		return TEXTURE20
	}
	@inline get TEXTURE21(): GLenum {
		return TEXTURE21
	}
	@inline get TEXTURE22(): GLenum {
		return TEXTURE22
	}
	@inline get TEXTURE23(): GLenum {
		return TEXTURE23
	}
	@inline get TEXTURE24(): GLenum {
		return TEXTURE24
	}
	@inline get TEXTURE25(): GLenum {
		return TEXTURE25
	}
	@inline get TEXTURE26(): GLenum {
		return TEXTURE26
	}
	@inline get TEXTURE27(): GLenum {
		return TEXTURE27
	}
	@inline get TEXTURE28(): GLenum {
		return TEXTURE28
	}
	@inline get TEXTURE29(): GLenum {
		return TEXTURE29
	}

	@inline get TEXTURE30(): GLenum {
		return TEXTURE30
	}
	@inline get TEXTURE31(): GLenum {
		return TEXTURE31
	}

	@inline get ACTIVE_TEXTURE(): GLenum {
		return ACTIVE_TEXTURE
	}

	@inline get REPEAT(): GLenum {
		return REPEAT
	}

	@inline get CLAMP_TO_EDGE(): GLenum {
		return CLAMP_TO_EDGE
	}

	@inline get MIRRORED_REPEAT(): GLenum {
		return MIRRORED_REPEAT
	}

	@inline get FLOAT_VEC2(): GLenum {
		return FLOAT_VEC2
	}

	@inline get FLOAT_VEC3(): GLenum {
		return FLOAT_VEC3
	}

	@inline get FLOAT_VEC4(): GLenum {
		return FLOAT_VEC4
	}

	@inline get INT_VEC2(): GLenum {
		return INT_VEC2
	}

	@inline get INT_VEC3(): GLenum {
		return INT_VEC3
	}

	@inline get INT_VEC4(): GLenum {
		return INT_VEC4
	}

	@inline get BOOL(): GLenum {
		return BOOL
	}

	@inline get BOOL_VEC2(): GLenum {
		return BOOL_VEC2
	}

	@inline get BOOL_VEC3(): GLenum {
		return REPEAT
	}

	@inline get BOOL_VEC4(): GLenum {
		return BOOL_VEC4
	}

	@inline get FLOAT_MAT2(): GLenum {
		return FLOAT_MAT2
	}

	@inline get FLOAT_MAT3(): GLenum {
		return FLOAT_MAT3
	}

	@inline get FLOAT_MAT4(): GLenum {
		return FLOAT_MAT4
	}

	@inline get SAMPLER_2D(): GLenum {
		return SAMPLER_2D
	}

	@inline get SAMPLER_CUBE(): GLenum {
		return SAMPLER_CUBE
	}

	@inline get VERTEX_ATTRIB_ARRAY_ENABLED(): GLenum {
		return VERTEX_ATTRIB_ARRAY_ENABLED
	}

	@inline get VERTEX_ATTRIB_ARRAY_SIZE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_SIZE
	}

	@inline get VERTEX_ATTRIB_ARRAY_STRIDE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_STRIDE
	}

	@inline get VERTEX_ATTRIB_ARRAY_TYPE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_TYPE
	}

	@inline get VERTEX_ATTRIB_ARRAY_NORMALIZED(): GLenum {
		return VERTEX_ATTRIB_ARRAY_NORMALIZED
	}

	@inline get VERTEX_ATTRIB_ARRAY_POINTER(): GLenum {
		return VERTEX_ATTRIB_ARRAY_POINTER
	}

	@inline get VERTEX_ATTRIB_ARRAY_BUFFER_BINDING(): GLenum {
		return VERTEX_ATTRIB_ARRAY_BUFFER_BINDING
	}

	@inline get COMPILE_STATUS(): GLenum {
		return COMPILE_STATUS
	}

	@inline get LOW_FLOAT(): GLenum {
		return LOW_FLOAT
	}

	@inline get MEDIUM_FLOAT(): GLenum {
		return MEDIUM_FLOAT
	}

	@inline get HIGH_FLOAT(): GLenum {
		return HIGH_FLOAT
	}

	@inline get LOW_INT(): GLenum {
		return LOW_INT
	}

	@inline get MEDIUM_INT(): GLenum {
		return MEDIUM_INT
	}

	@inline get HIGH_INT(): GLenum {
		return HIGH_INT
	}

	@inline get FRAMEBUFFER(): GLenum {
		return FRAMEBUFFER
	}

	@inline get RENDERBUFFER(): GLenum {
		return RENDERBUFFER
	}

	@inline get RGBA4(): GLenum {
		return RGBA4
	}

	@inline get RGB5_A1(): GLenum {
		return RGB5_A1
	}

	@inline get RGB565(): GLenum {
		return RGB565
	}

	@inline get DEPTH_COMPONENT16(): GLenum {
		return DEPTH_COMPONENT16
	}

	@inline get STENCIL_INDEX(): GLenum {
		return STENCIL_INDEX
	}

	@inline get STENCIL_INDEX8(): GLenum {
		return STENCIL_INDEX8
	}

	@inline get DEPTH_STENCIL(): GLenum {
		return DEPTH_STENCIL
	}

	@inline get RENDERBUFFER_WIDTH(): GLenum {
		return RENDERBUFFER_WIDTH
	}

	@inline get RENDERBUFFER_HEIGHT(): GLenum {
		return RENDERBUFFER_HEIGHT
	}

	@inline get RENDERBUFFER_INTERNAL_FORMAT(): GLenum {
		return RENDERBUFFER_INTERNAL_FORMAT
	}

	@inline get RENDERBUFFER_RED_SIZE(): GLenum {
		return RENDERBUFFER_RED_SIZE
	}

	@inline get RENDERBUFFER_GREEN_SIZE(): GLenum {
		return RENDERBUFFER_GREEN_SIZE
	}

	@inline get RENDERBUFFER_BLUE_SIZE(): GLenum {
		return RENDERBUFFER_BLUE_SIZE
	}

	@inline get RENDERBUFFER_ALPHA_SIZE(): GLenum {
		return RENDERBUFFER_ALPHA_SIZE
	}

	@inline get RENDERBUFFER_DEPTH_SIZE(): GLenum {
		return RENDERBUFFER_DEPTH_SIZE
	}

	@inline get RENDERBUFFER_STENCIL_SIZE(): GLenum {
		return RENDERBUFFER_STENCIL_SIZE
	}

	@inline get FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE
	}

	@inline get FRAMEBUFFER_ATTACHMENT_OBJECT_NAME(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_OBJECT_NAME
	}

	@inline get FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL
	}

	@inline get FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE
	}

	@inline get COLOR_ATTACHMENT0(): GLenum {
		return COLOR_ATTACHMENT0
	}

	@inline get DEPTH_ATTACHMENT(): GLenum {
		return DEPTH_ATTACHMENT
	}

	@inline get STENCIL_ATTACHMENT(): GLenum {
		return STENCIL_ATTACHMENT
	}

	@inline get DEPTH_STENCIL_ATTACHMENT(): GLenum {
		return DEPTH_STENCIL_ATTACHMENT
	}

	@inline get NONE(): GLenum {
		return NONE
	}

	@inline get FRAMEBUFFER_COMPLETE(): GLenum {
		return FRAMEBUFFER_COMPLETE
	}

	@inline get FRAMEBUFFER_INCOMPLETE_ATTACHMENT(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_ATTACHMENT
	}

	@inline get FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
	}

	@inline get FRAMEBUFFER_INCOMPLETE_DIMENSIONS(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_DIMENSIONS
	}

	@inline get FRAMEBUFFER_UNSUPPORTED(): GLenum {
		return FRAMEBUFFER_UNSUPPORTED
	}

	@inline get FRAMEBUFFER_BINDING(): GLenum {
		return FRAMEBUFFER_BINDING
	}

	@inline get RENDERBUFFER_BINDING(): GLenum {
		return RENDERBUFFER_BINDING
	}

	@inline get MAX_RENDERBUFFER_SIZE(): GLenum {
		return MAX_RENDERBUFFER_SIZE
	}

	@inline get INVALID_FRAMEBUFFER_OPERATION(): GLenum {
		return INVALID_FRAMEBUFFER_OPERATION
	}

	@inline get UNPACK_FLIP_Y_WEBGL(): GLenum {
		return UNPACK_FLIP_Y_WEBGL
	}

	@inline get UNPACK_PREMULTIPLY_ALPHA_WEBGL(): GLenum {
		return UNPACK_PREMULTIPLY_ALPHA_WEBGL
	}

	@inline get CONTEXT_LOST_WEBGL(): GLenum {
		return CONTEXT_LOST_WEBGL
	}

	@inline get UNPACK_COLORSPACE_CONVERSION_WEBGL(): GLenum {
		return UNPACK_COLORSPACE_CONVERSION_WEBGL
	}

	@inline get BROWSER_DEFAULT_WEBGL(): GLenum {
		return BROWSER_DEFAULT_WEBGL
	}

	get drawingBufferWidth(): GLsizei {
		return getDrawingBufferWidth(this)
	}

	get drawingBufferHeight(): GLsizei {
		return getDrawingBufferHeight(this)
	}

	@inline getContextAttributes(): WebGLContextAttributes {
		return getContextAttributes(this)
	}

	@inline isContextLost(): bool {
		return isContextLost(this)
	}

	@inline getSupportedExtensions(): string[] {
		return getSupportedExtensions(this)
	}

	private __extensions: Map<string, WebGLExtension> = new Map()

	/**
	 * Get a canvas rendering context. Given a particular `type` string, a `T`
	 * generic type arg of the same name must be provided or a compile error
	 * will happen. The generic type arg is required so that the return type can
	 * be known in AssemblyScript. For example, the following will work, and the return
	 * type will be statically known and usable:
	 *
	 * ```ts
	 * const ext = gl.getExtension<ANGLE_instanced_arrays>('ANGLE_instanced_arrays')
	 * ```
	 *
	 * The following will cause a compile error due to the mismatch between `T` and `type`.
	 *
	 * ```ts
	 * const ext = gl.getExtension<ANGLE_instanced_arrays>('EXT_blend_minmax')
	 * ```
	 */
	// TODO, Once we have `Foo extends Bar` type conditions, we can get rid of
	// the generic arg and base return types off string types.
	@inline getExtension<T extends WebGLExtension>(type: string): T {
		// != or !== ?
		// Can we make this a compile-time check somehow?
		if (nameof<T>() !== type)
			throw new Error('Invalid context `type` string or `T` type provided, or mismatch between `type` and `T`.')

		if (this.__extensions.has(type)) return this.__extensions.get(type) as T

		const obj = instantiate<T>()

		let typeNum: i32 = -1

		// == or === ?
		if (obj instanceof ANGLE_instanced_arrays) typeNum = 0
		else if (obj instanceof EXT_blend_minmax) typeNum = 1
		// TODO else if (type == '...') typeNum = ...
		else ERROR('This should not be possible.')

		getExtension(this, obj, typeNum)
		this.__extensions.set(type, obj)

		return obj
	}

	@inline activeTexture(texture: GLenum): void {
		activeTexture(this, texture)
	}

	@inline attachShader(program: WebGLProgram, shader: WebGLShader): void {
		attachShader(this, program, shader)
	}

	// @inline bindAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, index: GLuint, name: string): void;
	@inline bindBuffer(target: GLenum, buffer: WebGLBuffer): void {
		bindBuffer(this, target, buffer)
	}
	@inline bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer): void {
		bindFramebuffer(this, target, framebuffer)
	}
	@inline bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer): void {
		bindRenderbuffer(this, target, renderbuffer)
	}
	@inline bindTexture(target: GLenum, texture: WebGLTexture): void {
		bindTexture(this, target, texture)
	}
	@inline blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
		blendColor(this, red, green, blue, alpha)
	}
	@inline blendEquation(mode: GLenum): void {
		blendEquation(this, mode)
	}
	@inline blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void {
		blendEquationSeparate(this, modeRGB, modeAlpha)
	}
	@inline blendFunc(sfactor: GLenum, dfactor: GLenum): void {
		blendFunc(this, sfactor, dfactor)
	}
	@inline blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void {
		blendFuncSeparate(this, srcRGB, dstRGB, srcAlpha, dstAlpha)
	}
	// TODO use TypedArray instead of StaticArray to match JS/TS APIs after this is fixed: https://github.com/AssemblyScript/assemblyscript/issues/2038
	// TODO make implement the other signatures to match JS/TS. For now we just accept TypedArrays.
	@inline bufferData<T>(target: GLenum, data: StaticArray<T>, usage: GLenum): void {
		bufferData<T>(this, WebGLDataBufferTypes.ArrayBufferView, target, data, usage)
	}
	@inline bufferSubData<T>(target: GLenum, offset: GLintptr, data: Array<T>): void {
		bufferSubData<T>(this, target, offset, data)
	}

	@inline checkFramebufferStatus(target: GLenum): GLenum {
		return checkFramebufferStatus(this, target)
	}
	@inline clear(mask: GLbitfield): void {
		clear(this, mask)
	}

	@inline clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
		clearColor(this, red, green, blue, alpha)
	}
	@inline clearDepth(depth: GLclampf): void {
		clearDepth(this, depth)
	}
	@inline clearStencil(s: GLint): void {
		clearStencil(this, s)
	}
	@inline colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void {
		colorMask(this, red, green, blue, alpha)
	}
	@inline compileShader(shader: WebGLShader): void {
		compileShader(this, shader)
	}

	@inline compressedTexImage2D(
		target: GLenum,
		level: GLint,
		internalformat: GLenum,
		width: GLsizei,
		height: GLsizei,
		border: GLint,
		data: ArrayBufferView,
	): void {
		compressedTexImage2D(this, target, level, internalformat, width, height, border, data)
	}
	@inline compressedTexSubImage2D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		width: GLsizei,
		height: GLsizei,
		format: GLenum,
		data: ArrayBufferView,
	): void {
		compressedTexSubImage2D(this, target, level, xoffset, yoffset, width, height, format, data)
	}

	@inline copyTexImage2D(
		target: GLenum,
		level: GLint,
		internalformat: GLenum,
		x: GLint,
		y: GLint,
		width: GLsizei,
		height: GLsizei,
		border: GLint,
	): void {
		copyTexImage2D(this, target, level, internalformat, x, y, width, height, border)
	}
	@inline copyTexSubImage2D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		x: GLint,
		y: GLint,
		width: GLsizei,
		height: GLsizei,
	): void {
		copyTexSubImage2D(this, target, level, xoffset, yoffset, x, y, width, height)
	}

	@inline createBuffer(): WebGLBuffer {
		const result = new WebGLBuffer()
		createBuffer(this, result)
		return result
	}

	@inline createFramebuffer(): WebGLFramebuffer {
		return createFramebuffer(this)
	}

	@inline createProgram(): WebGLProgram {
		const result = new WebGLProgram()
		createProgram(this, result)
		return result
	}
	@inline createRenderbuffer(): WebGLRenderbuffer {
		return createRenderbuffer(this)
	}
	@inline createShader(type: GLenum): WebGLShader {
		const result = new WebGLShader()
		createShader(this, result, type)
		return result
	}

	@inline createTexture(): WebGLTexture {
		return createTexture(this)
	}

	@inline cullFace(mode: GLenum): void {
		cullFace(this, mode)
	}

	@inline deleteBuffer(buffer: WebGLBuffer): void {
		deleteBuffer(this, buffer)
	}

	@inline deleteFramebuffer(framebuffer: WebGLFramebuffer): void {
		deleteFramebuffer(this, framebuffer)
	}

	@inline deleteProgram(program: WebGLProgram): void {
		deleteProgram(this, program)
	}

	@inline deleteRenderbuffer(renderbuffer: WebGLRenderbuffer): void {
		deleteRenderbuffer(this, renderbuffer)
	}
	@inline deleteShader(shader: WebGLShader): void {
		deleteShader(this, shader)
	}
	@inline deleteTexture(texture: WebGLTexture): void {
		deleteTexture(this, texture)
	}

	@inline depthFunc(func: GLenum): void {
		depthFunc(this, func)
	}
	@inline depthMask(flag: GLboolean): void {
		depthMask(this, flag)
	}
	@inline depthRange(zNear: GLclampf, zFar: GLclampf): void {
		depthRange(this, zNear, zFar)
	}

	@inline detachShader(program: WebGLProgram, shader: WebGLShader): void {
		detachShader(this, program, shader)
	}
	@inline disable(cap: GLenum): void {
		disable(this, cap)
	}
	@inline disableVertexAttribArray(index: GLuint): void {
		disableVertexAttribArray(this, index)
	}
	@inline drawArrays(mode: GLenum, first: GLint, count: GLsizei): void {
		drawArrays(this, mode, first, count)
	}
	@inline drawElements(mode: GLenum, count: GLsizei, typ: GLenum, offset: GLintptr): void {
		drawElements(this, mode, count, typ, offset)
	}

	@inline enable(capability: GLenum): void {
		enable(this, capability)
	}

	@inline enableVertexAttribArray(index: GLuint): void {
		enableVertexAttribArray(this, index)
	}
	@inline finish(): void {
		finish(this)
	}
	@inline flush(): void {
		flush(this)
	}
	@inline framebufferRenderbuffer(
		target: GLenum,
		attachment: GLenum,
		renderbuffertarget: GLenum,
		renderbuffer: WebGLRenderbuffer,
	): void {
		framebufferRenderbuffer(this, target, attachment, renderbuffertarget, renderbuffer)
	}
	@inline framebufferTexture2D(
		target: GLenum,
		attachment: GLenum,
		textarget: GLenum,
		texture: WebGLTexture,
		level: GLint,
	): void {
		framebufferTexture2D(this, target, attachment, textarget, texture, level)
	}
	@inline frontFace(mode: GLenum): void {
		frontFace(this, mode)
	}

	@inline generateMipmap(target: GLenum): void {
		generateMipmap(this, target)
	}

	// @inline getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
	// 	return getActiveAttrib(this, program, index)
	// }
	// @inline getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
	// 	return getActiveUniform(this, program, index)
	// }
	// @inline getAttachedShaders(program: WebGLProgram): sequence<WebGLShader> {
	// 	return getAttachedShaders(this, program)
	// }

	@inline getAttribLocation(program: WebGLProgram, name: string): GLint {
		return getAttribLocation(this, program, name)
	}

	@inline getBufferParameter(target: GLenum, pname: GLenum): externref {
		return getBufferParameter(this, target, pname)
	}
	@inline getParameter(pname: GLenum): externref {
		return getParameter(this, pname)
	}

	@inline getError(): GLenum {
		return getError(this)
	}

	@inline getFramebufferAttachmentParameter(target: GLenum, attachment: GLenum, pname: GLenum): externref {
		return getFramebufferAttachmentParameter(this, target, attachment, pname)
	}
	@inline getProgramParameter(program: WebGLProgram, pname: GLenum): bool {
		return getProgramParameter(this, program, pname)
	}
	@inline getProgramInfoLog(program: WebGLProgram): DOMString {
		return getProgramInfoLog(this, program)
	}
	@inline getRenderbufferParameter(target: GLenum, pname: GLenum): externref {
		return getRenderbufferParameter(this, target, pname)
	}
	@inline getShaderParameter(shader: WebGLShader, pname: GLenum): bool {
		return getShaderParameter(this, shader, pname)
	}
	// @inline getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat {
	// 	return getShaderPrecisionFormat(this, shadertype, precisiontype)
	// }

	@inline getShaderInfoLog(shader: WebGLShader): DOMString {
		return getShaderInfoLog(this, shader)
	}

	@inline getShaderSource(shader: WebGLShader): DOMString {
		return getShaderSource(this, shader)
	}

	@inline getTexParameter(target: GLenum, pname: GLenum): externref {
		return getTexParameter(this, target, pname)
	}

	@inline getUniform(program: WebGLProgram, location: WebGLUniformLocation): externref {
		return getUniform(this, program, location)
	}

	@inline getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation {
		const result = new WebGLUniformLocation()
		getUniformLocation(this, result, program, name)
		return result
	}

	@inline getVertexAttrib(index: GLuint, pname: GLenum): externref {
		return getVertexAttrib(this, index, pname)
	}

	@inline getVertexAttribOffset(index: GLuint, pname: GLenum): GLsizeiptr {
		return getVertexAttribOffset(this, index, pname)
	}

	@inline hint(target: GLenum, mode: GLenum): void {
		hint(this, target, mode)
	}

	@inline isBuffer(buffer: WebGLBuffer): GLboolean {
		return isBuffer(this, buffer)
	}
	@inline isEnabled(cap: GLenum): GLboolean {
		return isEnabled(this, cap)
	}
	@inline isFramebuffer(framebuffer: WebGLFramebuffer): GLboolean {
		return isFramebuffer(this, framebuffer)
	}
	@inline isProgram(program: WebGLProgram): GLboolean {
		return isProgram(this, program)
	}
	@inline isRenderbuffer(renderbuffer: WebGLRenderbuffer): GLboolean {
		return isRenderbuffer(this, renderbuffer)
	}
	@inline isShader(shader: WebGLShader): GLboolean {
		return isShader(this, shader)
	}
	@inline isTexture(texture: WebGLTexture): GLboolean {
		return isTexture(this, texture)
	}
	@inline lineWidth(width: GLfloat): void {
		lineWidth(this, width)
	}
	@inline linkProgram(program: WebGLProgram): void {
		linkProgram(this, program)
	}
	@inline pixelStorei(pname: GLenum, param: GLint): void {
		pixelStorei(this, pname, param)
	}
	@inline polygonOffset(factor: GLfloat, units: GLfloat): void {
		polygonOffset(this, factor, units)
	}

	@inline readPixels(
		x: GLint,
		y: GLint,
		width: GLsizei,
		height: GLsizei,
		format: GLenum,
		typ: GLenum,
		pixels: ArrayBufferView,
	): void {
		readPixels(this, x, y, width, height, format, typ, pixels)
	}

	@inline renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void {
		renderbufferStorage(this, target, internalformat, width, height)
	}
	@inline sampleCoverage(value: GLclampf, invert: GLboolean): void {
		sampleCoverage(this, value, invert)
	}
	@inline scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		scissor(this, x, y, width, height)
	}

	@inline shaderSource(shader: WebGLShader, source: string): void {
		shaderSource(this, shader, source)
	}

	@inline stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void {
		stencilFunc(this, func, ref, mask)
	}
	@inline stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void {
		stencilFuncSeparate(this, face, func, ref, mask)
	}
	@inline stencilMask(mask: GLuint): void {
		stencilMask(this, mask)
	}
	@inline stencilMaskSeparate(face: GLenum, mask: GLuint): void {
		stencilMaskSeparate(this, face, mask)
	}
	@inline stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void {
		stencilOp(this, fail, zfail, zpass)
	}
	@inline stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void {
		stencilOpSeparate(this, face, fail, zfail, zpass)
	}

	@inline texImage2D(
		target: GLenum,
		level: GLint,
		internalformat: GLenum,
		format: GLenum,
		typ: GLenum,
		image: ImageData,
	): void {
		texImage2D(this, target, level, internalformat, format, typ, image)
	}

	@inline texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void {
		texParameterf(this, target, pname, param)
	}
	@inline texParameteri(target: GLenum, pname: GLenum, param: GLint): void {
		texParameteri(this, target, pname, param)
	}

	@inline texSubImage2D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		format: GLenum,
		typ: GLenum,
		pixels: ImageData,
	): void {
		texSubImage2D(this, target, level, xoffset, yoffset, format, typ, pixels)
	}

	@inline uniform1f(location: WebGLUniformLocation, x: GLfloat): void {
		uniform1f(this, location, x)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform1fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform1fv(this, location, v)
	}

	@inline uniform1i(location: WebGLUniformLocation, x: GLint): void {
		uniform1i(this, location, x)
	}
	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform1iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform1iv(this, location, v)
	}

	@inline uniform2f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat): void {
		uniform2f(this, location, x, y)
	}
	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform2fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform2fv(this, location, v)
	}

	@inline uniform2i(location: WebGLUniformLocation, x: GLint, y: GLint): void {
		uniform2i(this, location, x, y)
	}
	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform2iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform2iv(this, location, v)
	}

	@inline uniform3f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat): void {
		uniform3f(this, location, x, y, z)
	}
	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform3fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform3fv(this, location, v)
	}

	@inline uniform3i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint): void {
		uniform3i(this, location, x, y, z)
	}
	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform3iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform3iv(this, location, v)
	}

	@inline uniform4f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
		uniform4f(this, location, x, y, z, w)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform4fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform4fv(this, location, v)
	}

	@inline uniform4i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint, w: GLint): void {
		uniform4i(this, location, x, y, z, w)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniform4iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform4iv(this, location, v)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniformMatrix2fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix2fv(this, location, transpose, value)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniformMatrix3fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix3fv(this, location, transpose, value)
	}

	// TODO use TypedArray instead of StaticArray after https://github.com/AssemblyScript/assemblyscript/issues/2038
	@inline uniformMatrix4fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix4fv(this, location, transpose, value)
	}
	@inline useProgram(program: WebGLProgram): void {
		useProgram(this, program)
	}
	@inline validateProgram(program: WebGLProgram): void {
		validateProgram(this, program)
	}

	@inline vertexAttrib1f(indx: GLuint, x: GLfloat): void {
		vertexAttrib1f(this, indx, x)
	}

	@inline vertexAttrib1fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib1fv(this, indx, values)
	}

	@inline vertexAttrib2f(indx: GLuint, x: GLfloat, y: GLfloat): void {
		vertexAttrib2f(this, indx, x, y)
	}

	@inline vertexAttrib2fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib2fv(this, indx, values)
	}

	@inline vertexAttrib3f(indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void {
		vertexAttrib3f(this, indx, x, y, z)
	}
	@inline vertexAttrib3fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib3fv(this, indx, values)
	}

	@inline vertexAttrib4f(indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
		vertexAttrib4f(this, indx, x, y, z, w)
	}
	@inline vertexAttrib4fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib4fv(this, indx, values)
	}

	@inline vertexAttribPointer(
		indx: GLint,
		size: GLint,
		type: GLenum,
		normalized: GLboolean,
		stride: GLsizei,
		offset: GLintptr,
	): void {
		vertexAttribPointer(this, indx, size, type, normalized, stride, offset)
	}

	@inline viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		viewport(this, x, y, width, height)
	}

	@inline copyBufferSubData(
		readTarget: GLenum,
		writeTarget: GLenum,
		readOffset: GLintptr,
		writeOffset: GLintptr,
		size: GLsizeiptr,
	): void {
		copyBufferSubData(this, readTarget, writeTarget, readOffset, writeOffset, size)
	}

	@inline getBufferSubData(
		gl: WebGLRenderingContext,
		target: GLenum,
		srcByteOffset: GLintptr,
		dstBuffer: ArrayBufferView,
		dstOffset: GLuint = 0,
		length: GLuint = 0,
	): void {
		getBufferSubData(this, target, srcByteOffset, dstBuffer, dstOffset, length)
	}

	@inline blitFramebuffer(
		gl: WebGLRenderingContext,
		srcX0: GLint,
		srcY0: GLint,
		srcX1: GLint,
		srcY1: GLint,
		dstX0: GLint,
		dstY0: GLint,
		dstX1: GLint,
		dstY1: GLint,
		mask: GLbitfield,
		filter: GLenum,
	): void {
		blitFramebuffer(this, srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter)
	}
	@inline framebufferTextureLayer(
		target: GLenum,
		attachment: GLenum,
		texture: WebGLTexture,
		level: GLint,
		layer: GLint,
	): void {
		framebufferTextureLayer(this, target, attachment, texture, level, layer)
	}
	@inline invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void {
		invalidateFramebuffer(this, target, attachments)
	}

	@inline invalidateSubFramebuffer(
		target: GLenum,
		attachments: GLenum[],
		x: GLint,
		y: GLint,
		width: GLsizei,
		height: GLsizei,
	): void {
		invalidateSubFramebuffer(this, target, attachments, x, y, width, height)
	}
	@inline readBuffer(src: GLenum): void {
		readBuffer(this, src)
	}

	@inline getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): externref {
		return getInternalformatParameter(this, target, internalformat, pname)
	}
	@inline renderbufferStorageMultisample(
		target: GLenum,
		samples: GLsizei,
		internalformat: GLenum,
		width: GLsizei,
		height: GLsizei,
	): void {
		renderbufferStorageMultisample(this, target, samples, internalformat, width, height)
	}

	@inline texStorage2D(
		target: GLenum,
		levels: GLsizei,
		internalformat: GLenum,
		width: GLsizei,
		height: GLsizei,
	): void {
		texStorage2D(this, target, levels, internalformat, width, height)
	}
	@inline texStorage3D(
		target: GLenum,
		levels: GLsizei,
		internalformat: GLenum,
		width: GLsizei,
		height: GLsizei,
		depth: GLsizei,
	): void {
		texStorage3D(this, target, levels, internalformat, width, height, depth)
	}

	@inline texImage3D(
		target: GLenum,
		level: GLint,
		internalformat: GLint,
		width: GLsizei,
		height: GLsizei,
		depth: GLsizei,
		border: GLint,
		format: GLenum,
		typ: GLenum,
		pboOffset: GLintptr,
	): void {
		texImage3D(this, target, level, internalformat, width, height, depth, border, format, typ, pboOffset)
	}

	@inline texSubImage3D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		zoffset: GLint,
		width: GLsizei,
		height: GLsizei,
		depth: GLsizei,
		format: GLenum,
		typ: GLenum,
		pboOffset: GLintptr,
	): void {
		texSubImage3D(this, target, level, xoffset, yoffset, zoffset, width, height, depth, format, typ, pboOffset)
	}

	@inline copyTexSubImage3D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		zoffset: GLint,
		x: GLint,
		y: GLint,
		width: GLsizei,
		height: GLsizei,
	): void {
		copyTexSubImage3D(this, target, level, xoffset, yoffset, zoffset, x, y, width, height)
	}

	@inline compressedTexImage3D(
		target: GLenum,
		level: GLint,
		internalformat: GLenum,
		width: GLsizei,
		height: GLsizei,
		depth: GLsizei,
		border: GLint,
		imageSize: GLsizei,
		offset: GLintptr,
	): void {
		compressedTexImage3D(this, target, level, internalformat, width, height, depth, border, imageSize, offset)
	}

	@inline compressedTexSubImage3D(
		target: GLenum,
		level: GLint,
		xoffset: GLint,
		yoffset: GLint,
		zoffset: GLint,
		width: GLsizei,
		height: GLsizei,
		depth: GLsizei,
		format: GLenum,
		imageSize: GLsizei,
		offset: GLintptr,
	): void {
		compressedTexSubImage3D(
			this,
			target,
			level,
			xoffset,
			yoffset,
			zoffset,
			width,
			height,
			depth,
			format,
			imageSize,
			offset,
		)
	}

	@inline getFragDataLocation(program: WebGLProgram, name: DOMString): GLint {
		return getFragDataLocation(this, program, name)
	}

	@inline uniform1ui(location: WebGLUniformLocation, v0: GLuint): void {
		uniform1ui(this, location, v0)
	}
	@inline uniform2ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint): void {
		uniform2ui(this, location, v0, v1)
	}
	@inline uniform3ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint): void {
		uniform3ui(this, location, v0, v1, v2)
	}
	@inline uniform4ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void {
		uniform4ui(this, location, v0, v1, v2, v3)
	}

	@inline uniform1uiv(
		location: WebGLUniformLocation,
		data: Uint32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniform1uiv(this, location, data, srcOffset, srcLength)
	}

	@inline uniform2uiv(
		location: WebGLUniformLocation,
		data: Uint32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniform2uiv(this, location, data, srcOffset, srcLength)
	}
	@inline uniform3uiv(
		location: WebGLUniformLocation,
		data: Uint32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniform3uiv(this, location, data, srcOffset, srcLength)
	}
	@inline uniform4uiv(
		location: WebGLUniformLocation,
		data: Uint32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniform4uiv(this, location, data, srcOffset, srcLength)
	}
	@inline uniformMatrix3x2fv(
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix3x2fv(this, location, transpose, data, srcOffset, srcLength)
	}
	@inline uniformMatrix4x2fv(
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix4x2fv(this, location, transpose, data, srcOffset, srcLength)
	}

	@inline uniformMatrix2x3fv(
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix2x3fv(this, location, transpose, data, srcOffset, srcLength)
	}
	@inline uniformMatrix4x3fv(
		gl: WebGLRenderingContext,
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix4x3fv(this, location, transpose, data, srcOffset, srcLength)
	}

	@inline uniformMatrix2x4fv(
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix2x4fv(this, location, transpose, data, srcOffset, srcLength)
	}
	@inline uniformMatrix3x4fv(
		location: WebGLUniformLocation,
		transpose: GLboolean,
		data: Float32List,
		srcOffset: GLuint = 0,
		srcLength: GLuint = 0,
	): void {
		uniformMatrix3x4fv(this, location, transpose, data, srcOffset, srcLength)
	}

	/* Vertex attribs */
	@inline vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void {
		vertexAttribI4i(this, index, x, y, z, w)
	}
	@inline vertexAttribI4iv(index: GLuint, values: Int32List): void {
		vertexAttribI4iv(this, index, values)
	}
	@inline vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void {
		vertexAttribI4ui(this, index, x, y, z, w)
	}
	@inline vertexAttribI4uiv(index: GLuint, values: Uint32List): void {
		vertexAttribI4uiv(this, index, values)
	}
	@inline vertexAttribIPointer(index: GLuint, size: GLint, typ: GLenum, stride: GLsizei, offset: GLintptr): void {
		vertexAttribIPointer(this, index, size, typ, stride, offset)
	}

	@inline vertexAttribDivisor(index: GLuint, divisor: GLuint): void {
		vertexAttribDivisor(this, index, divisor)
	}
	@inline drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void {
		drawArraysInstanced(this, mode, first, count, instanceCount)
	}
	@inline drawElementsInstanced(
		mode: GLenum,
		count: GLsizei,
		typ: GLenum,
		offset: GLintptr,
		instanceCount: GLsizei,
	): void {
		drawElementsInstanced(this, mode, count, typ, offset, instanceCount)
	}
	@inline drawRangeElements(
		mode: GLenum,
		start: GLuint,
		end: GLuint,
		count: GLsizei,
		typ: GLenum,
		offset: GLintptr,
	): void {
		drawRangeElements(this, mode, start, end, count, typ, offset)
	}

	@inline drawBuffers(gl: WebGLRenderingContext, buffers: GLenum[]): void {
		drawBuffers(this, buffers)
	}

	@inline clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset: GLuint = 0): void {
		clearBufferfv(this, buffer, drawbuffer, values, srcOffset)
	}
	@inline clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset: GLuint = 0): void {
		clearBufferiv(this, buffer, drawbuffer, values, srcOffset)
	}
	@inline clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset: GLuint = 0): void {
		clearBufferuiv(this, buffer, drawbuffer, values, srcOffset)
	}

	@inline clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void {
		clearBufferfi(this, buffer, drawbuffer, depth, stencil)
	}

	/* Query Objects */
	@inline createQuery(): WebGLQuery {
		return createQuery(this)
	}
	@inline deleteQuery(query: WebGLQuery): void {
		deleteQuery(this, query)
	}

	@inline isQuery(query: WebGLQuery): GLboolean {
		return isQuery(this, query)
	}
	@inline beginQuery(target: GLenum, query: WebGLQuery): void {
		beginQuery(this, target, query)
	}
	@inline endQuery(target: GLenum): void {
		endQuery(this, target)
	}
	@inline getQuery(target: GLenum, pname: GLenum): WebGLQuery {
		return getQuery(this, target, pname)
	}
	@inline getQueryParameter(query: WebGLQuery, pname: GLenum): externref {
		return getQueryParameter(this, query, pname)
	}

	@inline createSampler(): WebGLSampler {
		return createSampler(this)
	}

	@inline deleteSampler(sampler: WebGLSampler): void {
		deleteSampler(this, sampler)
	}

	@inline isSampler(sampler: WebGLSampler): GLboolean {
		return isSampler(this, sampler)
	}

	@inline bindSampler(unit: GLuint, sampler: WebGLSampler): void {
		bindSampler(this, unit, sampler)
	}
	@inline samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void {
		samplerParameteri(this, sampler, pname, param)
	}
	@inline samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void {
		samplerParameterf(this, sampler, pname, param)
	}
	@inline getSamplerParameter(sampler: WebGLSampler, pname: GLenum): externref {
		return getSamplerParameter(this, sampler, pname)
	}

	/* Sync objects */
	@inline fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync {
		return fenceSync(this, condition, flags)
	}
	/*[WebGLHandlesContextLoss]*/
	@inline isSync(sync: WebGLSync): GLboolean {
		return isSync(this, sync)
	}

	@inline deleteSync(sync: WebGLSync): void {
		deleteSync(this, sync)
	}

	@inline clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum {
		return clientWaitSync(this, sync, flags, timeout)
	}
	@inline waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void {
		waitSync(this, sync, flags, timeout)
	}
	@inline getSyncParameter(sync: WebGLSync, pname: GLenum): externref {
		return getSyncParameter(this, sync, pname)
	}

	@inline createTransformFeedback(): WebGLTransformFeedback {
		return createTransformFeedback(this)
	}
	@inline deleteTransformFeedback(tf: WebGLTransformFeedback): void {
		deleteTransformFeedback(this, tf)
	}

	@inline isTransformFeedback(tf: WebGLTransformFeedback): GLboolean {
		return isTransformFeedback(this, tf)
	}
	@inline bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback): void {
		bindTransformFeedback(this, target, tf)
	}
	@inline beginTransformFeedback(primitiveMode: GLenum): void {
		beginTransformFeedback(this, primitiveMode)
	}

	@inline endTransformFeedback(): void {
		endTransformFeedback(this)
	}

	@inline transformFeedbackVaryings(program: WebGLProgram, varyings: DOMString[], bufferMode: GLenum): void {
		transformFeedbackVaryings(this, program, varyings, bufferMode)
	}
	// @inline getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
	// 	return getTransformFeedbackVarying(this, program, index)
	// }
	@inline pauseTransformFeedback(): void {
		pauseTransformFeedback(this)
	}

	@inline resumeTransformFeedback(): void {
		resumeTransformFeedback(this)
	}

	@inline bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer): void {
		bindBufferBase(this, target, index, buffer)
	}
	@inline bindBufferRange(
		target: GLenum,
		index: GLuint,
		buffer: WebGLBuffer,
		offset: GLintptr,
		size: GLsizeiptr,
	): void {
		bindBufferRange(this, target, index, buffer, offset, size)
	}
	@inline getIndexedParameter(target: GLenum, index: GLuint): externref {
		return getIndexedParameter(this, target, index)
	}
	@inline getUniformIndices(program: WebGLProgram, uniformNames: DOMString[]): GLuint[] {
		return getUniformIndices(this, program, uniformNames)
	}
	@inline getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): externref {
		return getActiveUniforms(this, program, uniformIndices, pname)
	}
	@inline getUniformBlockIndex(program: WebGLProgram, uniformBlockName: DOMString): GLuint {
		return getUniformBlockIndex(this, program, uniformBlockName)
	}
	@inline getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): externref {
		return getActiveUniformBlockParameter(this, program, uniformBlockIndex, pname)
	}
	@inline getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): DOMString {
		return getActiveUniformBlockName(this, program, uniformBlockIndex)
	}
	@inline uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, _uniformBlockBinding: GLuint): void {
		uniformBlockBinding(this, program, uniformBlockIndex, _uniformBlockBinding)
	}

	@inline createVertexArray(): WebGLVertexArrayObject {
		return createVertexArray(this)
	}
	@inline deleteVertexArray(vertexArray: WebGLVertexArrayObject): void {
		deleteVertexArray(this, vertexArray)
	}

	@inline isVertexArray(vertexArray: WebGLVertexArrayObject): GLboolean {
		return isVertexArray(this, vertexArray)
	}

	@inline bindVertexArray(array: WebGLVertexArrayObject): void {
		bindVertexArray(this, array)
	}
}

export enum WebGLDataBufferTypes {
	ArrayBufferView,
	Uint8Array,
	Float64Array,
}
