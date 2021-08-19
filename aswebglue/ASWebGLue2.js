export function ASWebGLReady(wasm_obj, importObject) {
  console.log("ASWebGLReady");
  if (wasm_obj == null) {
    console.error("ASWebGLReady requires the WebAssembly Instance as 1st parameter");
    return;
  }
  if (wasm_obj == null) {
    console.error("ASWebGLReady requires import object as 2nd parameter");
    return;
  }
  importObject.WebGL.WEBGL_READY = true;
  console.log("=========================");
  console.log(wasm_obj.instance.exports);
  console.log(wasm_obj.instance.exports["__rtti_base"]);
  importObject.WebGL.RTTI_BASE = wasm_obj.instance.exports["__rtti_base"];
}

export function initASWebGLue(importObject) {
  if (importObject.env.memory == null) {
    alert('You need to set memory in your importObject');
  }

  if (importObject.WebGL == null) {
    importObject.WebGL = {};
  }

  const WebGL = importObject.WebGL;

  importObject.env.abort = (...args) => {
    console.log("abort");
    console.log(WebGL.getString(args[0]));
  }


  importObject.WebGL.WEBGL_READY = false;
  importObject.WebGL.memory = importObject.env.memory;

  importObject.WebGL.contextArray = [];
  importObject.WebGL.textureArray = [];
  importObject.WebGL.imageArray = [];
  importObject.WebGL.programArray = [];
  importObject.WebGL.shaderArray = [];
  importObject.WebGL.bufferArray = [];
  importObject.WebGL.frameBufferArray = [];
  importObject.WebGL.renderBufferArray = [];
  importObject.WebGL.uniformLocationArray = [];
  importObject.WebGL.vaoArray = [];

  importObject.WebGL.SIZE_OFFSET = -4;
  importObject.WebGL.ID_OFFSET = -8;
  importObject.WebGL.CHUNKSIZE = 1024;
  importObject.WebGL.STRING_ID = 1;
  importObject.WebGL.RTTI_BASE = 0;
  importObject.WebGL.VAL_ALIGN_OFFSET = 6;

  importObject.ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
  importObject.ARRAY_LENGTH_OFFSET = 12;

  /** No specific flags. */
  importObject.WebGL.NONE = 0x00;
  /** Type is an `ArrayBufferView`. */
  importObject.WebGL.ARRAYBUFFERVIEW = 0x01;
  /** Type is an `Array`. */
  importObject.WebGL.ARRAY = 0x0002;
  /** Type is a `StaticArray`. */
  importObject.WebGL.STATICARRAY = 0x0004;
  /** Type is a `Set`. */
  importObject.WebGL.SET = 0x000008;
  /** Type is a `Map`. */
  importObject.WebGL.MAP = 0x000010;
  /** Type is inherently acyclic. */
  importObject.WebGL.ACYCLIC = 0x000020;
  /** Value alignment of 1 byte. */
  importObject.WebGL.VALUE_ALIGN_0 = 0x000040;
  /** Value alignment of 2 bytes. */
  importObject.WebGL.VALUE_ALIGN_1 = 0x000080;
  /** Value alignment of 4 bytes. */
  importObject.WebGL.VALUE_ALIGN_2 = 0x000100;
  /** Value alignment of 8 bytes. */
  importObject.WebGL.VALUE_ALIGN_3 = 0x000200;
  /** Value alignment of 16 bytes. */
  importObject.WebGL.VALUE_ALIGN_4 = 0x000400;
  /** Value is a signed type. */
  importObject.WebGL.VALUE_SIGNED = 0x000800;
  /** Value is a float type. */
  importObject.WebGL.VALUE_FLOAT = 0x001000;
  /** Value type is nullable. */
  importObject.WebGL.VALUE_NULLABLE = 0x002000;
  /** Value type is managed. */
  importObject.WebGL.VALUE_MANAGED = 0x004000;
  /** Key alignment of 1 byte. */
  importObject.WebGL.KEY_ALIGN_0 = 0x008000;
  /** Key alignment of 2 bytes. */
  importObject.WebGL.KEY_ALIGN_1 = 0x010000;
  /** Key alignment of 4 bytes. */
  importObject.WebGL.KEY_ALIGN_2 = 0x020000;
  /** Key alignment of 8 bytes. */
  importObject.WebGL.KEY_ALIGN_3 = 0x040000;
  /** Key alignment of 16 bytes. */
  importObject.WebGL.KEY_ALIGN_4 = 0x080000;
  /** Key is a signed type. */
  importObject.WebGL.KEY_SIGNED = 0x100000;
  /** Key is a float type. */
  importObject.WebGL.KEY_FLOAT = 0x200000;
  /** Key type is nullable. */
  importObject.WebGL.KEY_NULLABLE = 0x400000;
  /** Key type is managed. */
  importObject.WebGL.KEY_MANAGED = 0x800000;

  //imageArray
  importObject.WebGL.createImage = (image_location) => {
    console.log(`createImage(${image_location})`);
    let image = new Image();
    image.ready = false;
    image.onload = function () {
      image.ready = true;
    }
    image.src = WebGL.getString(image_location);
    console.log(`image.src=${image.src}`);
    let image_id = WebGL.imageArray.length;
    WebGL.imageArray.push(image);
    return image_id;
  }

  // DEBUG STUFF  -----------

  importObject.WebGL.logi32 = (arg) => {
    console.log(`logi32=${arg}`);
  }

  importObject.WebGL.logf32 = (arg) => {
    console.log(`logf32=${arg}`);
  }

  // END DEBUG STUFF --------

  importObject.WebGL.imageReady = (image_id) => {
    console.log("image ready check! image_id=" + image_id);
    if (WebGL.imageArray.length <= image_id) {
      return false;
    }
    return WebGL.imageArray[image_id].ready;
  }

  importObject.WebGL.getView = (alignLog2, signed, float) => {
    const buffer = WebGL.memory.buffer;

    if (float) {
      switch (alignLog2) {
        case 2: return new Float32Array(buffer);
        case 3: return new Float64Array(buffer);
      }
    } else {
      switch (alignLog2) {
        case 0: return new (signed ? Int8Array : Uint8Array)(buffer);
        case 1: return new (signed ? Int16Array : Uint16Array)(buffer);
        case 2: return new (signed ? Int32Array : Uint32Array)(buffer);
        case 3: return new (signed ? BigInt64Array : BigUint64Array)(buffer);
      }
    }
    throw Error("unsupported align: " + alignLog2);
  }

  importObject.WebGL.getArrayInfo = (id) => {
    const info = WebGL.getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    return info;
  }

  importObject.WebGL.getValueAlign = (info) => {
    return 31 - Math.clz32((info >>> VAL_ALIGN_OFFSET) & 31); // -1 if none
  }

  importObject.WebGL.getArrayView = (arr_ptr) => {
    const U32 = new Uint32Array(WebGL.memory.buffer);
    const id = U32[arr_ptr + WebGL.ID_OFFSET >>> 2];

    const count = U32[WebGL.RTTI_BASE >>> 2];

    if (id >= count) throw Error(`invalid id: ${id}`);
    const info = U32[(WebGL.RTTI_BASE + 4 >>> 2) + id * 2];

    if (!(info & (WebGL.ARRAYBUFFERVIEW | WebGL.ARRAY | WebGL.STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    const align = 31 - Math.clz32((info >>> WebGL.VAL_ALIGN_OFFSET) & 31); // -1 if none getValueAlign(info)
    let buf = info & WebGL.STATICARRAY
      ? arr_ptr
      : U32[arr_ptr + WebGL.ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & WebGL.ARRAY
      ? U32[arr_ptr + WebGL.ARRAY_LENGTH_OFFSET >>> 2]
      : U32[buf + WebGL.SIZE_OFFSET >>> 2] >>> align;
    return WebGL.getView(align, info & WebGL.VAL_SIGNED, info & WebGL.VAL_FLOAT)
      .subarray(buf >>>= align, buf + length);

  }

  importObject.WebGL.getString = (string_index) => {
    const buffer = WebGL.memory.buffer;
    const U32 = new Uint32Array(buffer);
    const id_addr = string_index / 4 - 2;
    const id = U32[id_addr];
    if (id !== 0x01) throw Error(`not a string index=${string_index} id=${id}`);
    const len = U32[id_addr + 1];
    const str = new TextDecoder('utf-16').decode(buffer.slice(string_index, string_index + len));
    return str;
  }

  importObject.WebGL.createContextFromCanvas = (canvas_id, context_type) => {
    const canvas = document.getElementById(WebGL.getString(canvas_id));
    const gl = canvas.getContext(WebGL.getString(context_type));
    let id = WebGL.contextArray.findIndex((element) => element == null);

    if (id == -1) {
      id = WebGL.contextArray.length;
      WebGL.contextArray.push(gl);
    }
    else {
      WebGL.contextArray[id] = gl;
    }
    return id;
  }
  /*
  importObject.WebGL.activateTexture = (id, texture) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.activateTexture(WebGL.textureArray[texture]);
  }
  */

  importObject.WebGL.getSupportedExtensions = (ctx) => {
    alert('getSupportedExtensions is not currently supported');
  }

  importObject.WebGL.getExtension = (id, name_string) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getExtension(WebGL.getString(name));
  }

  importObject.WebGL.activeTexture = (id, texture) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.activeTexture(texture);
  }

  importObject.WebGL.attachShader = (id, program, shader) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.attachShader(WebGL.programArray[program], WebGL.shaderArray[shader]);
  }

  importObject.WebGL.bindAttribLocation = (id, program, index, name) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindAttribLocation(WebGL.programArray[program], index, WebGL.getString(name));
  }

  importObject.WebGL.bindBuffer = (id, target, buffer) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindBuffer(target, WebGL.bufferArray[buffer]);
  }

  importObject.WebGL.bindFramebuffer = (id, target, framebuffer) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindFramebuffer(target, WebGL.framebufferArray[framebuffer]);
  }

  importObject.WebGL.bindRenderbuffer = (id, target, renderbuffer) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindRenderbuffer(target, WebGL.renderbufferArray[renderbuffer]);
  }

  importObject.WebGL.bindTexture = (id, target, texture) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindTexture(target, WebGL.textureArray[texture]);
  }

  importObject.WebGL.blendColor = (id, r, g, b, a) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.blendColor(r, g, b, a);
  }

  importObject.WebGL.blendEquation = (id, mode) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.blendEquation(mode);
  }

  importObject.WebGL.blendEquationSeparate = (id, modeRGB, modeAlpha) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.blendEquationSeparate(modeRGB, modeAlpha);
  }

  importObject.WebGL.blendFunc = (id, sfactor, dfactor) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.blendFunc(sfactor, dfactor);
  }

  importObject.WebGL.blendFuncSeparate = (id, srcRGB, dstRGB, srcAlpha, dstAlpha) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
  }

  const bufferdata = (id, target, data, usage) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bufferData(target, WebGL.getArrayView(data), usage);
  }

  importObject.WebGL["bufferData<f32>"] = bufferdata;
  importObject.WebGL["bufferData<f64>"] = bufferdata;
  importObject.WebGL["bufferData<i32>"] = bufferdata;

  // LAST TWO PARAMETERS ARE IN WEBGL 2.0
  importObject.WebGL.bufferSubData = (target, dstByteOffset, srcData, srcOffset, length) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bufferSubData(target, dstByteOffset, WebGL.getArrayView(srcData), srcOffset, length);
  }

  importObject.WebGL.checkFramebufferStatus = (id, target) => {
    return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.checkFramebufferStatus(target);
  }

  // Clears the color, depth and stencil buffers
  importObject.WebGL.clear = (id, mask) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.clear(mask);
  }

  // Specify the color fill a cleared color buffer with
  importObject.WebGL.clearColor = (id, r, g, b, a) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.clearColor(r, g, b, a);
  }

  // Specifies a depth value to fill the depth buffer when it is cleared
  importObject.WebGL.clearDepth = (id, depth) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.clearDepth(depth);
  }

  // Specifies a clear value for the stencil buffer
  importObject.WebGL.clearStencil = (id, s) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.clearStencil(s);
  }

  // Allows you to turn on and off colors when writing to a framebuffer
  importObject.WebGL.colorMask = (id, r, g, b, a) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.colorMask(r, g, b, a);
  }

  // Compiles a GLSL shader to be used by a WebGL program.
  importObject.WebGL.compileShader = (id, shader) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.compileShader(WebGL.shaderArray[shader]);
    var compilationLog = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getShaderInfoLog(WebGL.shaderArray[shader]);
    console.log(compilationLog);
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Secifies a 2D texture image in a compressed format
  importObject.WebGL.compressedTexImage2D = (id, target, level, internalformat, width, height, border, data) => {
    // THIS DOES NOT LOOK RIGHT TO ME
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.compileShader(target, level, internalformat,
      width, height, border, WebGL.getArrayView(data));
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Specifies a 2D sub-image rectangle for a compressed format texture image.
  importObject.WebGL.compressedTexSubImage2D = (id, target, level, xoffset, yoffset, width, height, format, data) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.compressedTexSubImage2D(target, xoffset, yoffset, width, height, format,
      WebGL.getArrayView(data));
  }

  // Copies pixels from the current WebGLFramebuffer into a 2D texture image
  importObject.WebGL.copyTexImage2D = (id, target, level, internalformat, x, y, width, height, border) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.copyTexImage2D(target, level, internalformat, x, y, width, height, border);
  }

  // Copies pixels from the current WebGLFramebuffer into an existing 2D texture sub-image
  importObject.WebGL.copyTexSubImage2D = (id, target, level, xoffset, yoffset, x, y, width, height) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
  }

  // Creates a buffer to hold vertex related data
  importObject.WebGL.createBuffer = (ctx) => {
    let id = WebGL.bufferArray.findIndex((element) => element == null);
    let buffer = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createBuffer();

    if (id == -1) {
      id = WebGL.bufferArray.length;
      WebGL.bufferArray.push(buffer);
    }
    else {
      WebGL.bufferArray[id] = buffer;
    }
    return id;
  }

  // Creates a frame buffer object to be used as a rendering destination
  importObject.WebGL.createFramebuffer = (ctx) => {
    alert(arguments.callee.toString());
  }

  // Creates a WebGL program that consists of a vertex and fragment shader
  importObject.WebGL.createProgram = (ctx) => {
    let id = WebGL.programArray.findIndex((element) => element == null);
    let program = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createProgram();

    if (id == -1) {
      id = WebGL.programArray.length;
      WebGL.programArray.push(program);
    }
    else {
      WebGL.programArray[id] = program;
    }
    return id;
  }

  // Creates a render buffer object that can be used as a source or target for rendering
  importObject.WebGL.createRenderbuffer = (ctx) => {
    try {
      let id = WebGL.renderBufferArray.findIndex((element) => element == null);
      let renderbuffer = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createRenderbuffer();

      if (id == -1) {
        id = WebGL.renderBufferArray.length;
        WebGL.renderBufferArray.push(renderbuffer);
      }
      else {
        WebGL.renderBufferArray[id] = renderbuffer;
      }
      return id;
    } catch (err) {
      console.log("renderBufferArray error");
      console.error(err);
    } // end catch
  }

  // Creates a vertex or fragment shader object to be used when compiling a WebGL program
  importObject.WebGL.createShader = (id, type) => {
    let id = WebGL.shaderArray.findIndex((element) => element == null);
    let shader = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createShader(type);

    if (id == -1) {
      id = WebGL.shaderArray.length;
      WebGL.shaderArray.push(shader);
    }
    else {
      WebGL.shaderArray[id] = shader;
    }
    return id;
  }

  // Creates a texture object
  importObject.WebGL.createTexture = (ctx) => {
    let id = WebGL.textureArray.findIndex((element) => element == null);
    let texture = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createTexture();

    if (id == -1) {
      id = WebGL.textureArray.length;
      WebGL.textureArray.push(texture);
    }
    else {
      WebGL.textureArray[id] = texture;
    }
    return id;
  }

  // Sets the culling mode
  importObject.WebGL.cullFace = (id, mode) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.cullFace(target, mode);
    } catch (err) {
      console.log("cullFace error");
      console.error(err);
    } // end catch
  }

  // delete the buffer object
  importObject.WebGL.deleteBuffer = (id, buffer) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteBuffer(this.bufferArray[buffer]);
      this.bufferArray[buffer] = null;
    } catch (err) {
      console.log("deleteBuffer error");
      console.error(err);
    } // end catch
  }

  // delete the frame buffer object
  importObject.WebGL.deleteFramebuffer = (id, frame_buffer) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteFramebuffer(this.framebufferArray[frame_buffer]);
      this.framebufferArray[frame_buffer] = null;
    } catch (err) {
      console.log("deleteFramebuffer error");
      console.error(err);
    } // end catch
  }

  // delete the render buffer object
  importObject.WebGL.deleteRenderbuffer = (id, render_buffer) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteRenderbuffer(this.renderBufferArray[render_buffer]);
      this.renderBufferArray[render_buffer] = null;
    } catch (err) {
      console.log("deleteRenderbuffer error");
      console.error(err);
    } // end catch
  }

  // delete the program object
  importObject.WebGL.deleteProgram = (id, program) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteProgram(this.programArray[program]);
      this.program[program] = null;
    } catch (err) {
      console.log("deleteProgram error");
      console.error(err);
    } // end catch
  }

  // delete the shader object
  importObject.WebGL.deleteShader = (id, shader) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteShader(this.shaderArray[shader]);
      this.shaderArray[shader] = null;
    } catch (err) {
      console.log("deleteShader error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.deleteTexture = (id, texture) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.deleteShader(this.textureArray[texture]);
      this.textureArray[texture] = null;
    } catch (err) {
      console.log("deleteTexture error");
      console.error(err);
    } // end catch
  }

  // Before calling depthFunc, you must enable DEPTH_TEST
  // This sets the function that tests the incoming pixel depth against a pixel already in the buffer.
  // The default value is LESS, meaning that if an incoming pixel depth is less than existing pixel depth
  // (the new pixel is closer) then the new pixel is drawn.
  importObject.WebGL.depthFunc = (id, func) => { // func is a depth function enumeration
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.depthFunc(func);
    } catch (err) {
      console.log("depthFunc error");
      console.error(err);
    } // end catch
  }

  // enable or disable writing to the depth buffer
  importObject.WebGL.depthMask = (id, flag) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.depthMask(flag);
    } catch (err) {
      console.log("depthMask error");
      console.error(err);
    } // end catch
  }

  // defines the near and far clipping plane in the depth buffer
  importObject.WebGL.depthRange = (id, zNear, zFar) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.depthRange(zNear, zFar);
    } catch (err) {
      console.log("depthRange error");
      console.error(err);
    } // end catch
  }

  // detach the shader currently attached to the program
  importObject.WebGL.detachShader = (id, program, shader) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.detachShader(program, shader);
    } catch (err) {
      console.log("detachShader error");
      console.error(err);
    } // end catch
  }

  // disable a specific WebGL capability
  importObject.WebGL.disable = (id, cap) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.disable(cap);
    } catch (err) {
      console.log("disable error");
      console.error(err);
    } // end catch
  }

  // disables a vertex attribute array at the index loction passed in.
  importObject.WebGL.disableVertexAttribArray = (id, index) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.disableVertexAttribArray(index);
    } catch (err) {
      console.log("disableVertexAttribArray error");
      console.error(err);
    } // end catch
  }

  // render primitive data from array
  importObject.WebGL.drawArrays = (id, mode, first, count) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.drawArrays(mode, first, count);
    } catch (err) {
      console.log("drawArrays error");
      console.error(err);
    } // end catch
  }

  // uses index data to render elements from array data
  importObject.WebGL.drawElements = (id, mode, count, typ, offset) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.drawElements(mode, count, typ, offset);
    } catch (err) {
      console.log("drawElements error");
      console.error(err);
    } // end catch
  }

  // enable a specific WebGL capability
  importObject.WebGL.enable = (id, cap) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.enable(cap);
    } catch (err) {
      console.log("enable error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.enableVertexAttribArray = (id, index) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.enableVertexAttribArray(index);
  }

  // waits for all previously executed WebGL api calls to finish
  importObject.WebGL.finish = (ctx) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.finish();
    } catch (err) {
      console.log("finish error");
      console.error(err);
    } // end catch
  }

  // ???
  importObject.WebGL.flush = (ctx) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.flush();
    } catch (err) {
      console.log("flush error");
      console.error(err);
    } // end catch
  }

  // attach a render buffer to a frame buffer
  importObject.WebGL.framebufferRenderbuffer = (id, target, attachment, renderbuffertarget, renderbuffer) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
    } catch (err) {
      console.log("framebufferRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.framebufferTexture2D = (id, target, attachment, textarget, texture, level) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.framebufferTexture2D(target, attachment, textarget, texture, level);
    } catch (err) {
      console.log("framebufferTexture2D error");
      console.error(err);
    } // end catch
  }

  // set the winding direction of the verticies, which defines the front face
  importObject.WebGL.frontFace = (id, mode) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.frontFace(mode);
    } catch (err) {
      console.log("frontFace error");
      console.error(err);
    } // end catch
  }

  // generates reduced resolution mipmap textures for rendering objects at a distance
  importObject.WebGL.generateMipmap = (id, target) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.generateMipmap(target);
    } catch (err) {
      console.log("generateMipmap error");
      console.error(err);
    } // end catch
  }

  // query information about an attribute of a given program
  importObject.WebGL.getActiveAttrib = (id, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveAttrib is not implemented");
    return 0;
  }

  // query information about a uniform in a given program
  importObject.WebGL.getActiveUniform = (id, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveUniform is not implemented");
    return 0;
  }

  // needs to return an array of WebGL shaders to the AS
  importObject.WebGL.getAttachedShaders = (id, program) => {
    // this will need to return an array of shader indicies.
    alert("getAttachedShaders is not implemented");
    return 0;
  }

  // get an attribute location inside a program given a name
  importObject.WebGL.getAttribLocation = (id, program, name) => {
    return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getAttribLocation(WebGL.programArray[program], WebGL.getString(name));
  }

  // returns an int given a buffer parameter name
  importObject.WebGL.getBufferParameter = (id, target, pname) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getBufferParameter(target, pname);
    } catch (err) {
      console.log("getBufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getParameter = (id, pname) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getParameter(pname);
    } catch (err) {
      console.log("getParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getError = (ctx) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getError();
    } catch (err) {
      console.log("getError error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getFramebufferAttachmentParameter = (id, target, attachment, pname) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getParameter(target, attachment, pname);
    } catch (err) {
      console.log("getFramebufferAttachmentParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getProgramInfoLog = (id, program) => {
    // this needs to return a string to the AS
    alert("getProgramInfoLog not implemented");
    return 0;
  }

  // get information about the renderbuffer
  importObject.WebGL.getRenderbufferParameter = (id, target, pname) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getRenderbufferParameter(target, pname);
    } catch (err) {
      console.log("getRenderbufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getShaderParameter = (id, shader, pname) => {
    alert("getShaderParameter not implemented");
    return 0;
  }

  importObject.WebGL.getShaderPrecisionFormat = (id, shadertype, precisiontype) => {
    alert("getShaderPrecisionFormat not implemented");
    return 0;
  }

  importObject.WebGL.getShaderInfoLog = (id, shader) => {
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.WebGL.getShaderSource = (id, shader) => {
    // this needs to return a string to AS
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.WebGL.getTexParameter = (id, target, pname) => {
    alert("getTexParameter not implemented");
    return 0;
  }

  importObject.WebGL.getUniform = (id, program, location) => {
    // this can return multiple types
    alert("getUniform not implemented");
    return 0;
  }

  importObject.WebGL.getUniformLocation = (id, program, name) => {
    let id = WebGL.uniformLocationArray.findIndex((element) => element == null);
    let uniformLocation = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getUniformLocation(WebGL.programArray[program], WebGL.getString(name));

    if (id == -1) {
      id = WebGL.uniformLocationArray.length;
      WebGL.uniformLocationArray.push(uniformLocation);
    }
    else {
      WebGL.uniformLocationArray[id] = uniformLocation;
    }

    return id;
  }

  importObject.WebGL.getVertexAttrib = (id, index, pname) => {
    // this can return multiple types
    alert("getVertexAttrib not implemented");
    return 0;
  }

  // given a vertex attribute index, return the offset value
  importObject.WebGL.getVertexAttribOffset = (id, index, pname) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getVertexAttribOffset(index, pname);
    } catch (err) {
      console.log("getVertexAttribOffset error");
      console.error(err);
    } // end catch
  }

  // sets shader behaviorial hints, which could potentially improve performance on some implementations
  importObject.WebGL.hint = (id, target, mode) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.hint(target, mode);
    } catch (err) {
      console.log("hint error");
      console.error(err);
    } // end catch
  }

  // THIS MAY JUST NEED TO CHECK TO SEE IF THE NUMBER IS IN THE RENDERBUFFER ARRAY
  // THERE ARE SEVERAL OF THESE isX FUNCTIONS.  I'M NOT SURE IF ANY OF THEM ARE USEFUL
  // IN THE AS CODE
  importObject.WebGL.isBuffer = (id, buffer) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isBuffer(WebGL.bufferArray[buffer]);
    } catch (err) {
      console.log("isBuffer error");
      console.error(err);
    } // end catch
  }

  // tests a WebGL capability to see if it is enabled
  importObject.WebGL.isEnabled = (id, cap) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isEnabled(cap);
    } catch (err) {
      console.log("isEnabled error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isFramebuffer = (id, framebuffer) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isFramebuffer(WebGL.frameBufferArray[framebuffer]);
    } catch (err) {
      console.log("isFramebuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isProgram = (id, program) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isProgram(WebGL.programArray[program]);
    } catch (err) {
      console.log("isProgram error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isRenderbuffer = (id, renderbuffer) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isRenderbuffer(WebGL.renderBufferArray[renderbuffer]);
    } catch (err) {
      console.log("isRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isShader = (id, shader) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isShader(WebGL.shaderArray[shader]);
    } catch (err) {
      console.log("isShader error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isTexture = (id, texture) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.isTexture(WebGL.textureArray[texture]);
    } catch (err) {
      console.log("isTexture error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.lineWidth = (id, width) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.lineWidth(width);
    } catch (err) {
      console.log("lineWidth error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.linkProgram = (id, program) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.linkProgram(WebGL.programArray[program]);

    if (!				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getProgramParameter(WebGL.programArray[program],
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.LINK_STATUS)) {
      console.log(				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.getProgramInfoLog(WebGL.programArray[program]));
    }
  }

  // set pixel storage mode
  importObject.WebGL.pixelStorei = (id, pname, param) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.pixelStorei(pname, param);
  }

  // ???
  importObject.WebGL.polygonOffset = (id, factor, units) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.polygonOffset(factor, units);
    } catch (err) {
      console.log("polygonOffset error");
      console.error(err);
    } // end catch
  }

  // read a block of pixels into an array buffer view
  importObject.WebGL.readPixels = (id, x, y, width, height, format, typ, pixels) => {
    alert("readPixels not implemented");
  }

  // create and initialize a renderbuffer object's data store
  importObject.WebGL.renderbufferStorage = (id, target, internalformat, width, height) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.renderbufferStorage(target, internalformat, width, height);
    } catch (err) {
      console.log("renderbufferStorage error");
      console.error(err);
    } // end catch
  }

  // sampling for anti-aliasing.  SAMPLE_COVERAGE must be enabled.
  importObject.WebGL.sampleCoverage = (id, value, invert) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.sampleCoverage(value, invert);
    } catch (err) {
      console.log("sampleCoverage error");
      console.error(err);
    } // end catch
  }

  // create a scissor box to draw inside.  SCISSOR_TEST must be enabled.
  importObject.WebGL.scissor = (id, x, y, width, height) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.scissor(x, y, width, height);
    } catch (err) {
      console.log("scissor error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.shaderSource = (id, shader, source) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.shaderSource(WebGL.shaderArray[shader], WebGL.getString(source));
  }

  // sets a function for allowing pixels to pass through a stencil.  STENCIL_TEST must be set.
  importObject.WebGL.stencilFunc = (id, func, ref, mask) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.stencilFunc(func, ref, mask);
    } catch (err) {
      console.log("stencilFunc error");
      console.error(err);
    } // end catch
  }

  // allows you to set different stencils for front and back faces.
  importObject.WebGL.stencilFuncSeparate = (id, face, func, ref, mask) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.stencilFuncSeparate(face, func, ref, mask);
    } catch (err) {
      console.log("stencilFuncSeparate error");
      console.error(err);
    } // end catch
  }

  // defines stencil masking bits
  importObject.WebGL.stencilMask = (id, mask) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.stencilMask(mask);
    } catch (err) {
      console.log("stencilMask error");
      console.error(err);
    } // end catch
  }

  // use different stencil mask for front and back faces
  importObject.WebGL.stencilMaskSeparate = (id, face, mask) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.stencilMaskSeparate(face, mask);
    } catch (err) {
      console.log("stencilMaskSeparate error");
      console.error(err);
    } // end catch
  }

  // PROBLEM: zfail is a function
  importObject.WebGL.stencilOp = (id, fail, zfail, zpass) => {
    alert("stencilOp is not implemented");
  }

  // PROBLEM: zfail is a function
  importObject.WebGL.stencilOpSeparate = (id, face, fail, zfail, zpass) => {
    alert("stencilOpSeparate is not implemented");
  }

  // specify a two-dimensional texture image
  importObject.WebGL.texImage2D = (id, target, level, internalformat, format, typ, image_id) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.texImage2D(target, level, internalformat,
      format, typ, WebGL.imageArray[image_id]);//WebGL.getArrayView(pixels));
  }

  importObject.WebGL.texParameterf = (id, target, pname, param) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.texParameterf(target, pname, param);
    } catch (err) {
      console.log("texParameterf error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.texParameteri = (id, target, pname, param) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.texParameteri(target, pname, param);
  }

  importObject.WebGL.texSubImage2D = (id, target, level, xoffset, yoffset,
    width, height,
    format, typ, pixels) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.texSubImage2D(target, level, xoffset, yoffset,
        width, height, format, typ, WebGL.getArrayView(pixels));
    } catch (err) {
      console.log("texSubImage2D error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1f = (id, location, x) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform1f(WebGL.uniformLocationArray[location], x);
    } catch (err) {
      console.log("uniform1f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1fv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform1fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform1fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1i = (id, location, x) => {
    return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform1i(WebGL.uniformLocationArray[location], x);
  }

  importObject.WebGL.uniform1iv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform1iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform1iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2f = (id, location, x, y) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform2f(WebGL.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2fv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform2fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform2fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2i = (id, location, x, y) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform2i(WebGL.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2iv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform2iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform2iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3f = (id, location, x, y, z) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform3f(WebGL.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3fv = (id, location, v) => {
    try {
      //Float32Array
      //return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform3fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform3fv(WebGL.uniformLocationArray[location], new Float32Array(v));
    } catch (err) {
      console.log("uniform3fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3i = (id, location, x, y, z) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform3i(WebGL.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3iv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform3iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform3iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4f = (id, location, x, y, z, w) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform4f(WebGL.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4fv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform4fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4i = (id, location, x, y, z, w) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform4i(WebGL.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4iv = (id, location, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniform4iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform4iv error");
      console.error(err);
    } // end catch
  }

  // Assumes an f32 as GLfloat
  importObject.WebGL.uniformMatrix2fv = (id, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 4));

    } catch (err) {
      console.log("uniformMatrix2fv error");
      console.error(err);
    } // end catch
  }

  // this assumes f32 as GLfloat
  importObject.WebGL.uniformMatrix3fv = (id, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      //console.log(new Float32Array(buffer).subarray(start_pos, start_pos + 9));
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 9));

    } catch (err) {
      console.log("uniformMatrix3fv error");
      console.error(err);
    } // end catch
  }

  // this assumes f32 as GLfloat
  // I might do this for more functions
  importObject.WebGL.uniformMatrix4fv = (id, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 16));

    } catch (err) {
      console.log("uniformMatrix4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.useProgram = (id, program) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.useProgram(WebGL.programArray[program]);
  }

  importObject.WebGL.validateProgram = (id, program) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.validateProgram(WebGL.programArray[program]);
    } catch (err) {
      console.log("validateProgram error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib1f = (id, indx, x) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib1f(indx, x);
    } catch (err) {
      console.log("vertexAttrib1f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib1fv = (id, indx, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib1fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib1fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib2f = (id, indx, x, y) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib2f(indx, x, y);
    } catch (err) {
      console.log("vertexAttrib2f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib2fv = (id, indx, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib2fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib2fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib3f = (id, indx, x, y, z) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib3f(indx, x, y, z);
    } catch (err) {
      console.log("vertexAttrib3f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib3fv = (id, indx, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib3fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib3fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib4f = (id, indx, x, y, z, w) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib4f(indx, x, y, z, w);
    } catch (err) {
      console.log("vertexAttrib4f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib4fv = (id, indx, v) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttrib4fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttribPointer = (id, indx, size, typ, normalized, stride, offset) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttribPointer(indx, size, typ, normalized, stride, offset);
  }

  importObject.WebGL.viewport = (id, indx, x, y, width, height) => {
    try {
      				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.viewport(indx, x, y, width, height);
    } catch (err) {
      console.log("viewport error");
      console.error(err);
    } // end catch
  }

  // expiramental WebGL2
  importObject.WebGL.copyBufferSubData = (id, readTarget, writeTarget, readOffset, writeOffset, size) => {
    alert("copyBufferSubData not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.getBufferSubData = (id, target, srcByteOffset, dstBuffer, dstOffset, length) => {
    alert("getBufferSubData not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.blitFramebuffer = (id, srcX0, srcY0, srcX1, srcY1,
    dstX0, dstY0, dstX1, dstY1,
    mask, filter) => {
    alert("blitFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.framebufferTextureLayer = (id, target, attachment, texture, level, layer) => {
    alert("framebufferTextureLayer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.invalidateFramebuffer = (id, target, attachments) => {
    alert("invalidateFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.invalidateSubFramebuffer = (id, target, attachments, x, y, width, height) => {
    alert("invalidateSubFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.readBuffer = (id, src) => {
    alert("readBuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.getInternalformatParameter = (id, target, internalformat, pname) => {
    alert("getInternalformatParameter not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.renderbufferStorageMultisample = (id, target, samples, internalformat, width, height) => {
    alert("renderbufferStorageMultisample not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texStorage2D = (id, target, levels, internalformat, width, height) => {
    alert("texStorage2D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texStorage3D = (id, target, levels, internalformat, width, height, depth) => {
    alert("texStorage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texSubImage3D = (id, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, typ, pboOffset) => {
    alert("texSubImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.copyTexSubImage3D = (id, target, level, xoffset, yoffset, zoffset, x, y, width, height) => {
    alert("copyTexSubImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.compressedTexImage3D = (id, target, level, internalformat, width,
    height, depth, border, imageSize, offset) => {
    alert("compressedTexImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.compressedTexSubImage3D = (id, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, imageSize, offset) => {
    alert("compressedTexSubImage3D not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getFragDataLocation = (id, program, name) => {
    alert("getFragDataLocation not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform1ui = (id, location, v0) => {
    alert("uniform1ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform2ui = (id, location, v0, v1) => {
    alert("uniform2ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform3ui = (id, location, v0, v1, v3) => {
    alert("uniform3ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform4ui = (id, location, v0, v1, v3, v4) => {
    alert("uniform4ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform1uiv = (id, location, data, srcOffset, srcLength) => {
    alert("uniform1uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform2uiv = (id, location, data, srcOffset, srcLength) => {
    alert("uniform2uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform3uiv = (id, location, data, srcOffset, srcLength) => {
    alert("uniform3uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform4uiv = (id, location, data, srcOffset, srcLength) => {
    alert("uniform4uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix3x2fv = (id, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix3x2fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix4x2fv = (id, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x2fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix2x3fv = (id, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix2x3fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix4x3fv = (id, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x3fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix2x4fv = (id, location, transpose, data, srcOffset, srcLength) => {
    console.trace("uniformMatrix2x4fv");
    alert("uniformMatrix2x4fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix3x4fv = (id, location, transpose, data, srcOffset, srcLength) => {
    console.trace("uniformMatrix3x4fv");
    alert("uniformMatrix3x4fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4i = (id, index, x, y, z, w) => {
    console.trace("vertexAttribI4i");
    alert("vertexAttribI4i not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4iv = (id, index, value_arr) => {
    console.trace("vertexAttribI4iv");
    alert("vertexAttribI4iv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4ui = (id, index, x, y, z, w) => {
    console.trace("vertexAttribI4ui");
    alert("vertexAttribI4ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4uiv = (id, index, value_arr) => {
    console.trace("vertexAttribI4uiv");
    alert("vertexAttribI4uiv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribIPointer = (id, index, size, typ, stride, offset) => {
    console.trace("vertexAttribIPointer");
    alert("vertexAttribIPointer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribDivisor = (id, index, divisor) => {
    return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.vertexAttribDivisor(index, divisor);
  }

  // expiramental WebGL2
  importObject.WebGL.drawArraysInstanced = (id, mode, first, count, instanceCount) => {
    return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.drawArraysInstanced(mode, first, count, instanceCount);
  }

  // expiramental WebGL2
  importObject.WebGL.drawElementsInstanced = (id, mode, count, typ, offset, instanceCount) => {
    try {
      return 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.drawArraysInstanced(mode, count, typ, offset, instanceCount);
    } catch (err) {
      console.log("drawElementsInstanced error");
      console.error(err);
    } // end catch

  }

  // expiramental WebGL2
  importObject.WebGL.drawRangeElements = (id, mode, start, end, count, typ, offset) => {
    alert("drawRangeElements not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.drawBuffers = (id, buffers) => {
    alert("drawBuffers not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferfv = (id, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferfv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferiv = (id, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferuiv = (id, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferuiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferfi = (id, buffer, drawbuffer, depth, stencil) => {
    alert("clearBufferfi not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createQuery = (ctx) => {
    alert("createQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteQuery = (id, query) => {
    alert("deleteQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isQuery = (id, query) => {
    alert("isQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.beginQuery = (id, target, query) => {
    alert("beginQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.endQuery = (id, query) => {
    alert("endQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getQuery = (id, query, pname) => {
    alert("getQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getQueryParameter = (id, query, pname) => {
    alert("getQueryParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createSampler = (ctx) => {
    alert("createSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteSampler = (id, sampler) => {
    alert("deleteSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isSampler = (id, sampler) => {
    alert("isSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindSampler = (id, uint, sampler) => {
    alert("bindSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.samplerParameteri = (id, sampler, pname, param) => {
    alert("samplerParameteri not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.samplerParameterf = (id, sampler, pname, param) => {
    alert("samplerParameterf not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getSamplerParameter = (id, sampler, pname) => {
    alert("getSamplerParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.fenceSync = (id, condition, flags) => {
    alert("fenceSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isSync = (id, sync) => {
    alert("isSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteSync = (id, sync) => {
    alert("deleteSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clientWaitSync = (id, sync, flags, timeout) => {
    alert("clientWaitSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.waitSync = (id, sync, flags, timeout) => {
    alert("waitSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getSyncParameter = (id, sync, pname) => {
    alert("getSyncParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createTransformFeedback = (ctx) => {
    alert("createTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteTransformFeedback = (id, tf) => {
    alert("deleteTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isTransformFeedback = (id, tf) => {
    alert("isTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindTransformFeedback = (id, target, tf) => {
    alert("bindTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.beginTransformFeedback = (id, primitiveMode) => {
    alert("beginTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.endTransformFeedback = (ctx) => {
    alert("endTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.transformFeedbackVaryings = (id, program, varyings, bufferMode) => {
    alert("transformFeedbackVaryings not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getTransformFeedbackVarying = (id, program, index) => {
    alert("getTransformFeedbackVarying not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.pauseTransformFeedback = (ctx) => {
    alert("pauseTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.resumeTransformFeedback = (ctx) => {
    alert("resumeTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindBufferBase = (id, target, index, buffer) => {
    alert("bindBufferBase not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindBufferRange = (id, target, index, buffer, offset, size) => {
    alert("bindBufferRange not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getIndexedParameter = (id, target, index) => {
    alert("getIndexedParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getUniformIndices = (id, program, uniformNames) => {
    alert("getUniformIndices not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniforms = (id, program, uniformIndices, pname) => {
    alert("getActiveUniforms not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getUniformBlockIndex = (id, program, uniformBlockName) => {
    alert("getUniformBlockIndex not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniformBlockParameter = (id, program, uniformBlockIndex, pname) => {
    alert("getActiveUniformBlockParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniformBlockName = (id, program, uniformBlockIndex) => {
    alert("getActiveUniformBlockName not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformBlockBinding = (id, program, uniformBlockIndex, uniformBlockBinding) => {
    alert("uniformBlockBinding not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createVertexArray = (ctx) => {
    let id = WebGL.vaoArray.findIndex((element) => element == null);
    let vao = 				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.createVertexArray();

    if (id == -1) {
      id = WebGL.vaoArray.length;
      WebGL.vaoArray.push(vao);
    }
    else {
      WebGL.vaoArray[id] = vao;
    }
    return id;
  }

  // expiramental WebGL2
  importObject.WebGL.deleteVertexArray = (id, vertexArray) => {
    alert("deleteVertexArray not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isVertexArray = (id, vertexArray) => {
    alert("isVertexArray not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindVertexArray = (id, vaoId) => {
    				/** @type {WebGLRenderingContext} */
				const self = this.__objectRefs.get(id)
				self
.bindVertexArray(WebGL.vaoArray[vaoId]);
  }

}
