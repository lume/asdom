type WebGLContextAttributes = i32;

export type GLenum = u32;
export type GLboolean = bool;
export type GLbitfield = u32;
export type GLbyte = i8;
export type GLshort = i16;
export type GLint = i32;
export type GLsizei = i32;
export type GLintptr = i32; //i64;
export type GLsizeiptr = i32; //i64;
export type GLubyte = u8;
export type GLushort = u16;
export type GLuint = u32;
export type GLfloat = f32;
export type GLclampf = f32;
export type GLuint64 = u32; //u64;
export type GLint64 = i32; //i64;

export type WebGLUniformLocation = i32;
export type TexImageSource = i32;
export type Int32List = i32;
export type Uint32List = i32;
export type Float32List = i32;
export type WebGLQuery = i32;
export type WebGLSampler = i32;
export type WebGLSync = i32;
export type WebGLTransformFeedback = i32;
export type ImageData = i32;
export type DOMString = string;
export type HTMLImageElement = externref;
export type HTMLVideoElement = externref;
export type WebGLVertexArrayObject = i32;

// == debug function not part of WebGL
export declare function logi32(arg: i32): void;
export declare function logf32(arg: f32): void;
// == Not a part of WebGL, but there must be a way to create and load images
// export type ImageData = i32;
export declare function createImage(image_location: string): ImageData;
export declare function imageReady(image_id: ImageData): bool;

// === WebGLContextAttributes ===
export const ALPHA_DEFAULT = true;
export const FALSE: GLboolean = false;

//export declare function activateTexture(gl: WebGLContextAttributes, texture: WebGLTexture): void;

export declare function getAlpha(gl: WebGLContextAttributes): GLboolean;
export declare function setAlpha(gl: WebGLContextAttributes, value: GLboolean): void;

export const DEPTH_DEFAULT = true;
export declare function getDepth(gl: WebGLContextAttributes): GLboolean;
export declare function setDepth(gl: WebGLContextAttributes, value: GLboolean): void;

export const STENCIL_DEFAULT = false;
export declare function getStencil(gl: WebGLContextAttributes): GLboolean;
export declare function setStencil(gl: WebGLContextAttributes, value: GLboolean): void;

export const ANTIALIAS_DEFAULT = true;
export declare function getAntialias(gl: WebGLContextAttributes): GLboolean;
export declare function setAntialias(gl: WebGLContextAttributes, value: GLboolean): void;

export const PREMULTIPLIED_ALPHA_DEFAULT = true;
export declare function getPremultipliedAlpha(gl: WebGLContextAttributes): GLboolean;
export declare function setPremultipliedAlpha(gl: WebGLContextAttributes, value: GLboolean): void;

export const PRESERVE_DRAWING_BUFFER_DEFAULT = false;
export declare function getPreserveDrawingBuffer(gl: WebGLContextAttributes): GLboolean;
export declare function setPreserveDrawingBuffer(gl: WebGLContextAttributes, value: GLboolean): void;

// === WebGLActiveInfo ===

type WebGLActiveInfo = externref;

export declare function getSize(gl: WebGLActiveInfo): GLint;
export declare function getType(gl: WebGLActiveInfo): GLenum;
export declare function getName(gl: WebGLActiveInfo): string;

// === WebGLShaderPrecisionFormat ===

type WebGLShaderPrecisionFormat = externref;

export declare function getRangeMin(gl: WebGLShaderPrecisionFormat): GLint;
export declare function getRangeMax(gl: WebGLShaderPrecisionFormat): GLint;
export declare function getPrecision(gl: WebGLShaderPrecisionFormat): GLint;

// === WebGLRenderingContextId ===

export type WebGLRenderingContextId = i32;

/* ClearBufferMask */
export const DEPTH_BUFFER_BIT: GLenum = 0x00000100;
export const STENCIL_BUFFER_BIT: GLenum = 0x00000400;
export const COLOR_BUFFER_BIT: GLenum = 0x00004000;

/* BeginMode */
export const POINTS: GLenum = 0x0000;
export const LINES: GLenum = 0x0001;
export const LINE_LOOP: GLenum = 0x0002;
export const LINE_STRIP: GLenum = 0x0003;
export const TRIANGLES: GLenum = 0x0004;
export const TRIANGLE_STRIP: GLenum = 0x0005;
export const TRIANGLE_FAN: GLenum = 0x0006;

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
export const ZERO: GLenum = 0;
export const ONE: GLenum = 1;
export const SRC_COLOR: GLenum = 0x0300;
export const ONE_MINUS_SRC_COLOR: GLenum = 0x0301;
export const SRC_ALPHA: GLenum = 0x0302;
export const ONE_MINUS_SRC_ALPHA: GLenum = 0x0303;
export const DST_ALPHA: GLenum = 0x0304;
export const ONE_MINUS_DST_ALPHA: GLenum = 0x0305;

/* BlendingFactorSrc */
/*      ZERO */
/*      ONE */
export const DST_COLOR: GLenum = 0x0306;
export const ONE_MINUS_DST_COLOR: GLenum = 0x0307;
export const SRC_ALPHA_SATURATE: GLenum = 0x0308;
/*      SRC_ALPHA */
/*      ONE_MINUS_SRC_ALPHA */
/*      DST_ALPHA */
/*      ONE_MINUS_DST_ALPHA */

/* BlendEquationSeparate */
export const FUNC_ADD: GLenum = 0x8006;
export const BLEND_EQUATION: GLenum = 0x8009;
export const BLEND_EQUATION_RGB: GLenum = 0x8009;
export const BLEND_EQUATION_ALPHA: GLenum = 0x883D;

/* BlendSubtract */
export const FUNC_SUBTRACT: GLenum = 0x800A;
export const FUNC_REVERSE_SUBTRACT: GLenum = 0x800B;

/* Separate Blend Functions */
export const BLEND_DST_RGB: GLenum = 0x80C8;
export const BLEND_SRC_RGB: GLenum = 0x80C9;
export const BLEND_DST_ALPHA: GLenum = 0x80CA;
export const BLEND_SRC_ALPHA: GLenum = 0x80CB;
export const CONSTANT_COLOR: GLenum = 0x8001;
export const ONE_MINUS_CONSTANT_COLOR: GLenum = 0x8002;
export const CONSTANT_ALPHA: GLenum = 0x8003;
export const ONE_MINUS_CONSTANT_ALPHA: GLenum = 0x8004;
export const BLEND_COLOR: GLenum = 0x8005;

/* Buffer Objects */
export const ARRAY_BUFFER: GLenum = 0x8892;
export const ELEMENT_ARRAY_BUFFER: GLenum = 0x8893;
export const ARRAY_BUFFER_BINDING: GLenum = 0x8894;
export const ELEMENT_ARRAY_BUFFER_BINDING: GLenum = 0x8895;

export const STREAM_DRAW: GLenum = 0x88E0;
export const STATIC_DRAW: GLenum = 0x88E4;
export const DYNAMIC_DRAW: GLenum = 0x88E8;

export const BUFFER_SIZE: GLenum = 0x8764;
export const BUFFER_USAGE: GLenum = 0x8765;

export const CURRENT_VERTEX_ATTRIB: GLenum = 0x8626;

/* CullFaceMode */
export const FRONT: GLenum = 0x0404;
export const BACK: GLenum = 0x0405;
export const FRONT_AND_BACK: GLenum = 0x0408;

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
export const CULL_FACE: GLenum = 0x0B44;
export const BLEND: GLenum = 0x0BE2;
export const DITHER: GLenum = 0x0BD0;
export const STENCIL_TEST: GLenum = 0x0B90;
export const DEPTH_TEST: GLenum = 0x0B71;
export const SCISSOR_TEST: GLenum = 0x0C11;
export const POLYGON_OFFSET_FILL: GLenum = 0x8037;
export const SAMPLE_ALPHA_TO_COVERAGE: GLenum = 0x809E;
export const SAMPLE_COVERAGE: GLenum = 0x80A0;

/* ErrorCode */
export const NO_ERROR: GLenum = 0;
export const INVALID_ENUM: GLenum = 0x0500;
export const INVALID_VALUE: GLenum = 0x0501;
export const INVALID_OPERATION: GLenum = 0x0502;
export const OUT_OF_MEMORY: GLenum = 0x0505;

/* FrontFaceDirection */
export const CW: GLenum = 0x0900;
export const CCW: GLenum = 0x0901;

/* GetPName */
export const LINE_WIDTH: GLenum = 0x0B21;
export const ALIASED_POINT_SIZE_RANGE: GLenum = 0x846D;
export const ALIASED_LINE_WIDTH_RANGE: GLenum = 0x846E;
export const CULL_FACE_MODE: GLenum = 0x0B45;
export const FRONT_FACE: GLenum = 0x0B46;
export const DEPTH_RANGE: GLenum = 0x0B70;
export const DEPTH_WRITEMASK: GLenum = 0x0B72;
export const DEPTH_CLEAR_VALUE: GLenum = 0x0B73;
export const DEPTH_FUNC: GLenum = 0x0B74;
export const STENCIL_CLEAR_VALUE: GLenum = 0x0B91;
export const STENCIL_FUNC: GLenum = 0x0B92;
export const STENCIL_FAIL: GLenum = 0x0B94;
export const STENCIL_PASS_DEPTH_FAIL: GLenum = 0x0B95;
export const STENCIL_PASS_DEPTH_PASS: GLenum = 0x0B96;
export const STENCIL_REF: GLenum = 0x0B97;
export const STENCIL_VALUE_MASK: GLenum = 0x0B93;
export const STENCIL_WRITEMASK: GLenum = 0x0B98;
export const STENCIL_BACK_FUNC: GLenum = 0x8800;
export const STENCIL_BACK_FAIL: GLenum = 0x8801;
export const STENCIL_BACK_PASS_DEPTH_FAIL: GLenum = 0x8802;
export const STENCIL_BACK_PASS_DEPTH_PASS: GLenum = 0x8803;
export const STENCIL_BACK_REF: GLenum = 0x8CA3;
export const STENCIL_BACK_VALUE_MASK: GLenum = 0x8CA4;
export const STENCIL_BACK_WRITEMASK: GLenum = 0x8CA5;
export const VIEWPORT: GLenum = 0x0BA2;
export const SCISSOR_BOX: GLenum = 0x0C10;
/*      SCISSOR_TEST */
export const COLOR_CLEAR_VALUE: GLenum = 0x0C22;
export const COLOR_WRITEMASK: GLenum = 0x0C23;
export const UNPACK_ALIGNMENT: GLenum = 0x0CF5;
export const PACK_ALIGNMENT: GLenum = 0x0D05;
export const MAX_TEXTURE_SIZE: GLenum = 0x0D33;
export const MAX_VIEWPORT_DIMS: GLenum = 0x0D3A;
export const SUBPIXEL_BITS: GLenum = 0x0D50;
export const RED_BITS: GLenum = 0x0D52;
export const GREEN_BITS: GLenum = 0x0D53;
export const BLUE_BITS: GLenum = 0x0D54;
export const ALPHA_BITS: GLenum = 0x0D55;
export const DEPTH_BITS: GLenum = 0x0D56;
export const STENCIL_BITS: GLenum = 0x0D57;
export const POLYGON_OFFSET_UNITS: GLenum = 0x2A00;
/*      POLYGON_OFFSET_FILL */
export const POLYGON_OFFSET_FACTOR: GLenum = 0x8038;
export const TEXTURE_BINDING_2D: GLenum = 0x8069;
export const SAMPLE_BUFFERS: GLenum = 0x80A8;
export const SAMPLES: GLenum = 0x80A9;
export const SAMPLE_COVERAGE_VALUE: GLenum = 0x80AA;
export const SAMPLE_COVERAGE_INVERT: GLenum = 0x80AB;

/* GetTextureParameter */
/*      TEXTURE_MAG_FILTER */
/*      TEXTURE_MIN_FILTER */
/*      TEXTURE_WRAP_S */
/*      TEXTURE_WRAP_T */

export const COMPRESSED_TEXTURE_FORMATS: GLenum = 0x86A3;

/* HintMode */
export const DONT_CARE: GLenum = 0x1100;
export const FASTEST: GLenum = 0x1101;
export const NICEST: GLenum = 0x1102;

/* HintTarget */
export const GENERATE_MIPMAP_HINT: GLenum = 0x8192;

/* DataType */
export const BYTE: GLenum = 0x1400;
export const UNSIGNED_BYTE: GLenum = 0x1401;
export const SHORT: GLenum = 0x1402;
export const UNSIGNED_SHORT: GLenum = 0x1403;
export const INT: GLenum = 0x1404;
export const UNSIGNED_INT: GLenum = 0x1405;
export const FLOAT: GLenum = 0x1406;

/* PixelFormat */
export const DEPTH_COMPONENT: GLenum = 0x1902;
export const ALPHA: GLenum = 0x1906;
export const RGB: GLenum = 0x1907;
export const RGBA: GLenum = 0x1908;
export const LUMINANCE: GLenum = 0x1909;
export const LUMINANCE_ALPHA: GLenum = 0x190A;

/* PixelType */
/*      UNSIGNED_BYTE */
export const UNSIGNED_SHORT_4_4_4_4: GLenum = 0x8033;
export const UNSIGNED_SHORT_5_5_5_1: GLenum = 0x8034;
export const UNSIGNED_SHORT_5_6_5: GLenum = 0x8363;

/* Shaders */
export const FRAGMENT_SHADER: GLenum = 0x8B30;
export const VERTEX_SHADER: GLenum = 0x8B31;
export const MAX_VERTEX_ATTRIBS: GLenum = 0x8869;
export const MAX_VERTEX_UNIFORM_VECTORS: GLenum = 0x8DFB;
export const MAX_VARYING_VECTORS: GLenum = 0x8DFC;
export const MAX_COMBINED_TEXTURE_IMAGE_UNITS: GLenum = 0x8B4D;
export const MAX_VERTEX_TEXTURE_IMAGE_UNITS: GLenum = 0x8B4C;
export const MAX_TEXTURE_IMAGE_UNITS: GLenum = 0x8872;
export const MAX_FRAGMENT_UNIFORM_VECTORS: GLenum = 0x8DFD;
export const SHADER_TYPE: GLenum = 0x8B4F;
export const DELETE_STATUS: GLenum = 0x8B80;
export const LINK_STATUS: GLenum = 0x8B82;
export const VALIDATE_STATUS: GLenum = 0x8B83;
export const ATTACHED_SHADERS: GLenum = 0x8B85;
export const ACTIVE_UNIFORMS: GLenum = 0x8B86;
export const ACTIVE_ATTRIBUTES: GLenum = 0x8B89;
export const SHADING_LANGUAGE_VERSION: GLenum = 0x8B8C;
export const CURRENT_PROGRAM: GLenum = 0x8B8D;

/* StencilFunction */
export const NEVER: GLenum = 0x0200;
export const LESS: GLenum = 0x0201;
export const EQUAL: GLenum = 0x0202;
export const LEQUAL: GLenum = 0x0203;
export const GREATER: GLenum = 0x0204;
export const NOTEQUAL: GLenum = 0x0205;
export const GEQUAL: GLenum = 0x0206;
export const ALWAYS: GLenum = 0x0207;

/* StencilOp */
/*      ZERO */
export const KEEP: GLenum = 0x1E00;
export const REPLACE: GLenum = 0x1E01;
export const INCR: GLenum = 0x1E02;
export const DECR: GLenum = 0x1E03;
export const INVERT: GLenum = 0x150A;
export const INCR_WRAP: GLenum = 0x8507;
export const DECR_WRAP: GLenum = 0x8508;

/* StringName */
export const VENDOR: GLenum = 0x1F00;
export const RENDERER: GLenum = 0x1F01;
export const VERSION: GLenum = 0x1F02;

/* TextureMagFilter */
export const NEAREST: GLenum = 0x2600;
export const LINEAR: GLenum = 0x2601;

/* TextureMinFilter */
/*      NEAREST */
/*      LINEAR */
export const NEAREST_MIPMAP_NEAREST: GLenum = 0x2700;
export const LINEAR_MIPMAP_NEAREST: GLenum = 0x2701;
export const NEAREST_MIPMAP_LINEAR: GLenum = 0x2702;
export const LINEAR_MIPMAP_LINEAR: GLenum = 0x2703;

/* TextureParameterName */
export const TEXTURE_MAG_FILTER: GLenum = 0x2800;
export const TEXTURE_MIN_FILTER: GLenum = 0x2801;
export const TEXTURE_WRAP_S: GLenum = 0x2802;
export const TEXTURE_WRAP_T: GLenum = 0x2803;

/* TextureTarget */
export const TEXTURE_2D: GLenum = 0x0DE1;
export const TEXTURE: GLenum = 0x1702;

export const TEXTURE_CUBE_MAP: GLenum = 0x8513;
export const TEXTURE_BINDING_CUBE_MAP: GLenum = 0x8514;
export const TEXTURE_CUBE_MAP_POSITIVE_X: GLenum = 0x8515;
export const TEXTURE_CUBE_MAP_NEGATIVE_X: GLenum = 0x8516;
export const TEXTURE_CUBE_MAP_POSITIVE_Y: GLenum = 0x8517;
export const TEXTURE_CUBE_MAP_NEGATIVE_Y: GLenum = 0x8518;
export const TEXTURE_CUBE_MAP_POSITIVE_Z: GLenum = 0x8519;
export const TEXTURE_CUBE_MAP_NEGATIVE_Z: GLenum = 0x851A;
export const MAX_CUBE_MAP_TEXTURE_SIZE: GLenum = 0x851C;

/* TextureUnit */
export const TEXTURE0: GLenum = 0x84C0;
export const TEXTURE1: GLenum = 0x84C1;
export const TEXTURE2: GLenum = 0x84C2;
export const TEXTURE3: GLenum = 0x84C3;
export const TEXTURE4: GLenum = 0x84C4;
export const TEXTURE5: GLenum = 0x84C5;
export const TEXTURE6: GLenum = 0x84C6;
export const TEXTURE7: GLenum = 0x84C7;
export const TEXTURE8: GLenum = 0x84C8;
export const TEXTURE9: GLenum = 0x84C9;
export const TEXTURE10: GLenum = 0x84CA;
export const TEXTURE11: GLenum = 0x84CB;
export const TEXTURE12: GLenum = 0x84CC;
export const TEXTURE13: GLenum = 0x84CD;
export const TEXTURE14: GLenum = 0x84CE;
export const TEXTURE15: GLenum = 0x84CF;
export const TEXTURE16: GLenum = 0x84D0;
export const TEXTURE17: GLenum = 0x84D1;
export const TEXTURE18: GLenum = 0x84D2;
export const TEXTURE19: GLenum = 0x84D3;
export const TEXTURE20: GLenum = 0x84D4;
export const TEXTURE21: GLenum = 0x84D5;
export const TEXTURE22: GLenum = 0x84D6;
export const TEXTURE23: GLenum = 0x84D7;
export const TEXTURE24: GLenum = 0x84D8;
export const TEXTURE25: GLenum = 0x84D9;
export const TEXTURE26: GLenum = 0x84DA;
export const TEXTURE27: GLenum = 0x84DB;
export const TEXTURE28: GLenum = 0x84DC;
export const TEXTURE29: GLenum = 0x84DD;
export const TEXTURE30: GLenum = 0x84DE;
export const TEXTURE31: GLenum = 0x84DF;
export const ACTIVE_TEXTURE: GLenum = 0x84E0;

/* TextureWrapMode */
export const REPEAT: GLenum = 0x2901;
export const CLAMP_TO_EDGE: GLenum = 0x812F;
export const MIRRORED_REPEAT: GLenum = 0x8370;

/* Uniform Types */
export const FLOAT_VEC2: GLenum = 0x8B50;
export const FLOAT_VEC3: GLenum = 0x8B51;
export const FLOAT_VEC4: GLenum = 0x8B52;
export const INT_VEC2: GLenum = 0x8B53;
export const INT_VEC3: GLenum = 0x8B54;
export const INT_VEC4: GLenum = 0x8B55;
export const BOOL: GLenum = 0x8B56;
export const BOOL_VEC2: GLenum = 0x8B57;
export const BOOL_VEC3: GLenum = 0x8B58;
export const BOOL_VEC4: GLenum = 0x8B59;
export const FLOAT_MAT2: GLenum = 0x8B5A;
export const FLOAT_MAT3: GLenum = 0x8B5B;
export const FLOAT_MAT4: GLenum = 0x8B5C;
export const SAMPLER_2D: GLenum = 0x8B5E;
export const SAMPLER_CUBE: GLenum = 0x8B60;

/* Vertex Arrays */
export const VERTEX_ATTRIB_ARRAY_ENABLED: GLenum = 0x8622;
export const VERTEX_ATTRIB_ARRAY_SIZE: GLenum = 0x8623;
export const VERTEX_ATTRIB_ARRAY_STRIDE: GLenum = 0x8624;
export const VERTEX_ATTRIB_ARRAY_TYPE: GLenum = 0x8625;
export const VERTEX_ATTRIB_ARRAY_NORMALIZED: GLenum = 0x886A;
export const VERTEX_ATTRIB_ARRAY_POINTER: GLenum = 0x8645;
export const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: GLenum = 0x889F;

/* Shader Source */
export const COMPILE_STATUS: GLenum = 0x8B81;

/* Shader Precision-Specified Types */
export const LOW_FLOAT: GLenum = 0x8DF0;
export const MEDIUM_FLOAT: GLenum = 0x8DF1;
export const HIGH_FLOAT: GLenum = 0x8DF2;
export const LOW_INT: GLenum = 0x8DF3;
export const MEDIUM_INT: GLenum = 0x8DF4;
export const HIGH_INT: GLenum = 0x8DF5;

/* Framebuffer Object. */
export const FRAMEBUFFER: GLenum = 0x8D40;
export const RENDERBUFFER: GLenum = 0x8D41;

export const RGBA4: GLenum = 0x8056;
export const RGB5_A1: GLenum = 0x8057;
export const RGB565: GLenum = 0x8D62;
export const DEPTH_COMPONENT16: GLenum = 0x81A5;
export const STENCIL_INDEX: GLenum = 0x1901;
export const STENCIL_INDEX8: GLenum = 0x8D48;
export const DEPTH_STENCIL: GLenum = 0x84F9;

export const RENDERBUFFER_WIDTH: GLenum = 0x8D42;
export const RENDERBUFFER_HEIGHT: GLenum = 0x8D43;
export const RENDERBUFFER_INTERNAL_FORMAT: GLenum = 0x8D44;
export const RENDERBUFFER_RED_SIZE: GLenum = 0x8D50;
export const RENDERBUFFER_GREEN_SIZE: GLenum = 0x8D51;
export const RENDERBUFFER_BLUE_SIZE: GLenum = 0x8D52;
export const RENDERBUFFER_ALPHA_SIZE: GLenum = 0x8D53;
export const RENDERBUFFER_DEPTH_SIZE: GLenum = 0x8D54;
export const RENDERBUFFER_STENCIL_SIZE: GLenum = 0x8D55;

export const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: GLenum = 0x8CD0;
export const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: GLenum = 0x8CD1;
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: GLenum = 0x8CD2;
export const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: GLenum = 0x8CD3;

export const COLOR_ATTACHMENT0: GLenum = 0x8CE0;
export const DEPTH_ATTACHMENT: GLenum = 0x8D00;
export const STENCIL_ATTACHMENT: GLenum = 0x8D20;
export const DEPTH_STENCIL_ATTACHMENT: GLenum = 0x821A;

export const NONE: GLenum = 0;

export const FRAMEBUFFER_COMPLETE: GLenum = 0x8CD5;
export const FRAMEBUFFER_INCOMPLETE_ATTACHMENT: GLenum = 0x8CD6;
export const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: GLenum = 0x8CD7;
export const FRAMEBUFFER_INCOMPLETE_DIMENSIONS: GLenum = 0x8CD9;
export const FRAMEBUFFER_UNSUPPORTED: GLenum = 0x8CDD;

export const FRAMEBUFFER_BINDING: GLenum = 0x8CA6;
export const RENDERBUFFER_BINDING: GLenum = 0x8CA7;
export const MAX_RENDERBUFFER_SIZE: GLenum = 0x84E8;

export const INVALID_FRAMEBUFFER_OPERATION: GLenum = 0x0506;

/* WebGL-specific enums */
export const UNPACK_FLIP_Y_WEBGL: GLenum = 0x9240;
export const UNPACK_PREMULTIPLY_ALPHA_WEBGL: GLenum = 0x9241;
export const CONTEXT_LOST_WEBGL: GLenum = 0x9242;
export const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
export const BROWSER_DEFAULT_WEBGL: GLenum = 0x9244;

//type HTMLCanvasElement = externref;

//export declare function getCanvas(gl: WebGLRenderingContextId): HTMLCanvasElement;
export declare function getDrawingBufferWidth(gl: WebGLRenderingContextId): GLsizei;
export declare function getDrawingBufferHeight(gl: WebGLRenderingContextId): GLsizei;

export declare function getContextAttributes(gl: WebGLRenderingContextId): WebGLContextAttributes;
export declare function isContextLost(gl: WebGLRenderingContextId): bool;

type sequence<T> = externref;

export declare function getSupportedExtensions(gl: WebGLRenderingContextId): sequence<string>;

type object_ = externref;

export declare function getExtension(gl: WebGLRenderingContextId, name: string): object_;

// THIS WILL BE IN INDEX INTO A PROGRAM LIST KEPT IN THE JS
export type WebGLProgram = i32; //externref;
export type WebGLShader = i32;
export type WebGLBuffer = i32;
export type WebGLFramebuffer = i32;
export type WebGLRenderbuffer = i32;
export type WebGLTexture = i32;

export declare function activeTexture(gl: WebGLRenderingContextId, texture: GLenum): void;
export declare function createContextFromCanvas(canvas_id: string, context_type: string): WebGLRenderingContextId;
export declare function attachShader(gl: WebGLRenderingContextId, program: WebGLProgram, shader: WebGLShader): void;
// export declare function bindAttribLocation(gl: WebGLRenderingContextId, program: WebGLProgram, index: GLuint, name: string): void;
export declare function bindBuffer(gl: WebGLRenderingContextId, target: GLenum, buffer: WebGLBuffer): void;
export declare function bindFramebuffer(gl: WebGLRenderingContextId, target: GLenum, framebuffer: WebGLFramebuffer): void;
export declare function bindRenderbuffer(gl: WebGLRenderingContextId, target: GLenum, renderbuffer: WebGLRenderbuffer): void;
export declare function bindTexture(gl: WebGLRenderingContextId, target: GLenum, texture: WebGLTexture): void;
export declare function blendColor(gl: WebGLRenderingContextId, red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
export declare function blendEquation(gl: WebGLRenderingContextId, mode: GLenum): void;
export declare function blendEquationSeparate(gl: WebGLRenderingContextId, modeRGB: GLenum, modeAlpha: GLenum): void;
export declare function blendFunc(gl: WebGLRenderingContextId, sfactor: GLenum, dfactor: GLenum): void;
export declare function blendFuncSeparate(gl: WebGLRenderingContextId, srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void;
export declare function bufferData<T>(gl: WebGLRenderingContextId, target: GLenum, data: StaticArray<T>, usage: GLenum): void;
export declare function bufferSubData<T>(gl: WebGLRenderingContextId, target: GLenum, offset: GLintptr, data: Array<T>): void;

export declare function checkFramebufferStatus(gl: WebGLRenderingContextId, target: GLenum): GLenum;
export declare function clear(gl: WebGLRenderingContextId, mask: GLbitfield): void;
export declare function clearColor(gl: WebGLRenderingContextId, red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void;
export declare function clearDepth(gl: WebGLRenderingContextId, depth: GLclampf): void;
export declare function clearStencil(gl: WebGLRenderingContextId, s: GLint): void;
export declare function colorMask(gl: WebGLRenderingContextId, red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void;
export declare function compileShader(gl: WebGLRenderingContextId, shader: WebGLShader): void;

export declare function compressedTexImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, data: ArrayBufferView): void;
export declare function compressedTexSubImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, data: ArrayBufferView): void;

export declare function copyTexImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void;
export declare function copyTexSubImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

export declare function createBuffer(gl: WebGLRenderingContextId): WebGLBuffer;
export declare function createFramebuffer(gl: WebGLRenderingContextId): WebGLFramebuffer;
export declare function createProgram(gl: WebGLRenderingContextId): WebGLProgram;
export declare function createRenderbuffer(gl: WebGLRenderingContextId): WebGLRenderbuffer;
export declare function createShader(gl: WebGLRenderingContextId, typ: GLenum): WebGLShader;
export declare function createTexture(gl: WebGLRenderingContextId): WebGLTexture;

export declare function cullFace(gl: WebGLRenderingContextId, mode: GLenum): void;
//...

export declare function deleteBuffer(gl: WebGLRenderingContextId, buffer: WebGLBuffer): void;
export declare function deleteFramebuffer(gl: WebGLRenderingContextId, framebuffer: WebGLFramebuffer): void;
export declare function deleteProgram(gl: WebGLRenderingContextId, program: WebGLProgram): void;
export declare function deleteRenderbuffer(gl: WebGLRenderingContextId, renderbuffer: WebGLRenderbuffer): void;
export declare function deleteShader(gl: WebGLRenderingContextId, shader: WebGLShader): void;
export declare function deleteTexture(gl: WebGLRenderingContextId, texture: WebGLTexture): void;

export declare function depthFunc(gl: WebGLRenderingContextId, func: GLenum): void;
export declare function depthMask(gl: WebGLRenderingContextId, flag: GLboolean): void;
export declare function depthRange(gl: WebGLRenderingContextId, zNear: GLclampf, zFar: GLclampf): void;
export declare function detachShader(gl: WebGLRenderingContextId, program: WebGLProgram, shader: WebGLShader): void;
export declare function disable(gl: WebGLRenderingContextId, cap: GLenum): void;
export declare function disableVertexAttribArray(gl: WebGLRenderingContextId, index: GLuint): void;
export declare function drawArrays(gl: WebGLRenderingContextId, mode: GLenum, first: GLint, count: GLsizei): void;
export declare function drawElements(gl: WebGLRenderingContextId, mode: GLenum, count: GLsizei, typ: GLenum, offset: GLintptr): void;

export declare function enable(gl: WebGLRenderingContextId, cap: GLenum): void;
export declare function enableVertexAttribArray(gl: WebGLRenderingContextId, index: GLuint): void;
export declare function finish(gl: WebGLRenderingContextId): void;
export declare function flush(gl: WebGLRenderingContextId): void;
export declare function framebufferRenderbuffer(gl: WebGLRenderingContextId, target: GLenum, attachment: GLenum,
	renderbuffertarget: GLenum,
	renderbuffer: WebGLRenderbuffer): void;
export declare function framebufferTexture2D(gl: WebGLRenderingContextId, target: GLenum, attachment: GLenum, textarget: GLenum,
	texture: WebGLTexture, level: GLint): void;
export declare function frontFace(gl: WebGLRenderingContextId, mode: GLenum): void;

export declare function generateMipmap(gl: WebGLRenderingContextId, target: GLenum): void;

export declare function getActiveAttrib(gl: WebGLRenderingContextId, program: WebGLProgram, index: GLuint): WebGLActiveInfo;
export declare function getActiveUniform(gl: WebGLRenderingContextId, program: WebGLProgram, index: GLuint): WebGLActiveInfo;
export declare function getAttachedShaders(gl: WebGLRenderingContextId, program: WebGLProgram): sequence<WebGLShader>;

export declare function getAttribLocation(gl: WebGLRenderingContextId, program: WebGLProgram, name: string): GLint;

export declare function getBufferParameter(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum): externref; // any
export declare function getParameter(gl: WebGLRenderingContextId, pname: GLenum): externref; // any

export declare function getError(gl: WebGLRenderingContextId): GLenum;

export declare function getFramebufferAttachmentParameter(gl: WebGLRenderingContextId, target: GLenum, attachment: GLenum,
	pname: GLenum): externref; // any
export declare function getProgramParameter(gl: WebGLRenderingContextId, program: WebGLProgram, pname: GLenum): bool; // any
export declare function getProgramInfoLog(gl: WebGLRenderingContextId, program: WebGLProgram): DOMString;
export declare function getRenderbufferParameter(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum): externref; // any
export declare function getShaderParameter(gl: WebGLRenderingContextId, shader: WebGLShader, pname: GLenum): bool; // any
export declare function getShaderPrecisionFormat(gl: WebGLRenderingContextId, shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat;
export declare function getShaderInfoLog(gl: WebGLRenderingContextId, shader: WebGLShader): DOMString;

export declare function getShaderSource(gl: WebGLRenderingContextId, shader: WebGLShader): DOMString;

export declare function getTexParameter(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum): externref; // any

export declare function getUniform(gl: WebGLRenderingContextId, program: WebGLProgram, location: WebGLUniformLocation): externref; // any

export declare function getUniformLocation(gl: WebGLRenderingContextId, program: WebGLProgram, name: string): WebGLUniformLocation;

export declare function getVertexAttrib(gl: WebGLRenderingContextId, index: GLuint, pname: GLenum): externref; // any

export declare function getVertexAttribOffset(gl: WebGLRenderingContextId, index: GLuint, pname: GLenum): GLsizeiptr;

export declare function hint(gl: WebGLRenderingContextId, target: GLenum, mode: GLenum): void;
export declare function isBuffer(gl: WebGLRenderingContextId, buffer: WebGLBuffer): GLboolean;
export declare function isEnabled(gl: WebGLRenderingContextId, cap: GLenum): GLboolean;
export declare function isFramebuffer(gl: WebGLRenderingContextId, framebuffer: WebGLFramebuffer): GLboolean;
export declare function isProgram(gl: WebGLRenderingContextId, program: WebGLProgram): GLboolean;
export declare function isRenderbuffer(gl: WebGLRenderingContextId, renderbuffer: WebGLRenderbuffer): GLboolean;
export declare function isShader(gl: WebGLRenderingContextId, shader: WebGLShader): GLboolean;
export declare function isTexture(gl: WebGLRenderingContextId, texture: WebGLTexture): GLboolean;
export declare function lineWidth(gl: WebGLRenderingContextId, width: GLfloat): void;
export declare function linkProgram(gl: WebGLRenderingContextId, program: WebGLProgram): void;
export declare function pixelStorei(gl: WebGLRenderingContextId, pname: GLenum, param: GLint): void;
export declare function polygonOffset(gl: WebGLRenderingContextId, factor: GLfloat, units: GLfloat): void;

export declare function readPixels(gl: WebGLRenderingContextId, x: GLint, y: GLint, width: GLsizei, height: GLsizei,
	format: GLenum, typ: GLenum, pixels: ArrayBufferView): void;

export declare function renderbufferStorage(gl: WebGLRenderingContextId, target: GLenum, internalformat: GLenum,
	width: GLsizei, height: GLsizei): void;
export declare function sampleCoverage(gl: WebGLRenderingContextId, value: GLclampf, invert: GLboolean): void;
export declare function scissor(gl: WebGLRenderingContextId, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

export declare function shaderSource(gl: WebGLRenderingContextId, shader: WebGLShader, source: string): void;

export declare function stencilFunc(gl: WebGLRenderingContextId, func: GLenum, ref: GLint, mask: GLuint): void;
export declare function stencilFuncSeparate(gl: WebGLRenderingContextId, face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void;
export declare function stencilMask(gl: WebGLRenderingContextId, mask: GLuint): void;
export declare function stencilMaskSeparate(gl: WebGLRenderingContextId, face: GLenum, mask: GLuint): void;
export declare function stencilOp(gl: WebGLRenderingContextId, fail: GLenum, zfail: GLenum, zpass: GLenum): void;
export declare function stencilOpSeparate(gl: WebGLRenderingContextId, face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void;

export declare function texImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, internalformat: GLenum,
	format: GLenum, typ: GLenum, image: ImageData): void;

export declare function texParameterf(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum, param: GLfloat): void;
export declare function texParameteri(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum, param: GLint): void;

export declare function texSubImage2D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint,
	format: GLenum, typ: GLenum, pixels: ImageData): void;

export declare function uniform1f(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLfloat): void;
export declare function uniform1fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLfloat>/*Float32Array*/): void;

export declare function uniform1i(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLint): void;
export declare function uniform1iv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLint>/*Int32Array*/): void;

export declare function uniform2f(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLfloat, y: GLfloat): void;
export declare function uniform2fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLfloat>/*Float32Array*/): void;

export declare function uniform2i(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLint, y: GLint): void;
export declare function uniform2iv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLint> /*Int32Array*/): void;

export declare function uniform3f(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat): void;
export declare function uniform3fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLfloat>/*Float32Array*/): void;

export declare function uniform3i(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint): void;
export declare function uniform3iv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLint>/*Int32Array*/): void;

export declare function uniform4f(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
export declare function uniform4fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLfloat>/*JSFloat32Array*/): void;

export declare function uniform4i(gl: WebGLRenderingContextId, location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint, w: GLint): void;
export declare function uniform4iv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v: StaticArray<GLint>/*JSInt32Array*/): void;

export declare function uniformMatrix2fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: StaticArray<GLfloat>): void;
/*
export declare function uniformMatrix2fv( gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: sequence<GLfloat>): void;
*/
export declare function uniformMatrix3fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: StaticArray<GLfloat>): void;
/*
export declare function uniformMatrix3fv( gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: sequence<GLfloat>): void;
*/
export declare function uniformMatrix4fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: StaticArray<GLfloat>): void;
/*
export declare function uniformMatrix4fv( gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean,
	value: sequence<GLfloat>): void;
*/
export declare function useProgram(gl: WebGLRenderingContextId, program: WebGLProgram): void;
export declare function validateProgram(gl: WebGLRenderingContextId, program: WebGLProgram): void;

export declare function vertexAttrib1f(gl: WebGLRenderingContextId, indx: GLuint, x: GLfloat): void;
export declare function vertexAttrib1fv(gl: WebGLRenderingContextId, indx: GLuint, values: StaticArray<GLfloat>): void;

export declare function vertexAttrib2f(gl: WebGLRenderingContextId, indx: GLuint, x: GLfloat, y: GLfloat): void;
export declare function vertexAttrib2fv(gl: WebGLRenderingContextId, indx: GLuint, values: StaticArray<GLfloat>): void;

export declare function vertexAttrib3f(gl: WebGLRenderingContextId, indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void;
export declare function vertexAttrib3fv(gl: WebGLRenderingContextId, indx: GLuint, values: StaticArray<GLfloat>): void;

export declare function vertexAttrib4f(gl: WebGLRenderingContextId, indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void;
export declare function vertexAttrib4fv(gl: WebGLRenderingContextId, indx: GLuint, values: StaticArray<GLfloat>): void;

export declare function vertexAttribPointer(gl: WebGLRenderingContextId, indx: GLint, size: GLint, typ: GLenum,
	normalized: /*GLboolean*/GLint, stride: GLsizei, offset: GLintptr): void;

export declare function viewport(gl: WebGLRenderingContextId, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

// ... WEBGL 2 ...
/* Buffer objects */
export declare function copyBufferSubData(gl: WebGLRenderingContextId, readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr,
	writeOffset: GLintptr, size: GLsizeiptr): void;

export declare function getBufferSubData(gl: WebGLRenderingContextId, target: GLenum, srcByteOffset: GLintptr, /*[AllowShared]*/ dstBuffer: ArrayBufferView,
	dstOffset: GLuint = 0, length: GLuint = 0): void; //@ts-ignore

/* Framebuffer objects */
export declare function blitFramebuffer(gl: WebGLRenderingContextId, srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint,
	dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void;
export declare function framebufferTextureLayer(gl: WebGLRenderingContextId, target: GLenum, attachment: GLenum, texture: WebGLTexture, level: GLint,
	layer: GLint): void;
export declare function invalidateFramebuffer(gl: WebGLRenderingContextId, target: GLenum, attachments: sequence<GLenum>): void;
export declare function invalidateSubFramebuffer(gl: WebGLRenderingContextId, target: GLenum, attachments: sequence<GLenum>,
	x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
export declare function readBuffer(gl: WebGLRenderingContextId, src: GLenum): void;

/* Renderbuffer objects */
export declare function getInternalformatParameter(gl: WebGLRenderingContextId, target: GLenum, internalformat: GLenum, pname: GLenum): externref; // any
export declare function renderbufferStorageMultisample(gl: WebGLRenderingContextId, target: GLenum, samples: GLsizei, internalformat: GLenum,
	width: GLsizei, height: GLsizei): void;

/* Texture objects */
export declare function texStorage2D(gl: WebGLRenderingContextId, target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei,
	height: GLsizei): void;
export declare function texStorage3D(gl: WebGLRenderingContextId, target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei,
	height: GLsizei, depth: GLsizei): void;

export declare function texImage3D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei,
	depth: GLsizei, border: GLint, format: GLenum, typ: GLenum, pboOffset: GLintptr): void;

export declare function texSubImage3D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint,
	width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, typ: GLenum,
	pboOffset: GLintptr): void;

export declare function copyTexSubImage3D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint,
	x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

export declare function compressedTexImage3D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei,
	height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;

export declare function compressedTexSubImage3D(gl: WebGLRenderingContextId, target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint,
	zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei,
	format: GLenum, imageSize: GLsizei, offset: GLintptr): void;

/* Programs and shaders */
export declare function getFragDataLocation(gl: WebGLRenderingContextId, program: WebGLProgram, name: DOMString): GLint;

/* Uniforms */
export declare function uniform1ui(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v0: GLuint): void;
export declare function uniform2ui(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v0: GLuint, v1: GLuint): void;
export declare function uniform3ui(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint): void;
export declare function uniform4ui(gl: WebGLRenderingContextId, location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;

export declare function uniform1uiv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
	srcLength: GLuint = 0): void;
export declare function uniform2uiv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
	srcLength: GLuint = 0): void;
export declare function uniform3uiv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
	srcLength: GLuint = 0): void;
export declare function uniform4uiv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
	srcLength: GLuint = 0): void;
export declare function uniformMatrix3x2fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;
export declare function uniformMatrix4x2fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;

export declare function uniformMatrix2x3fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;
export declare function uniformMatrix4x3fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;

export declare function uniformMatrix2x4fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;
export declare function uniformMatrix3x4fv(gl: WebGLRenderingContextId, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
	srcOffset: GLuint = 0, srcLength: GLuint = 0): void;

/* Vertex attribs */
export declare function vertexAttribI4i(gl: WebGLRenderingContextId, index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
export declare function vertexAttribI4iv(gl: WebGLRenderingContextId, index: GLuint, values: Int32List): void;
export declare function vertexAttribI4ui(gl: WebGLRenderingContextId, index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
export declare function vertexAttribI4uiv(gl: WebGLRenderingContextId, index: GLuint, values: Uint32List): void;
export declare function vertexAttribIPointer(gl: WebGLRenderingContextId, index: GLuint, size: GLint, typ: GLenum, stride: GLsizei, offset: GLintptr): void;

/* Writing to the drawing buffer */
export declare function vertexAttribDivisor(gl: WebGLRenderingContextId, index: GLuint, divisor: GLuint): void;
export declare function drawArraysInstanced(gl: WebGLRenderingContextId, mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
export declare function drawElementsInstanced(gl: WebGLRenderingContextId, mode: GLenum, count: GLsizei, typ: GLenum, offset: GLintptr, instanceCount: GLsizei): void;
export declare function drawRangeElements(gl: WebGLRenderingContextId, mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, typ: GLenum, offset: GLintptr): void;

/* Multiple Render Targets */
export declare function drawBuffers(gl: WebGLRenderingContextId, buffers: sequence<GLenum>): void;

export declare function clearBufferfv(gl: WebGLRenderingContextId, buffer: GLenum, drawbuffer: GLint, values: Float32List,
	srcOffset: GLuint = 0): void;
export declare function clearBufferiv(gl: WebGLRenderingContextId, buffer: GLenum, drawbuffer: GLint, values: Int32List,
	srcOffset: GLuint = 0): void;
export declare function clearBufferuiv(gl: WebGLRenderingContextId, buffer: GLenum, drawbuffer: GLint, values: Uint32List,
	srcOffset: GLuint = 0): void;

export declare function clearBufferfi(gl: WebGLRenderingContextId, buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void;

/* Query Objects */
export declare function createQuery(gl: WebGLRenderingContextId): WebGLQuery;
export declare function deleteQuery(gl: WebGLRenderingContextId, query: WebGLQuery): void;
/*[WebGLHandlesContextLoss]*/
export declare function isQuery(gl: WebGLRenderingContextId, query: WebGLQuery): GLboolean;
export declare function beginQuery(gl: WebGLRenderingContextId, target: GLenum, query: WebGLQuery): void;
export declare function endQuery(gl: WebGLRenderingContextId, target: GLenum): void;
export declare function getQuery(gl: WebGLRenderingContextId, target: GLenum, pname: GLenum): WebGLQuery;
export declare function getQueryParameter(gl: WebGLRenderingContextId, query: WebGLQuery, pname: GLenum): externref; // any

/* Sampler Objects */
export declare function createSampler(gl: WebGLRenderingContextId): WebGLSampler;
export declare function deleteSampler(gl: WebGLRenderingContextId, sampler: WebGLSampler): void;
/*[WebGLHandlesContextLoss]*/
export declare function isSampler(gl: WebGLRenderingContextId, sampler: WebGLSampler): GLboolean;
export declare function bindSampler(gl: WebGLRenderingContextId, unit: GLuint, sampler: WebGLSampler): void;
export declare function samplerParameteri(gl: WebGLRenderingContextId, sampler: WebGLSampler, pname: GLenum, param: GLint): void;
export declare function samplerParameterf(gl: WebGLRenderingContextId, sampler: WebGLSampler, pname: GLenum, param: GLfloat): void;
export declare function getSamplerParameter(gl: WebGLRenderingContextId, sampler: WebGLSampler, pname: GLenum): externref; // any

/* Sync objects */
export declare function fenceSync(gl: WebGLRenderingContextId, condition: GLenum, flags: GLbitfield): WebGLSync;
/*[WebGLHandlesContextLoss]*/
export declare function isSync(gl: WebGLRenderingContextId, sync: WebGLSync): GLboolean;
export declare function deleteSync(gl: WebGLRenderingContextId, sync: WebGLSync): void;
export declare function clientWaitSync(gl: WebGLRenderingContextId, sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum;
export declare function waitSync(gl: WebGLRenderingContextId, sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void;
export declare function getSyncParameter(gl: WebGLRenderingContextId, sync: WebGLSync, pname: GLenum): externref; // any

/* Transform Feedback */
export declare function createTransformFeedback(gl: WebGLRenderingContextId): WebGLTransformFeedback;
export declare function deleteTransformFeedback(gl: WebGLRenderingContextId, tf: WebGLTransformFeedback): void;
/*[WebGLHandlesContextLoss]*/
export declare function isTransformFeedback(gl: WebGLRenderingContextId, tf: WebGLTransformFeedback): GLboolean;
export declare function bindTransformFeedback(gl: WebGLRenderingContextId, target: GLenum, tf: WebGLTransformFeedback): void;
export declare function beginTransformFeedback(gl: WebGLRenderingContextId, primitiveMode: GLenum): void;
export declare function endTransformFeedback(gl: WebGLRenderingContextId): void;
export declare function transformFeedbackVaryings(gl: WebGLRenderingContextId, program: WebGLProgram, varyings: sequence<DOMString>, bufferMode: GLenum): void;
export declare function getTransformFeedbackVarying(gl: WebGLRenderingContextId, program: WebGLProgram, index: GLuint): WebGLActiveInfo;
export declare function pauseTransformFeedback(gl: WebGLRenderingContextId): void;
export declare function resumeTransformFeedback(gl: WebGLRenderingContextId): void;

/* Uniform Buffer Objects and Transform Feedback Buffers */
export declare function bindBufferBase(gl: WebGLRenderingContextId, target: GLenum, index: GLuint, buffer: WebGLBuffer): void;
export declare function bindBufferRange(gl: WebGLRenderingContextId, target: GLenum, index: GLuint, buffer: WebGLBuffer, offset: GLintptr, size: GLsizeiptr): void;
export declare function getIndexedParameter(gl: WebGLRenderingContextId, target: GLenum, index: GLuint): externref; // any
export declare function getUniformIndices(gl: WebGLRenderingContextId, program: WebGLProgram, uniformNames: sequence<DOMString>): sequence<GLuint>;
export declare function getActiveUniforms(gl: WebGLRenderingContextId, program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GLenum): externref; // any
export declare function getUniformBlockIndex(gl: WebGLRenderingContextId, program: WebGLProgram, uniformBlockName: DOMString): GLuint;
export declare function getActiveUniformBlockParameter(gl: WebGLRenderingContextId, program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): externref; // any
export declare function getActiveUniformBlockName(gl: WebGLRenderingContextId, program: WebGLProgram, uniformBlockIndex: GLuint): DOMString;
export declare function uniformBlockBinding(gl: WebGLRenderingContextId, program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;

/* Vertex Array Objects */
export declare function createVertexArray(gl: WebGLRenderingContextId): WebGLVertexArrayObject;
export declare function deleteVertexArray(gl: WebGLRenderingContextId, vertexArray: WebGLVertexArrayObject): void;
/*[WebGLHandlesContextLoss]*/
export declare function isVertexArray(gl: WebGLRenderingContextId, vertexArray: WebGLVertexArrayObject): GLboolean;
export declare function bindVertexArray(gl: WebGLRenderingContextId, array: WebGLVertexArrayObject): void;


@final @unmanaged
export class WebGLRenderingContext {
	gl_id: WebGLRenderingContextId;
	@inline constructor(canvas_id: string, context_type: string) {
		// constructor needs to create the gl_id
		this.gl_id = createContextFromCanvas(canvas_id, context_type);
	}
	/*
	@inline get ptr(): usize {
		return changetype<usize>(this);
	}
	*/
	@inline createImage(image_location: string): ImageData {
		return createImage(image_location);
	}

	@inline imageReady(image_id: ImageData): bool {
		return imageReady(image_id);
	}

	@inline get ALPHA_DEFAULT(): bool {
		return ALPHA_DEFAULT;
	}

	@inline get FALSE(): GLboolean {
		return FALSE;
	}

	@inline getAlpha(): GLboolean {
		return getAlpha(this.gl_id);
	}

	@inline setAlpha(value: GLboolean): void {
		setAlpha(this.gl_id, value);
	}

	@inline get DEPTH_DEFAULT(): bool {
		return DEPTH_DEFAULT;
	}

	@inline getDepth(): GLboolean {
		getDepth(this.gl_id);
	}

	@inline setDepth(value: GLboolean): void {
		setDepth(this.gl_id, value);
	}

	@inline get STENCIL_DEFAULT(): bool {
		return STENCIL_DEFAULT;
	}

	@inline getStencil(): GLboolean {
		getStencil(this.gl_id);
	}

	@inline setStencil(value: GLboolean): void {
		setStencil(this.gl_id, value);
	}

	@inline get ANTIALIAS_DEFAULT(): bool {
		return ANTIALIAS_DEFAULT;
	}

	@inline getAntialias(): GLboolean {
		getAntialias(this.gl_id);
	}

	@inline setAntialias(value: GLboolean): void {
		setAntialias(this.gl_id, value);
	}

	@inline get PREMULTIPLIED_ALPHA_DEFAULT(): bool {
		return PREMULTIPLIED_ALPHA_DEFAULT;
	}

	@inline getPremultipliedAlpha(): GLboolean {
		getPremultipliedAlpha(this.gl_id);
	}

	@inline setPremultipliedAlpha(value: GLboolean): void {
		setPremultipliedAlpha(this.gl_id, value);
	}

	@inline get PRESERVE_DRAWING_BUFFER_DEFAULT(): bool {
		return PRESERVE_DRAWING_BUFFER_DEFAULT;
	}

	@inline getPreserveDrawingBuffer(): GLboolean {
		getPreserveDrawingBuffer(this.gl_id);
	}

	@inline setPreserveDrawingBuffer(value: GLboolean): void {
		setPreserveDrawingBuffer(this.gl_id, value);
	}

	@inline getSize(): GLint {
		return getSize(this.gl_id);
	}

	@inline getType(): GLenum {
		return getType(this.gl_id);
	}

	@inline getName(): string {
		return getName(this.gl_id);
	}

	@inline getRangeMin(): GLint {
		return getRangeMin(this.gl_id);
	}

	@inline getRangeMax(): GLint {
		return getRangeMax(this.gl_id);
	}
	@inline getPrecision(): GLint {
		getPrecision(this.gl_id)
	}

	@inline get DEPTH_BUFFER_BIT(): GLenum {
		return DEPTH_BUFFER_BIT;
	}

	@inline get STENCIL_BUFFER_BIT(): GLenum {
		return STENCIL_BUFFER_BIT;
	}

	@inline get COLOR_BUFFER_BIT(): GLenum {
		return COLOR_BUFFER_BIT;
	}

	@inline get POINTS(): GLenum {
		return POINTS;
	}

	@inline get LINES(): GLenum {
		return LINES;
	}

	@inline get LINE_LOOP(): GLenum {
		return LINE_LOOP;
	}

	@inline get LINE_STRIP(): GLenum {
		return LINE_STRIP;
	}

	@inline get TRIANGLES(): GLenum {
		return TRIANGLES;
	}

	@inline get TRIANGLE_STRIP(): GLenum {
		return TRIANGLE_STRIP;
	}

	@inline get TRIANGLE_FAN(): GLenum {
		return TRIANGLE_FAN;
	}

	@inline get ZERO(): GLenum {
		return ZERO;
	}

	@inline get ONE(): GLenum {
		return ONE;
	}

	@inline get SRC_COLOR(): GLenum {
		return SRC_COLOR;
	}

	@inline get ONE_MINUS_SRC_COLOR(): GLenum {
		return ONE_MINUS_SRC_COLOR;
	}

	@inline get SRC_ALPHA(): GLenum {
		return SRC_ALPHA;
	}

	@inline get ONE_MINUS_SRC_ALPHA(): GLenum {
		return ONE_MINUS_SRC_ALPHA;
	}

	@inline get DST_ALPHA(): GLenum {
		return DST_ALPHA;
	}

	@inline get ONE_MINUS_DST_ALPHA(): GLenum {
		return ONE_MINUS_DST_ALPHA;
	}

	@inline get DST_COLOR(): GLenum {
		return DST_COLOR;
	}

	@inline get ONE_MINUS_DST_COLOR(): GLenum {
		return ONE_MINUS_DST_COLOR;
	}

	@inline get SRC_ALPHA_SATURATE(): GLenum {
		return SRC_ALPHA_SATURATE;
	}

	@inline get FUNC_ADD(): GLenum {
		return FUNC_ADD;
	}

	@inline get BLEND_EQUATION(): GLenum {
		return BLEND_EQUATION;
	}

	@inline get BLEND_EQUATION_RGB(): GLenum {
		return BLEND_EQUATION_RGB;
	}

	@inline get BLEND_EQUATION_ALPHA(): GLenum {
		return BLEND_EQUATION_ALPHA;
	}

	@inline get FUNC_SUBTRACT(): GLenum {
		return FUNC_SUBTRACT;
	}

	@inline get FUNC_REVERSE_SUBTRACT(): GLenum {
		return FUNC_REVERSE_SUBTRACT;
	}

	@inline get BLEND_DST_RGB(): GLenum {
		return BLEND_DST_RGB;
	}

	@inline get BLEND_SRC_RGB(): GLenum {
		return BLEND_SRC_RGB;
	}

	@inline get BLEND_DST_ALPHA(): GLenum {
		return BLEND_DST_ALPHA;
	}

	@inline get BLEND_SRC_ALPHA(): GLenum {
		return BLEND_SRC_ALPHA;
	}

	@inline get CONSTANT_COLOR(): GLenum {
		return CONSTANT_COLOR;
	}

	@inline get ONE_MINUS_CONSTANT_COLOR(): GLenum {
		return ONE_MINUS_CONSTANT_COLOR;
	}

	@inline get CONSTANT_ALPHA(): GLenum {
		return CONSTANT_ALPHA;
	}

	@inline get ONE_MINUS_CONSTANT_ALPHA(): GLenum {
		return ONE_MINUS_CONSTANT_ALPHA;
	}

	@inline get BLEND_COLOR(): GLenum {
		return BLEND_COLOR;
	}

	@inline get ARRAY_BUFFER(): GLenum {
		return ARRAY_BUFFER;
	}

	@inline get ELEMENT_ARRAY_BUFFER(): GLenum {
		return ELEMENT_ARRAY_BUFFER;
	}

	@inline get ARRAY_BUFFER_BINDING(): GLenum {
		return ARRAY_BUFFER_BINDING;
	}

	@inline get ELEMENT_ARRAY_BUFFER_BINDING(): GLenum {
		return ELEMENT_ARRAY_BUFFER_BINDING;
	}

	@inline get STREAM_DRAW(): GLenum {
		return STREAM_DRAW;
	}

	@inline get STATIC_DRAW(): GLenum {
		return STATIC_DRAW;
	}

	@inline get DYNAMIC_DRAW(): GLenum {
		return DYNAMIC_DRAW;
	}

	@inline get BUFFER_SIZE(): GLenum {
		return BUFFER_SIZE;
	}

	@inline get BUFFER_USAGE(): GLenum {
		return BUFFER_USAGE;
	}

	@inline get CURRENT_VERTEX_ATTRIB(): GLenum {
		return CURRENT_VERTEX_ATTRIB;
	}

	@inline get FRONT(): GLenum {
		return FRONT;
	}

	@inline get BACK(): GLenum {
		return BACK;
	}

	@inline get FRONT_AND_BACK(): GLenum {
		return FRONT_AND_BACK;
	}

	@inline get CULL_FACE(): GLenum {
		return CULL_FACE;
	}

	@inline get BLEND(): GLenum {
		return BLEND;
	}

	@inline get DITHER(): GLenum {
		return DITHER;
	}

	@inline get STENCIL_TEST(): GLenum {
		return STENCIL_TEST;
	}

	@inline get DEPTH_TEST(): GLenum {
		return DEPTH_TEST;
	}

	@inline get SCISSOR_TEST(): GLenum {
		return SCISSOR_TEST;
	}

	@inline get POLYGON_OFFSET_FILL(): GLenum {
		return POLYGON_OFFSET_FILL;
	}

	@inline get SAMPLE_ALPHA_TO_COVERAGE(): GLenum {
		return SAMPLE_ALPHA_TO_COVERAGE;
	}

	@inline get SAMPLE_COVERAGE(): GLenum {
		return SAMPLE_COVERAGE;
	}

	@inline get NO_ERROR(): GLenum {
		return NO_ERROR;
	}

	@inline get INVALID_ENUM(): GLenum {
		return INVALID_ENUM;
	}

	@inline get INVALID_VALUE(): GLenum {
		return INVALID_VALUE;
	}

	@inline get INVALID_OPERATION(): GLenum {
		return INVALID_OPERATION;
	}

	@inline get OUT_OF_MEMORY(): GLenum {
		return OUT_OF_MEMORY;
	}

	@inline get CW(): GLenum {
		return CW;
	}

	@inline get CCW(): GLenum {
		return CCW;
	}

	@inline get LINE_WIDTH(): GLenum {
		return LINE_WIDTH;
	}

	@inline get ALIASED_POINT_SIZE_RANGE(): GLenum {
		return ALIASED_POINT_SIZE_RANGE;
	}

	@inline get ALIASED_LINE_WIDTH_RANGE(): GLenum {
		return ALIASED_LINE_WIDTH_RANGE;
	}

	@inline get CULL_FACE_MODE(): GLenum {
		return CULL_FACE_MODE;
	}

	@inline get FRONT_FACE(): GLenum {
		return FRONT_FACE;
	}

	@inline get DEPTH_RANGE(): GLenum {
		return DEPTH_RANGE;
	}

	@inline get DEPTH_WRITEMASK(): GLenum {
		return DEPTH_WRITEMASK;
	}

	@inline get DEPTH_CLEAR_VALUE(): GLenum {
		return DEPTH_CLEAR_VALUE;
	}

	@inline get DEPTH_FUNC(): GLenum {
		return DEPTH_FUNC;
	}

	@inline get STENCIL_CLEAR_VALUE(): GLenum {
		return STENCIL_CLEAR_VALUE;
	}

	@inline get STENCIL_FUNC(): GLenum {
		return STENCIL_FUNC;
	}

	@inline get STENCIL_FAIL(): GLenum {
		return STENCIL_FAIL;
	}

	@inline get STENCIL_PASS_DEPTH_FAIL(): GLenum {
		return STENCIL_PASS_DEPTH_FAIL;
	}

	@inline get STENCIL_PASS_DEPTH_PASS(): GLenum {
		return STENCIL_PASS_DEPTH_PASS;
	}

	@inline get STENCIL_REF(): GLenum {
		return STENCIL_REF;
	}

	@inline get STENCIL_VALUE_MASK(): GLenum {
		return STENCIL_VALUE_MASK;
	}

	@inline get STENCIL_WRITEMASK(): GLenum {
		return STENCIL_WRITEMASK;
	}

	@inline get STENCIL_BACK_FUNC(): GLenum {
		return STENCIL_BACK_FUNC;
	}

	@inline get STENCIL_BACK_FAIL(): GLenum {
		return STENCIL_BACK_FAIL;
	}

	@inline get STENCIL_BACK_PASS_DEPTH_FAIL(): GLenum {
		return STENCIL_BACK_PASS_DEPTH_FAIL;
	}

	@inline get STENCIL_BACK_PASS_DEPTH_PASS(): GLenum {
		return STENCIL_BACK_PASS_DEPTH_PASS;
	}

	@inline get STENCIL_BACK_REF(): GLenum {
		return STENCIL_BACK_REF;
	}

	@inline get STENCIL_BACK_VALUE_MASK(): GLenum {
		return STENCIL_BACK_VALUE_MASK;
	}

	@inline get STENCIL_BACK_WRITEMASK(): GLenum {
		return STENCIL_BACK_WRITEMASK;
	}

	@inline get VIEWPORT(): GLenum {
		return VIEWPORT;
	}

	@inline get SCISSOR_BOX(): GLenum {
		return SCISSOR_BOX;
	}

	@inline get COLOR_CLEAR_VALUE(): GLenum {
		return COLOR_CLEAR_VALUE;
	}

	@inline get COLOR_WRITEMASK(): GLenum {
		return COLOR_WRITEMASK;
	}

	@inline get UNPACK_ALIGNMENT(): GLenum {
		return UNPACK_ALIGNMENT;
	}

	@inline get PACK_ALIGNMENT(): GLenum {
		return PACK_ALIGNMENT;
	}

	@inline get MAX_TEXTURE_SIZE(): GLenum {
		return MAX_TEXTURE_SIZE;
	}

	@inline get MAX_VIEWPORT_DIMS(): GLenum {
		return MAX_VIEWPORT_DIMS;
	}

	@inline get SUBPIXEL_BITS(): GLenum {
		return SUBPIXEL_BITS;
	}

	@inline get RED_BITS(): GLenum {
		return RED_BITS;
	}

	@inline get GREEN_BITS(): GLenum {
		return GREEN_BITS;
	}

	@inline get BLUE_BITS(): GLenum {
		return BLUE_BITS;
	}

	@inline get ALPHA_BITS(): GLenum {
		return ALPHA_BITS;
	}

	@inline get DEPTH_BITS(): GLenum {
		return DEPTH_BITS;
	}

	@inline get STENCIL_BITS(): GLenum {
		return STENCIL_BITS;
	}

	@inline get POLYGON_OFFSET_UNITS(): GLenum {
		return POLYGON_OFFSET_UNITS;
	}

	@inline get POLYGON_OFFSET_FACTOR(): GLenum {
		return POLYGON_OFFSET_FACTOR;
	}

	@inline get TEXTURE_BINDING_2D(): GLenum {
		return TEXTURE_BINDING_2D;
	}

	@inline get SAMPLE_BUFFERS(): GLenum {
		return SAMPLE_BUFFERS;
	}

	@inline get SAMPLES(): GLenum {
		return SAMPLES;
	}

	@inline get SAMPLE_COVERAGE_VALUE(): GLenum {
		return SAMPLE_COVERAGE_VALUE;
	}

	@inline get SAMPLE_COVERAGE_INVERT(): GLenum {
		return SAMPLE_COVERAGE_INVERT;
	}

	@inline get COMPRESSED_TEXTURE_FORMATS(): GLenum {
		return COMPRESSED_TEXTURE_FORMATS;
	}

	@inline get DONT_CARE(): GLenum {
		return DONT_CARE;
	}

	@inline get FASTEST(): GLenum {
		return FASTEST;
	}

	@inline get NICEST(): GLenum {
		return NICEST;
	}

	@inline get GENERATE_MIPMAP_HINT(): GLenum {
		return GENERATE_MIPMAP_HINT;
	}

	@inline get BYTE(): GLenum {
		return BYTE;
	}

	@inline get UNSIGNED_BYTE(): GLenum {
		return UNSIGNED_BYTE;
	}

	@inline get SHORT(): GLenum {
		return SHORT;
	}

	@inline get UNSIGNED_SHORT(): GLenum {
		return UNSIGNED_SHORT;
	}

	@inline get INT(): GLenum {
		return INT;
	}

	@inline get UNSIGNED_INT(): GLenum {
		return UNSIGNED_INT;
	}

	@inline get FLOAT(): GLenum {
		return FLOAT;
	}

	@inline get DEPTH_COMPONENT(): GLenum {
		return DEPTH_COMPONENT;
	}

	@inline get ALPHA(): GLenum {
		return ALPHA;
	}

	@inline get RGB(): GLenum {
		return RGB;
	}

	@inline get RGBA(): GLenum {
		return RGBA;
	}

	@inline get LUMINANCE(): GLenum {
		return LUMINANCE;
	}

	@inline get LUMINANCE_ALPHA(): GLenum {
		return LUMINANCE_ALPHA;
	}

	@inline get UNSIGNED_SHORT_4_4_4_4(): GLenum {
		return UNSIGNED_SHORT_4_4_4_4;
	}

	@inline get UNSIGNED_SHORT_5_5_5_1(): GLenum {
		return UNSIGNED_SHORT_5_5_5_1;
	}

	@inline get UNSIGNED_SHORT_5_6_5(): GLenum {
		return UNSIGNED_SHORT_5_6_5;
	}

	@inline get FRAGMENT_SHADER(): GLenum {
		return FRAGMENT_SHADER;
	}

	@inline get VERTEX_SHADER(): GLenum {
		return VERTEX_SHADER;
	}

	@inline get MAX_VERTEX_ATTRIBS(): GLenum {
		return MAX_VERTEX_ATTRIBS;
	}

	@inline get MAX_VERTEX_UNIFORM_VECTORS(): GLenum {
		return MAX_VERTEX_UNIFORM_VECTORS;
	}

	@inline get MAX_VARYING_VECTORS(): GLenum {
		return MAX_VARYING_VECTORS;
	}

	@inline get MAX_COMBINED_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_COMBINED_TEXTURE_IMAGE_UNITS;
	}

	@inline get MAX_VERTEX_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_VERTEX_TEXTURE_IMAGE_UNITS;
	}

	@inline get MAX_TEXTURE_IMAGE_UNITS(): GLenum {
		return MAX_TEXTURE_IMAGE_UNITS;
	}

	@inline get MAX_FRAGMENT_UNIFORM_VECTORS(): GLenum {
		return MAX_FRAGMENT_UNIFORM_VECTORS;
	}

	@inline get SHADER_TYPE(): GLenum {
		return SHADER_TYPE;
	}

	@inline get DELETE_STATUS(): GLenum {
		return DELETE_STATUS;
	}

	@inline get LINK_STATUS(): GLenum {
		return LINK_STATUS;
	}

	@inline get VALIDATE_STATUS(): GLenum {
		return VALIDATE_STATUS;
	}

	@inline get ATTACHED_SHADERS(): GLenum {
		return ATTACHED_SHADERS;
	}

	@inline get ACTIVE_UNIFORMS(): GLenum {
		return ACTIVE_UNIFORMS;
	}

	@inline get ACTIVE_ATTRIBUTES(): GLenum {
		return ACTIVE_ATTRIBUTES;
	}

	@inline get SHADING_LANGUAGE_VERSION(): GLenum {
		return SHADING_LANGUAGE_VERSION;
	}

	@inline get CURRENT_PROGRAM(): GLenum {
		return CURRENT_PROGRAM;
	}

	@inline get NEVER(): GLenum {
		return NEVER;
	}

	@inline get LESS(): GLenum {
		return LESS;
	}

	@inline get EQUAL(): GLenum {
		return EQUAL;
	}

	@inline get LEQUAL(): GLenum {
		return LEQUAL;
	}

	@inline get GREATER(): GLenum {
		return GREATER;
	}

	@inline get NOTEQUAL(): GLenum {
		return NOTEQUAL;
	}

	@inline get GEQUAL(): GLenum {
		return GEQUAL;
	}

	@inline get ALWAYS(): GLenum {
		return ALWAYS;
	}

	@inline get KEEP(): GLenum {
		return KEEP;
	}

	@inline get REPLACE(): GLenum {
		return REPLACE;
	}

	@inline get INCR(): GLenum {
		return INCR;
	}

	@inline get DECR(): GLenum {
		return DECR;
	}

	@inline get INVERT(): GLenum {
		return INVERT;
	}

	@inline get INCR_WRAP(): GLenum {
		return INCR_WRAP;
	}

	@inline get DECR_WRAP(): GLenum {
		return DECR_WRAP;
	}


	@inline get VENDOR(): GLenum {
		return VENDOR;
	}

	@inline get RENDERER(): GLenum {
		return RENDERER;
	}

	@inline get VERSION(): GLenum {
		return VERSION;
	}

	@inline get NEAREST(): GLenum {
		return NEAREST;
	}

	@inline get LINEAR(): GLenum {
		return LINEAR;
	}

	@inline get NEAREST_MIPMAP_NEAREST(): GLenum {
		return NEAREST_MIPMAP_NEAREST;
	}

	@inline get LINEAR_MIPMAP_NEAREST(): GLenum {
		return LINEAR_MIPMAP_NEAREST;
	}

	@inline get NEAREST_MIPMAP_LINEAR(): GLenum {
		return NEAREST_MIPMAP_LINEAR;
	}

	@inline get LINEAR_MIPMAP_LINEAR(): GLenum {
		return LINEAR_MIPMAP_LINEAR;
	}

	@inline get TEXTURE_MAG_FILTER(): GLenum {
		return TEXTURE_MAG_FILTER;
	}

	@inline get TEXTURE_MIN_FILTER(): GLenum {
		return TEXTURE_MIN_FILTER;
	}

	@inline get TEXTURE_WRAP_S(): GLenum {
		return LINEAR;
	}

	@inline get TEXTURE_WRAP_T(): GLenum {
		return TEXTURE_WRAP_T;
	}

	@inline get TEXTURE_2D(): GLenum {
		return TEXTURE_2D;
	}

	@inline get TEXTURE(): GLenum {
		return TEXTURE;
	}

	@inline get TEXTURE_CUBE_MAP(): GLenum {
		return TEXTURE_CUBE_MAP;
	}

	@inline get TEXTURE_BINDING_CUBE_MAP(): GLenum {
		return TEXTURE_BINDING_CUBE_MAP;
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_X(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_X;
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_X(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_X;
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_Y(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_Y;
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_Y(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_Y;
	}

	@inline get TEXTURE_CUBE_MAP_POSITIVE_Z(): GLenum {
		return TEXTURE_CUBE_MAP_POSITIVE_Z;
	}

	@inline get TEXTURE_CUBE_MAP_NEGATIVE_Z(): GLenum {
		return TEXTURE_CUBE_MAP_NEGATIVE_Z;
	}

	@inline get MAX_CUBE_MAP_TEXTURE_SIZE(): GLenum {
		return MAX_CUBE_MAP_TEXTURE_SIZE;
	}

	@inline get TEXTURE0(): GLenum {
		return TEXTURE0;
	}
	@inline get TEXTURE1(): GLenum {
		return TEXTURE1;
	}
	@inline get TEXTURE2(): GLenum {
		return TEXTURE2;
	}
	@inline get TEXTURE3(): GLenum {
		return TEXTURE3;
	}
	@inline get TEXTURE4(): GLenum {
		return TEXTURE4;
	}
	@inline get TEXTURE5(): GLenum {
		return TEXTURE5;
	}
	@inline get TEXTURE6(): GLenum {
		return TEXTURE6;
	}
	@inline get TEXTURE7(): GLenum {
		return TEXTURE7;
	}
	@inline get TEXTURE8(): GLenum {
		return TEXTURE8;
	}
	@inline get TEXTURE9(): GLenum {
		return TEXTURE9;
	}
	//---

	@inline get TEXTURE10(): GLenum {
		return TEXTURE10;
	}
	@inline get TEXTURE11(): GLenum {
		return TEXTURE11;
	}
	@inline get TEXTURE12(): GLenum {
		return TEXTURE12;
	}
	@inline get TEXTURE13(): GLenum {
		return TEXTURE13;
	}
	@inline get TEXTURE14(): GLenum {
		return TEXTURE14;
	}
	@inline get TEXTURE15(): GLenum {
		return TEXTURE15;
	}
	@inline get TEXTURE16(): GLenum {
		return TEXTURE16;
	}
	@inline get TEXTURE17(): GLenum {
		return TEXTURE17;
	}
	@inline get TEXTURE18(): GLenum {
		return TEXTURE18;
	}
	@inline get TEXTURE19(): GLenum {
		return TEXTURE19;
	}
	// --
	@inline get TEXTURE20(): GLenum {
		return TEXTURE20;
	}
	@inline get TEXTURE21(): GLenum {
		return TEXTURE21;
	}
	@inline get TEXTURE22(): GLenum {
		return TEXTURE22;
	}
	@inline get TEXTURE23(): GLenum {
		return TEXTURE23;
	}
	@inline get TEXTURE24(): GLenum {
		return TEXTURE24;
	}
	@inline get TEXTURE25(): GLenum {
		return TEXTURE25;
	}
	@inline get TEXTURE26(): GLenum {
		return TEXTURE26;
	}
	@inline get TEXTURE27(): GLenum {
		return TEXTURE27;
	}
	@inline get TEXTURE28(): GLenum {
		return TEXTURE28;
	}
	@inline get TEXTURE29(): GLenum {
		return TEXTURE29;
	}

	@inline get TEXTURE30(): GLenum {
		return TEXTURE30;
	}
	@inline get TEXTURE31(): GLenum {
		return TEXTURE31;
	}

	@inline get ACTIVE_TEXTURE(): GLenum {
		return ACTIVE_TEXTURE;
	}

	@inline get REPEAT(): GLenum {
		return REPEAT;
	}

	@inline get CLAMP_TO_EDGE(): GLenum {
		return CLAMP_TO_EDGE;
	}

	@inline get MIRRORED_REPEAT(): GLenum {
		return MIRRORED_REPEAT;
	}

	@inline get FLOAT_VEC2(): GLenum {
		return FLOAT_VEC2;
	}

	@inline get FLOAT_VEC3(): GLenum {
		return FLOAT_VEC3;
	}

	@inline get FLOAT_VEC4(): GLenum {
		return FLOAT_VEC4;
	}

	@inline get INT_VEC2(): GLenum {
		return INT_VEC2;
	}

	@inline get INT_VEC3(): GLenum {
		return INT_VEC3;
	}

	@inline get INT_VEC4(): GLenum {
		return INT_VEC4;
	}

	@inline get BOOL(): GLenum {
		return BOOL;
	}

	@inline get BOOL_VEC2(): GLenum {
		return BOOL_VEC2;
	}

	@inline get BOOL_VEC3(): GLenum {
		return REPEAT;
	}

	@inline get BOOL_VEC4(): GLenum {
		return BOOL_VEC4;
	}

	@inline get FLOAT_MAT2(): GLenum {
		return FLOAT_MAT2;
	}

	@inline get FLOAT_MAT3(): GLenum {
		return FLOAT_MAT3;
	}

	@inline get FLOAT_MAT4(): GLenum {
		return FLOAT_MAT4;
	}

	@inline get SAMPLER_2D(): GLenum {
		return SAMPLER_2D;
	}

	@inline get SAMPLER_CUBE(): GLenum {
		return SAMPLER_CUBE;
	}

	@inline get VERTEX_ATTRIB_ARRAY_ENABLED(): GLenum {
		return VERTEX_ATTRIB_ARRAY_ENABLED;
	}

	@inline get VERTEX_ATTRIB_ARRAY_SIZE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_SIZE;
	}

	@inline get VERTEX_ATTRIB_ARRAY_STRIDE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_STRIDE;
	}

	@inline get VERTEX_ATTRIB_ARRAY_TYPE(): GLenum {
		return VERTEX_ATTRIB_ARRAY_TYPE;
	}

	@inline get VERTEX_ATTRIB_ARRAY_NORMALIZED(): GLenum {
		return VERTEX_ATTRIB_ARRAY_NORMALIZED;
	}

	@inline get VERTEX_ATTRIB_ARRAY_POINTER(): GLenum {
		return VERTEX_ATTRIB_ARRAY_POINTER;
	}

	@inline get VERTEX_ATTRIB_ARRAY_BUFFER_BINDING(): GLenum {
		return VERTEX_ATTRIB_ARRAY_BUFFER_BINDING;
	}

	@inline get COMPILE_STATUS(): GLenum {
		return COMPILE_STATUS;
	}

	@inline get LOW_FLOAT(): GLenum {
		return LOW_FLOAT;
	}

	@inline get MEDIUM_FLOAT(): GLenum {
		return MEDIUM_FLOAT;
	}

	@inline get HIGH_FLOAT(): GLenum {
		return HIGH_FLOAT;
	}

	@inline get LOW_INT(): GLenum {
		return LOW_INT;
	}

	@inline get MEDIUM_INT(): GLenum {
		return MEDIUM_INT;
	}

	@inline get HIGH_INT(): GLenum {
		return HIGH_INT;
	}

	@inline get FRAMEBUFFER(): GLenum {
		return FRAMEBUFFER;
	}

	@inline get RENDERBUFFER(): GLenum {
		return RENDERBUFFER;
	}

	@inline get RGBA4(): GLenum {
		return RGBA4;
	}

	@inline get RGB5_A1(): GLenum {
		return RGB5_A1;
	}

	@inline get RGB565(): GLenum {
		return RGB565;
	}

	@inline get DEPTH_COMPONENT16(): GLenum {
		return DEPTH_COMPONENT16;
	}

	@inline get STENCIL_INDEX(): GLenum {
		return STENCIL_INDEX;
	}

	@inline get STENCIL_INDEX8(): GLenum {
		return STENCIL_INDEX8;
	}

	@inline get DEPTH_STENCIL(): GLenum {
		return DEPTH_STENCIL;
	}

	@inline get RENDERBUFFER_WIDTH(): GLenum {
		return RENDERBUFFER_WIDTH;
	}

	@inline get RENDERBUFFER_HEIGHT(): GLenum {
		return RENDERBUFFER_HEIGHT;
	}

	@inline get RENDERBUFFER_INTERNAL_FORMAT(): GLenum {
		return RENDERBUFFER_INTERNAL_FORMAT;
	}

	@inline get RENDERBUFFER_RED_SIZE(): GLenum {
		return RENDERBUFFER_RED_SIZE;
	}

	@inline get RENDERBUFFER_GREEN_SIZE(): GLenum {
		return RENDERBUFFER_GREEN_SIZE;
	}

	@inline get RENDERBUFFER_BLUE_SIZE(): GLenum {
		return RENDERBUFFER_BLUE_SIZE;
	}

	@inline get RENDERBUFFER_ALPHA_SIZE(): GLenum {
		return RENDERBUFFER_ALPHA_SIZE;
	}

	@inline get RENDERBUFFER_DEPTH_SIZE(): GLenum {
		return RENDERBUFFER_DEPTH_SIZE;
	}

	@inline get RENDERBUFFER_STENCIL_SIZE(): GLenum {
		return RENDERBUFFER_STENCIL_SIZE;
	}

	@inline get FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE;
	}

	@inline get FRAMEBUFFER_ATTACHMENT_OBJECT_NAME(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_OBJECT_NAME;
	}

	@inline get FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL;
	}

	@inline get FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE(): GLenum {
		return FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE;
	}

	@inline get COLOR_ATTACHMENT0(): GLenum {
		return COLOR_ATTACHMENT0;
	}

	@inline get DEPTH_ATTACHMENT(): GLenum {
		return DEPTH_ATTACHMENT;
	}

	@inline get STENCIL_ATTACHMENT(): GLenum {
		return STENCIL_ATTACHMENT;
	}

	@inline get DEPTH_STENCIL_ATTACHMENT(): GLenum {
		return DEPTH_STENCIL_ATTACHMENT;
	}

	@inline get NONE(): GLenum {
		return NONE;
	}

	@inline get FRAMEBUFFER_COMPLETE(): GLenum {
		return FRAMEBUFFER_COMPLETE;
	}

	@inline get FRAMEBUFFER_INCOMPLETE_ATTACHMENT(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_ATTACHMENT;
	}

	@inline get FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT;
	}

	@inline get FRAMEBUFFER_INCOMPLETE_DIMENSIONS(): GLenum {
		return FRAMEBUFFER_INCOMPLETE_DIMENSIONS;
	}

	@inline get FRAMEBUFFER_UNSUPPORTED(): GLenum {
		return FRAMEBUFFER_UNSUPPORTED;
	}

	@inline get FRAMEBUFFER_BINDING(): GLenum {
		return FRAMEBUFFER_BINDING;
	}

	@inline get RENDERBUFFER_BINDING(): GLenum {
		return RENDERBUFFER_BINDING;
	}

	@inline get MAX_RENDERBUFFER_SIZE(): GLenum {
		return MAX_RENDERBUFFER_SIZE;
	}

	@inline get INVALID_FRAMEBUFFER_OPERATION(): GLenum {
		return INVALID_FRAMEBUFFER_OPERATION;
	}

	@inline get UNPACK_FLIP_Y_WEBGL(): GLenum {
		return UNPACK_FLIP_Y_WEBGL;
	}

	@inline get UNPACK_PREMULTIPLY_ALPHA_WEBGL(): GLenum {
		return UNPACK_PREMULTIPLY_ALPHA_WEBGL;
	}

	@inline get CONTEXT_LOST_WEBGL(): GLenum {
		return CONTEXT_LOST_WEBGL;
	}

	@inline get UNPACK_COLORSPACE_CONVERSION_WEBGL(): GLenum {
		return UNPACK_COLORSPACE_CONVERSION_WEBGL;
	}

	@inline get BROWSER_DEFAULT_WEBGL(): GLenum {
		return BROWSER_DEFAULT_WEBGL;
	}

	/*
	@inline getDepth(): GLboolean {
		getDepth(this.gl_id);
	}
	*/

	@inline getDrawingBufferWidth(): GLsizei {
		return getDrawingBufferWidth(this.gl_id);
	}
	@inline getDrawingBufferHeight(): GLsizei {
		return getDrawingBufferHeight(this.gl_id);
	}

	@inline getContextAttributes(gl: WebGLRenderingContext): WebGLContextAttributes {
		return getContextAttributes();
	}
	@inline isContextLost(): bool {
		return isContextLost(this.gl_id);
	}

	@inline getSupportedExtensions(): sequence<string> {
		return getSupportedExtensions(this.gl_id);
	}

	@inline getExtension(name: string): object_ {
		return getExtension(this.gl_id, name);
	}

	@inline activeTexture(texture: GLenum): void {
		activeTexture(this.gl_id, texture);
	}
	@inline createContextFromCanvas(canvas_id: string, context_type: string): WebGLRenderingContext {
		this.gl_id = createContextFromCanvas(canvas_id, context_type);
		return this.gl_id;
	}

	@inline attachShader(program: WebGLProgram, shader: WebGLShader): void {
		attachShader(this.gl_id, program, shader);
	}

	// @inline bindAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, index: GLuint, name: string): void;
	@inline bindBuffer(target: GLenum, buffer: WebGLBuffer): void {
		bindBuffer(this.gl_id, target, buffer);
	}
	@inline bindFramebuffer(target: GLenum, framebuffer: WebGLFramebuffer): void {
		bindFramebuffer(this.gl_id, target, framebuffer);
	}
	@inline bindRenderbuffer(target: GLenum, renderbuffer: WebGLRenderbuffer): void {
		bindRenderbuffer(this.gl_id, target, renderbuffer);
	}
	@inline bindTexture(target: GLenum, texture: WebGLTexture): void {
		bindTexture(this.gl_id, target, texture);
	}
	@inline blendColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
		blendColor(this.gl_id, red, green, blue, alpha);
	}
	@inline blendEquation(mode: GLenum): void {
		blendEquation(this.gl_id, mode);
	}
	@inline blendEquationSeparate(modeRGB: GLenum, modeAlpha: GLenum): void {
		blendEquationSeparate(this.gl_id, modeRGB, modeAlpha);
	}
	@inline blendFunc(sfactor: GLenum, dfactor: GLenum): void {
		blendFunc(this.gl_id, sfactor, dfactor);
	}
	@inline blendFuncSeparate(srcRGB: GLenum, dstRGB: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void {
		blendFuncSeparate(this.gl_id, srcRGB, dstRGB, srcAlpha, dstAlpha);
	}
	@inline bufferData<T>(target: GLenum, data: StaticArray<T>, usage: GLenum): void {
		bufferData<T>(this.gl_id, target, data, usage);
	}
	@inline bufferSubData<T>(target: GLenum, offset: GLintptr, data: Array<T>): void {
		bufferSubData<T>(this.gl_id, target, offset, data)
	}

	@inline checkFramebufferStatus(target: GLenum): GLenum {
		return checkFramebufferStatus(this.gl_id, target);
	}
	@inline clear(mask: GLbitfield): void {
		clear(this.gl_id, mask)
	}

	@inline clearColor(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf): void {
		clearColor(this.gl_id, red, green, blue, alpha);
	}
	@inline clearDepth(depth: GLclampf): void {
		clearDepth(this.gl_id, depth);
	}
	@inline clearStencil(s: GLint): void {
		clearStencil(this.gl_id, s);
	}
	@inline colorMask(red: GLboolean, green: GLboolean, blue: GLboolean, alpha: GLboolean): void {
		colorMask(this.gl_id, red, green, blue, alpha);
	}
	@inline compileShader(shader: WebGLShader): void {
		compileShader(this.gl_id, shader);
	}

	@inline compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, data: ArrayBufferView): void {
		compressedTexImage2D(this.gl_id, target, level, internalformat, width, height, border, data);
	}
	@inline compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, data: ArrayBufferView): void {
		compressedTexSubImage2D(this.gl_id, target, level, xoffset, yoffset, width, height, format, data);
	}

	@inline copyTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, x: GLint, y: GLint, width: GLsizei, height: GLsizei, border: GLint): void {
		copyTexImage2D(this.gl_id, target, level, internalformat, x, y, width, height, border);
	}
	@inline copyTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		copyTexSubImage2D(this.gl_id, target, level, xoffset, yoffset, x, y, width, height);
	}

	@inline createBuffer(): WebGLBuffer {
		return createBuffer(this.gl_id);
	}

	@inline createFramebuffer(): WebGLFramebuffer {
		return createFramebuffer(this.gl_id);
	}

	@inline createProgram(): WebGLProgram {
		return createProgram(this.gl_id);
	}
	@inline createRenderbuffer(): WebGLRenderbuffer {
		return createRenderbuffer(this.gl_id);
	}
	@inline createShader(typ: GLenum): WebGLShader {
		return createShader(this.gl_id, typ);
	}

	@inline createTexture(): WebGLTexture {
		return createTexture(this.gl_id)
	}

	@inline cullFace(mode: GLenum): void {
		cullFace(this.gl_id, mode);
	}

	@inline deleteBuffer(buffer: WebGLBuffer): void {
		deleteBuffer(this.gl_id, buffer);
	}

	@inline deleteFramebuffer(framebuffer: WebGLFramebuffer): void {
		deleteFramebuffer(this.gl_id, framebuffer);
	}

	@inline deleteProgram(program: WebGLProgram): void {
		deleteProgram(this.gl_id, program);
	}

	@inline deleteRenderbuffer(renderbuffer: WebGLRenderbuffer): void {
		deleteRenderbuffer(this.gl_id, renderbuffer);
	}
	@inline deleteShader(shader: WebGLShader): void {
		deleteShader(this.gl_id, shader);
	}
	@inline deleteTexture(texture: WebGLTexture): void {
		deleteTexture(this.gl_id, texture);
	}

	@inline depthFunc(func: GLenum): void {
		depthFunc(this.gl_id, func);
	}
	@inline depthMask(flag: GLboolean): void {
		depthMask(this.gl_id, flag);
	}
	@inline depthRange(zNear: GLclampf, zFar: GLclampf): void {
		depthRange(this.gl_id, zNear, zFar);
	}

	@inline detachShader(program: WebGLProgram, shader: WebGLShader): void {
		detachShader(this.gl_id, program, shader);
	}
	@inline disable(cap: GLenum): void {
		disable(this.gl_id, cap);
	}
	@inline disableVertexAttribArray(index: GLuint): void {
		disableVertexAttribArray(this.gl_id, index);
	}
	@inline drawArrays(mode: GLenum, first: GLint, count: GLsizei): void {
		drawArrays(this.gl_id, mode, first, count)
	}
	@inline drawElements(mode: GLenum, count: GLsizei, typ: GLenum, offset: GLintptr): void {
		drawElements(this.gl_id, mode, count, typ, offset);
	}

	@inline enable(cap: GLenum): void {
		enable(this.gl_id, cap);
	}

	@inline enableVertexAttribArray(index: GLuint): void {
		enableVertexAttribArray(this.gl_id, index);
	}
	@inline finish(): void {
		finish(this.gl_id);
	}
	@inline flush(): void {
		flush(this.gl_id);
	}
	@inline framebufferRenderbuffer(target: GLenum, attachment: GLenum, renderbuffertarget: GLenum, renderbuffer: WebGLRenderbuffer): void {
		framebufferRenderbuffer(this.gl_id, target, attachment, renderbuffertarget, renderbuffer);
	}
	@inline framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: WebGLTexture, level: GLint): void {
		framebufferTexture2D(this.gl_id, target, attachment, textarget, texture, level);
	}
	@inline frontFace(mode: GLenum): void {
		frontFace(this.gl_id, mode);
	}

	@inline generateMipmap(target: GLenum): void {
		generateMipmap(this.gl_id, target)
	}

	@inline getActiveAttrib(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
		return getActiveAttrib(this.gl_id, program, index);
	}
	@inline getActiveUniform(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
		getActiveUniform(this.gl_id, program, index);
	}
	@inline getAttachedShaders(program: WebGLProgram): sequence<WebGLShader> {
		return getAttachedShaders(this.gl_id, program);
	}

	@inline getAttribLocation(program: WebGLProgram, name: string): GLint {
		return getAttribLocation(this.gl_id, program, name);
	}

	@inline getBufferParameter(target: GLenum, pname: GLenum): externref {
		return getBufferParameter(this.gl_id, target, pname);
	}
	@inline getParameter(pname: GLenum): externref {
		return getParameter(this.gl_id, pname);
	}

	@inline getError(): GLenum {
		return getError(this.gl_id);
	}

	@inline getFramebufferAttachmentParameter(target, attachment, pname): externref {
		return getFramebufferAttachmentParameter(this.gl_id, target, attachment, pname);
	}
	@inline getProgramParameter(program: WebGLProgram, pname: GLenum): bool {
		return getProgramParameter(this.gl_id, program, pname);
	}
	@inline getProgramInfoLog(program: WebGLProgram): DOMString {
		return getProgramInfoLog(this.gl_id, program);
	}
	@inline getRenderbufferParameter(target: GLenum, pname: GLenum): externref {
		return getRenderbufferParameter(this.gl_id, target, pname);
	}
	@inline getShaderParameter(shader: WebGLShader, pname: GLenum): bool {
		return getShaderParameter(this.gl_id, shader, pname);
	}
	@inline getShaderPrecisionFormat(shadertype: GLenum, precisiontype: GLenum): WebGLShaderPrecisionFormat {
		return getShaderPrecisionFormat(this.gl_id, shadertype, precisiontype);
	}

	@inline getShaderInfoLog(shader: WebGLShader): DOMString {
		return getShaderInfoLog(this.gl_id, shader);
	}

	@inline getShaderSource(shader: WebGLShader): DOMString {
		return getShaderSource(this.gl_id, shader);
	}

	@inline getTexParameter(target: GLenum, pname: GLenum): externref {
		return getTexParameter(this.gl_id, target, pname);
	}

	@inline getUniform(program: WebGLProgram, location: WebGLUniformLocation): externref {
		return getUniform(this.gl_id, program, location);
	}

	@inline getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation {
		return getUniformLocation(this.gl_id, program, name);
	}

	@inline getVertexAttrib(index: GLuint, pname: GLenum): externref {
		return getVertexAttrib(this.gl_id, index, pname);
	}

	@inline getVertexAttribOffset(index: GLuint, pname: GLenum): GLsizeiptr {
		return getVertexAttribOffset(this.gl_id, index, pname);
	}

	@inline hint(target: GLenum, mode: GLenum): void {
		hint(this.gl_id, target, mode);
	}

	@inline isBuffer(buffer: WebGLBuffer): GLboolean {
		return isBuffer(this.gl_id, buffer);
	}
	@inline isEnabled(cap: GLenum): GLboolean {
		return isEnabled(this.gl_id, cap);
	}
	@inline isFramebuffer(framebuffer: WebGLFramebuffer): GLboolean {
		return isFramebuffer(this.gl_id, framebuffer);
	}
	@inline isProgram(program: WebGLProgram): GLboolean {
		return isProgram(this.gl_id, program);
	}
	@inline isRenderbuffer(renderbuffer: WebGLRenderbuffer): GLboolean {
		isRenderbuffer(this.gl_id, renderbuffer);
	}
	@inline isShader(shader: WebGLShader): GLboolean {
		return isShader(this.gl_id, shader);
	}
	@inline isTexture(texture: WebGLTexture): GLboolean {
		return isTexture(this.gl_id, texture);
	}
	@inline lineWidth(width: GLfloat): void {
		lineWidth(this.gl_id, width);
	}
	@inline linkProgram(program: WebGLProgram): void {
		linkProgram(this.gl_id, program);
	}
	@inline pixelStorei(pname: GLenum, param: GLint): void {
		pixelStorei(this.gl_id, pname, param);
	}
	@inline polygonOffset(factor: GLfloat, units: GLfloat): void {
		polygonOffset(this.gl_id, factor, units);
	}

	@inline readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei,
		format: GLenum, typ: GLenum, pixels: ArrayBufferView): void {
		readPixels(this.gl_id, x, y, width, height, format, typ, pixels);
	}

	@inline renderbufferStorage(target: GLenum, internalformat: GLenum, width: GLsizei, height: GLsizei): void {
		renderbufferStorage(this.gl_id, target, internalformat, width, height);
	}
	@inline sampleCoverage(value: GLclampf, invert: GLboolean): void {
		sampleCoverage(this.gl_id, value, invert);
	}
	@inline scissor(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		scissor(this.gl_id, x, y, width, height);
	}

	@inline shaderSource(shader: WebGLShader, source: string): void {
		shaderSource(this.gl_id, shader, source);
	}

	@inline stencilFunc(func: GLenum, ref: GLint, mask: GLuint): void {
		stencilFunc(this.gl_id, func, ref, mask);
	}
	@inline stencilFuncSeparate(face: GLenum, func: GLenum, ref: GLint, mask: GLuint): void {
		stencilFuncSeparate(this.gl_id, face, func, ref, mask);
	}
	@inline stencilMask(mask: GLuint): void {
		stencilMask(this.gl_id, mask);
	}
	@inline stencilMaskSeparate(face: GLenum, mask: GLuint): void {
		stencilMaskSeparate(this.gl_id, face, mask);
	}
	@inline stencilOp(fail: GLenum, zfail: GLenum, zpass: GLenum): void {
		stencilOp(this.gl_id, fail, zfail, zpass);
	}
	@inline stencilOpSeparate(face: GLenum, fail: GLenum, zfail: GLenum, zpass: GLenum): void {
		stencilOpSeparate(this.gl_id, face, fail, zfail, zpass);
	}

	@inline texImage2D(target: GLenum, level: GLint, internalformat: GLenum,
		format: GLenum, typ: GLenum, image: ImageData): void {
		texImage2D(this.gl_id, target, level, internalformat, format, typ, image);
	}

	@inline texParameterf(target: GLenum, pname: GLenum, param: GLfloat): void {
		texParameterf(this.gl_id, target, pname, param);
	}
	@inline texParameteri(target: GLenum, pname: GLenum, param: GLint): void {
		texParameteri(this.gl_id, target, pname, param);
	}

	@inline texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint,
		format: GLenum, typ: GLenum, pixels: ImageData): void {
		texSubImage2D(this.gl_id, target, level, xoffset, yoffset, format, typ, pixels);
	}

	@inline uniform1f(location: WebGLUniformLocation, x: GLfloat): void {
		uniform1f(this.gl_id, location, x);
	}
	@inline uniform1fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform1fv(this.gl_id, location, v);
	}

	@inline uniform1i(location: WebGLUniformLocation, x: GLint): void {
		uniform1i(this.gl_id, location, x);
	}
	@inline uniform1iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform1iv(this.gl_id, location, v);
	}

	@inline uniform2f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat): void {
		uniform2f(this.gl_id, location, x, y);
	}
	@inline uniform2fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform2fv(this.gl_id, location, v);
	}

	@inline uniform2i(location: WebGLUniformLocation, x: GLint, y: GLint): void {
		uniform2i(this.gl_id, location, x, y);
	}
	@inline uniform2iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform2iv(this.gl_id, location, v);
	}

	@inline uniform3f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat): void {
		uniform3f(this.gl_id, location, x, y, z);
	}
	@inline uniform3fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform3fv(gl, location, v);
	}

	@inline uniform3i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint): void {
		uniform3i(this.gl_id, location, x, y, z);
	}
	@inline uniform3iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform3iv(this.gl_id, location, v);
	}

	@inline uniform4f(location: WebGLUniformLocation, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
		uniform4f(this.gl_id, location, x, y, z, w);
	}

	@inline uniform4fv(location: WebGLUniformLocation, v: StaticArray<GLfloat>): void {
		uniform4fv(this.gl_id, location, v);
	}

	@inline uniform4i(location: WebGLUniformLocation, x: GLint, y: GLint, z: GLint, w: GLint): void {
		uniform4i(this.gl_id, location, x, y, z, w);
	}

	@inline uniform4iv(location: WebGLUniformLocation, v: StaticArray<GLint>): void {
		uniform4iv(this.gl_id, location, v);
	}

	@inline uniformMatrix2fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix2fv(this.gl_id, location, transpose, value);
	}

	@inline uniformMatrix3fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix3fv(this.gl_id, location, transpose, value);
	}

	@inline uniformMatrix4fv(location: WebGLUniformLocation, transpose: GLboolean, value: StaticArray<GLfloat>): void {
		uniformMatrix4fv(this.gl_id, location, transpose, value);
	}
	@inline useProgram(program: WebGLProgram): void {
		useProgram(this.gl_id, program);
	}
	@inline validateProgram(program: WebGLProgram): void {
		validateProgram(this.gl_id, program);
	}

	@inline vertexAttrib1f(indx: GLuint, x: GLfloat): void {
		vertexAttrib1f(this.gl_id, indx, x);
	}

	@inline vertexAttrib1fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib1fv(this.gl_id, indx, values);
	}

	@inline vertexAttrib2f(indx: GLuint, x: GLfloat, y: GLfloat): void {
		vertexAttrib2f(this.gl_id, indx, x, y);
	}

	@inline vertexAttrib2fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib2fv(this.gl_id, indx, values);
	}

	@inline vertexAttrib3f(indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat): void {
		vertexAttrib3f(this.gl_id, indx, x, y, z);
	}
	@inline vertexAttrib3fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib3fv(this.gl_id, indx, values);
	}

	@inline vertexAttrib4f(indx: GLuint, x: GLfloat, y: GLfloat, z: GLfloat, w: GLfloat): void {
		vertexAttrib4f(this.gl_id, indx, x, y, z, w)
	}
	@inline vertexAttrib4fv(indx: GLuint, values: StaticArray<GLfloat>): void {
		vertexAttrib4fv(this.gl_id, indx, values)
	}

	@inline vertexAttribPointer(indx: GLint, size: GLint, typ: GLenum,
		normalized: GLint, stride: GLsizei, offset: GLintptr): void {
		vertexAttribPointer(this.gl_id, indx, size, typ, normalized, stride, offset);
	}

	@inline viewport(x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		viewport(this.gl_id, x, y, width, height);
	}

	@inline copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr,
		writeOffset: GLintptr, size: GLsizeiptr): void {
		copyBufferSubData(this.gl_id, readTarget, writeTarget, readOffset, writeOffset, size);
	}

	@inline getBufferSubData(gl: WebGLRenderingContext, target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView,
		dstOffset: GLuint = 0, length: GLuint = 0): void {
		getBufferSubData(this.gl_id, target, srcByteOffset, dstBuffer, dstOffset, length);
	}

	@inline blitFramebuffer(gl: WebGLRenderingContext, srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint,
		dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint,
		mask: GLbitfield, filter: GLenum): void {
		blitFramebuffer(this.gl_id, srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter);
	}
	@inline framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture, level: GLint, layer: GLint): void {
		framebufferTextureLayer(this.gl_id, target, attachment, texture, level, layer);
	}
	@inline invalidateFramebuffer(target: GLenum, attachments: sequence<GLenum>): void {
		invalidateFramebuffer(this.gl_id, target, attachments);
	}

	@inline invalidateSubFramebuffer(target: GLenum, attachments: sequence<GLenum>,
		x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		invalidateSubFramebuffer(this.gl_id, target, attachments, x, y, width, height);
	}
	@inline readBuffer(src: GLenum): void {
		readBuffer(this.gl_id, src);
	}

	@inline getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): externref {
		getInternalformatParameter(this.gl_id, target, internalformat, pname);
	}
	@inline renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum,
		width: GLsizei, height: GLsizei): void {
		renderbufferStorageMultisample(this.gl_id, target, samples, internalformat, width, height);
	}

	@inline texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void {
		texStorage2D(this.gl_id, target, levels, internalformat, width, height);
	}
	@inline texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei,
		height: GLsizei, depth: GLsizei): void {
		texStorage3D(this.gl_id, target, levels, internalformat, width, height, depth);
	}

	@inline texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei,
		depth: GLsizei, border: GLint, format: GLenum, typ: GLenum, pboOffset: GLintptr): void {
		texImage3D(this.gl_id, target, level, internalformat, width, height, depth, border, format, typ, pboOffset);
	}

	@inline texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint,
		width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, typ: GLenum,
		pboOffset: GLintptr): void {
		texSubImage3D(this.gl_id, target, level, xoffset, yoffset, zoffset,
			width, height, depth, format, typ, pboOffset);
	}

	@inline copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint,
		x: GLint, y: GLint, width: GLsizei, height: GLsizei): void {
		copyTexSubImage3D(this.gl_id, target, level, xoffset, yoffset, zoffset, x, y, width, height);
	}

	@inline compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei,
		height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void {
		compressedTexImage3D(this.gl_id, target, level, internalformat, width, height,
			depth, border, imageSize, offset);
	}

	@inline compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint,
		zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei,
		format: GLenum, imageSize: GLsizei, offset: GLintptr): void {
		compressedTexSubImage3D(this.gl_id, target, level, xoffset, yoffset, zoffset, width, height, depth,
			format, imageSize, offset);
	}

	@inline getFragDataLocation(program: WebGLProgram, name: DOMString): GLint {
		getFragDataLocation(this.gl_id, program, name);
	}

	@inline uniform1ui(location: WebGLUniformLocation, v0: GLuint): void {
		uniform1ui(this.gl_id, location, v0);
	}
	@inline uniform2ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint): void {
		uniform2ui(this.gl_id, location, v0, v1);
	}
	@inline uniform3ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint): void {
		uniform3ui(this.gl_id, location, v0, v1, v2);
	}
	@inline uniform4ui(location: WebGLUniformLocation, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void {
		uniform4ui(this.gl_id, location, v0, v1, v2, v3);
	}

	@inline uniform1uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
		srcLength: GLuint = 0): void {
		uniform1uiv(this.gl_id, location, data, srcOffset, srcLength);
	}

	@inline uniform2uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniform2uiv(this.gl_id, location, data, srcOffset, srcLength);
	}
	@inline uniform3uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniform3uiv(this.gl_id, location, data, srcOffset, srcLength);
	}
	@inline uniform4uiv(location: WebGLUniformLocation, data: Uint32List, srcOffset: GLuint = 0,
		srcLength: GLuint = 0): void {
		uniform4uiv(this.gl_id, location, data, srcOffset, srcLength);
	}
	@inline uniformMatrix3x2fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix3x2fv(this.gl_id, location, transpose, data, srcOffset, srcLength);
	}
	@inline uniformMatrix4x2fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix4x2fv(this.gl_id, location, transpose, data, srcOffset, srcLength);
	}

	@inline uniformMatrix2x3fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix2x3fv(this.gl_id, location, transpose, data, srcOffset, srcLength);
	}
	@inline uniformMatrix4x3fv(gl: WebGLRenderingContext, location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix4x3fv(this.gl_id, location, transpose, data, srcOffset, srcLength);
	}

	@inline uniformMatrix2x4fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix2x4fv(this.gl_id, location, transpose, data, srcOffset, srcLength);
	}
	@inline uniformMatrix3x4fv(location: WebGLUniformLocation, transpose: GLboolean, data: Float32List,
		srcOffset: GLuint = 0, srcLength: GLuint = 0): void {
		uniformMatrix3x4fv(this.gl_id, location, transpose, data,
			srcOffset, srcLength);
	}

	/* Vertex attribs */
	@inline vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void {
		vertexAttribI4i(this.gl_id, index, x, y, z, w)
	}
	@inline vertexAttribI4iv(index: GLuint, values: Int32List): void {
		vertexAttribI4iv(this.gl_id, index, values);
	}
	@inline vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void {
		vertexAttribI4ui(this.gl_id, index, x, y, z, w);
	}
	@inline vertexAttribI4uiv(index: GLuint, values: Uint32List): void {
		vertexAttribI4uiv(this.gl_id, index, values);
	}
	@inline vertexAttribIPointer(index: GLuint, size: GLint, typ: GLenum, stride: GLsizei, offset: GLintptr): void {
		vertexAttribIPointer(this.gl_id, index, size, typ, stride, offset)
	}

	@inline vertexAttribDivisor(index: GLuint, divisor: GLuint): void {
		vertexAttribDivisor(this.gl_id, index, divisor);
	}
	@inline drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void {
		drawArraysInstanced(this.gl_id, mode, first, count, instanceCount);
	}
	@inline drawElementsInstanced(mode: GLenum, count: GLsizei, typ: GLenum, offset: GLintptr, instanceCount: GLsizei): void {
		drawElementsInstanced(this.gl_id, mode, count, typ, offset, instanceCount);
	}
	@inline drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, typ: GLenum, offset: GLintptr): void {
		drawRangeElements(this.gl_id, mode, start, end, count, typ, offset);
	}

	@inline drawBuffers(gl: WebGLRenderingContext, buffers: sequence<GLenum>): void {
		drawBuffers(this.gl_id, buffers);
	}

	@inline clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset: GLuint = 0): void {
		clearBufferfv(this.gl_id, buffer, drawbuffer, values, srcOffset);
	}
	@inline clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List,
		srcOffset: GLuint = 0): void {
		clearBufferiv(this.gl_id, buffer, drawbuffer, values, srcOffset);
	}
	@inline clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List,
		srcOffset: GLuint = 0): void {
		clearBufferuiv(this.gl_id, buffer, drawbuffer, values, srcOffset);
	}

	@inline clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void {
		clearBufferfi(this.gl_id, buffer, drawbuffer, depth, stencil);
	}

	/* Query Objects */
	@inline createQuery(): WebGLQuery {
		return createQuery(this.gl_id);
	}
	@inline deleteQuery(query: WebGLQuery): void {
		deleteQuery(this.gl_id, query);
	}

	@inline isQuery(query: WebGLQuery): GLboolean {
		return isQuery(this.gl_id, query);
	}
	@inline beginQuery(target: GLenum, query: WebGLQuery): void {
		beginQuery(this.gl_id, target, query);
	}
	@inline endQuery(target: GLenum): void {
		endQuery(this.gl_id, target)
	}
	@inline getQuery(target: GLenum, pname: GLenum): WebGLQuery {
		return getQuery(this.gl_id, target, pname);
	}
	@inline getQueryParameter(query: WebGLQuery, pname: GLenum): externref {
		return getQueryParameter(this.gl_id, query, pname);
	}

	@inline createSampler(): WebGLSampler {
		return createSampler(this.gl_id);
	}

	@inline deleteSampler(sampler: WebGLSampler): void {
		deleteSampler(this.gl_id, sampler);
	}

	@inline isSampler(sampler: WebGLSampler): GLboolean {
		return isSampler(this.gl_id, sampler);
	}

	@inline bindSampler(unit: GLuint, sampler: WebGLSampler): void {
		bindSampler(this.gl_id, unit, sampler);
	}
	@inline samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void {
		samplerParameteri(this.gl_id, sampler, pname, param);
	}
	@inline samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void {
		samplerParameterf(this.gl_id, sampler, pname, param);
	}
	@inline getSamplerParameter(sampler: WebGLSampler, pname: GLenum): externref {
		return getSamplerParameter(this.gl_id, sampler, pname);
	}

	/* Sync objects */
	@inline fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync {
		return fenceSync(this.gl_id, condition, flags);
	}
	/*[WebGLHandlesContextLoss]*/
	@inline isSync(sync: WebGLSync): GLboolean {
		return isSync(this.gl_id, sync);
	}

	@inline deleteSync(sync: WebGLSync): void {
		deleteSync(this.gl_id, sync);
	}

	@inline clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum {
		return clientWaitSync(this.gl_id, sync, flags, timeout);
	}
	@inline waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void {
		waitSync(this.gl_id, sync, flags, timeout);
	}
	@inline getSyncParameter(sync: WebGLSync, pname: GLenum): externref {
		return getSyncParameter(this.gl_id, sync, pname);
	}

	@inline createTransformFeedback(): WebGLTransformFeedback {
		return createTransformFeedback(this.gl_id);
	}
	@inline deleteTransformFeedback(tf: WebGLTransformFeedback): void {
		deleteTransformFeedback(this.gl_id, tf);
	}

	@inline isTransformFeedback(tf: WebGLTransformFeedback): GLboolean {
		return isTransformFeedback(this.gl_id, tf);
	}
	@inline bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback): void {
		bindTransformFeedback(this.gl_id, target, tf);
	}
	@inline beginTransformFeedback(primitiveMode: GLenum): void {
		beginTransformFeedback(this.gl_id, primitiveMode);
	}

	@inline endTransformFeedback(): void {
		endTransformFeedback(this.gl_id);
	}

	@inline transformFeedbackVaryings(program: WebGLProgram, varyings: sequence<DOMString>, bufferMode: GLenum): void {
		transformFeedbackVaryings(this.gl_id, program, varyings, bufferMode);
	}
	@inline getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo {
		return getTransformFeedbackVarying(this.gl_id, program, index);
	}
	@inline pauseTransformFeedback(): void {
		pauseTransformFeedback(this.gl_id);
	}

	@inline resumeTransformFeedback(): void {
		resumeTransformFeedback(this.gl_id);
	}

	@inline bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer): void {
		bindBufferBase(this.gl_id, target, index, buffer);
	}
	@inline bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer,
		offset: GLintptr, size: GLsizeiptr): void {
		bindBufferRange(this.gl_id, target, index, buffer, offset, size);
	}
	@inline getIndexedParameter(target: GLenum, index: GLuint): externref {
		return getIndexedParameter(this.gl_id, target, index);
	}
	@inline getUniformIndices(program: WebGLProgram, uniformNames: sequence<DOMString>): sequence<GLuint> {
		return getUniformIndices(this.gl_id, program, uniformNames);
	}
	@inline getActiveUniforms(program: WebGLProgram, uniformIndices: sequence<GLuint>, pname: GLenum): externref {
		return getActiveUniforms(this.gl_id, program, uniformIndices, pname);
	}
	@inline getUniformBlockIndex(program: WebGLProgram, uniformBlockName: DOMString): GLuint {
		return getUniformBlockIndex(this.gl_id, program, uniformBlockName);
	}
	@inline getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): externref {
		return getActiveUniformBlockParameter(this.gl_id, program, uniformBlockIndex, pname);
	}
	@inline getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): DOMString {
		return getActiveUniformBlockName(this.gl_id, program, uniformBlockIndex);
	}
	@inline uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void {
		uniformBlockBinding(this.gl_id, program, uniformBlockIndex, uniformBlockBinding);
	}

	@inline createVertexArray(): WebGLVertexArrayObject {
		return createVertexArray(this.gl_id);
	}
	@inline deleteVertexArray(vertexArray: WebGLVertexArrayObject): void {
		deleteVertexArray(this.gl_id, vertexArray);
	}

	@inline isVertexArray(vertexArray: WebGLVertexArrayObject): GLboolean {
		return isVertexArray(this.gl_id, vertexArray);
	}

	@inline bindVertexArray(array: WebGLVertexArrayObject): void {
		bindVertexArray(this.gl_id, array)
	}

}

//const gl: WebGLRenderingContext = canvas.getContext("webgl");
//gl.compileShader(".....");