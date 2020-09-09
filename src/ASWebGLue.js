export function ASWebGLReady(wasm_obj, importObject) {
  if (wasm_obj == null) {
    console.error("ASWebGLReady requires the WebAssembly Instance as 1st parameter");
    return;
  }
  if (wasm_obj == null) {
    console.error("ASWebGLReady requires import object as 2nd parameter");
    return;
  }
  importObject.webgl.WEBGL_READY = true;
  importObject.webgl.RTTI_BASE = wasm_obj.instance.exports["__rtti_base"];
}

export function initASWebGLue(importObject) {
  if (importObject.env.memory == null) {
    alert('You need to set memory in your importObject');
  }

  if (importObject.webgl == null) {
    importObject.webgl = {};
  }

  const webgl = importObject.webgl;

  importObject.env.abort = (...args) => {
    console.log("abort");
    console.log(webgl.getString(args[0]));
  }

  importObject.webgl.WEBGL_READY = false;
  importObject.webgl.memory = importObject.env.memory;

  importObject.webgl.contextArray = [];
  importObject.webgl.textureArray = [];
  importObject.webgl.programArray = [];
  importObject.webgl.shaderArray = [];
  importObject.webgl.bufferArray = [];
  importObject.webgl.frameBufferArray = [];
  importObject.webgl.renderBufferArray = [];
  importObject.webgl.uniformLocationArray = [];

  importObject.webgl.SIZE_OFFSET = -4;
  importObject.webgl.ID_OFFSET = -8;
  importObject.webgl.CHUNKSIZE = 1024;
  importObject.webgl.STRING_ID = 1;
  importObject.webgl.RTTI_BASE = 0;
  importObject.webgl.VAL_ALIGN_OFFSET = 6;

  importObject.ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
  importObject.ARRAY_LENGTH_OFFSET = 12;

  /** No specific flags. */
  importObject.webgl.NONE = 0x00;
  /** Type is an `ArrayBufferView`. */
  importObject.webgl.ARRAYBUFFERVIEW = 0x01;
  /** Type is an `Array`. */
  importObject.webgl.ARRAY = 0x0002;
  /** Type is a `StaticArray`. */
  importObject.webgl.STATICARRAY = 0x0004;
  /** Type is a `Set`. */
  importObject.webgl.SET = 0x000008;
  /** Type is a `Map`. */
  importObject.webgl.MAP = 0x000010;
  /** Type is inherently acyclic. */
  importObject.webgl.ACYCLIC = 0x000020;
  /** Value alignment of 1 byte. */
  importObject.webgl.VALUE_ALIGN_0 = 0x000040;
  /** Value alignment of 2 bytes. */
  importObject.webgl.VALUE_ALIGN_1 = 0x000080;
  /** Value alignment of 4 bytes. */
  importObject.webgl.VALUE_ALIGN_2 = 0x000100;
  /** Value alignment of 8 bytes. */
  importObject.webgl.VALUE_ALIGN_3 = 0x000200;
  /** Value alignment of 16 bytes. */
  importObject.webgl.VALUE_ALIGN_4 = 0x000400;
  /** Value is a signed type. */
  importObject.webgl.VALUE_SIGNED = 0x000800;
  /** Value is a float type. */
  importObject.webgl.VALUE_FLOAT = 0x001000;
  /** Value type is nullable. */
  importObject.webgl.VALUE_NULLABLE = 0x002000;
  /** Value type is managed. */
  importObject.webgl.VALUE_MANAGED = 0x004000;
  /** Key alignment of 1 byte. */
  importObject.webgl.KEY_ALIGN_0 = 0x008000;
  /** Key alignment of 2 bytes. */
  importObject.webgl.KEY_ALIGN_1 = 0x010000;
  /** Key alignment of 4 bytes. */
  importObject.webgl.KEY_ALIGN_2 = 0x020000;
  /** Key alignment of 8 bytes. */
  importObject.webgl.KEY_ALIGN_3 = 0x040000;
  /** Key alignment of 16 bytes. */
  importObject.webgl.KEY_ALIGN_4 = 0x080000;
  /** Key is a signed type. */
  importObject.webgl.KEY_SIGNED = 0x100000;
  /** Key is a float type. */
  importObject.webgl.KEY_FLOAT = 0x200000;
  /** Key type is nullable. */
  importObject.webgl.KEY_NULLABLE = 0x400000;
  /** Key type is managed. */
  importObject.webgl.KEY_MANAGED = 0x800000;

  importObject.webgl.getView = (alignLog2, signed, float) => {
    const buffer = webgl.memory.buffer;

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

  importObject.webgl.getArrayInfo = (id) => {
    const info = webgl.getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    return info;
  }

  importObject.webgl.getValueAlign = (info) => {
    return 31 - Math.clz32((info >>> VAL_ALIGN_OFFSET) & 31); // -1 if none
  }

  importObject.webgl.getArrayView = (arr_ptr) => {
    const U32 = new Uint32Array(webgl.memory.buffer);
    const id = U32[arr_ptr + webgl.ID_OFFSET >>> 2];

    const count = U32[webgl.RTTI_BASE >>> 2];

    if (id >= count) throw Error(`invalid id: ${id}`);
    const info = U32[(webgl.RTTI_BASE + 4 >>> 2) + id * 2];

    if (!(info & (webgl.ARRAYBUFFERVIEW | webgl.ARRAY | webgl.STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    const align = 31 - Math.clz32((info >>> webgl.VAL_ALIGN_OFFSET) & 31); // -1 if none getValueAlign(info)
    let buf = info & webgl.STATICARRAY
      ? arr_ptr
      : U32[arr_ptr + webgl.ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & webgl.ARRAY
      ? U32[arr_ptr + webgl.ARRAY_LENGTH_OFFSET >>> 2]
      : U32[buf + webgl.SIZE_OFFSET >>> 2] >>> align;
    return webgl.getView(align, info & webgl.VAL_SIGNED, info & webgl.VAL_FLOAT)
      .subarray(buf >>>= align, buf + length);

  }

  importObject.webgl.getString = (string_index) => {
    const buffer = webgl.memory.buffer;
    const U32 = new Uint32Array(buffer);
    const id_addr = string_index / 4 - 2;
    const id = U32[id_addr];
    if (id !== 0x01) throw Error(`not a string index=${string_index} id=${id}`);
    const len = U32[id_addr + 1];
    const str = new TextDecoder('utf-16').decode(buffer.slice(string_index, string_index + len));
    return str;
  }

  importObject.webgl.createContextFromCanvas = (canvas_id, context_type) => {
    try {
      console.log(canvas_id);
      console.log(context_type);
      console.log('getting canvas id string');
      console.log(webgl.getString(canvas_id));
      const canvas = document.getElementById(webgl.getString(canvas_id));
      const gl = canvas.getContext(webgl.getString(context_type));
      let id = webgl.contextArray.findIndex((element) => element == null);

      if (id == -1) {
        id = webgl.contextArray.length;
        webgl.contextArray.push(gl);
      }
      else {
        webgl.contextArray[id] = gl;
      }
      return id;
    } catch (err) {
      console.log("createContextFromCanvas error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getSupportedExtensions = (ctx) => {
    alert('getSupportedExtensions is not currently supported');
  }

  importObject.webgl.getExtension = (ctx, name_string) => {
    try {
      webgl.contextArray[ctx].getExtension(webgl.getString(name));
    } catch (err) {
      console.log("getExtension error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.activeTexture = (ctx, texture) => {
    try {
      webgl.contextArray[ctx].activeTexture(webgl.textureArray[texture]);
    } catch (err) {
      console.log("activeTexture error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.attachShader = (ctx, program, shader) => {
    try {
      webgl.contextArray[ctx].attachShader(webgl.programArray[program], webgl.shaderArray[shader]);
    } catch (err) {
      console.log("attachShader error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.bindAttribLocation = (ctx, program, index, name) => {
    try {
      webgl.contextArray[ctx].bindAttribLocation(webgl.programArray[program], index, webgl.getString(name));
    } catch (err) {
      console.log("bindAttribLocation error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.bindBuffer = (ctx, target, buffer) => {
    try {
      webgl.contextArray[ctx].bindBuffer(target, webgl.bufferArray[buffer]);
    } catch (err) {
      console.log("bindBuffer error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.bindFramebuffer = (ctx, target, framebuffer) => {
    try {
      webgl.contextArray[ctx].bindFramebuffer(target, webgl.framebufferArray[framebuffer]);
    } catch (err) {
      console.log("bindFramebuffer error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.bindRenderbuffer = (ctx, target, renderbuffer) => {
    try {
      webgl.contextArray[ctx].bindRenderbuffer(target, webgl.renderbufferArray[renderbuffer]);
    } catch (err) {
      console.log("renderbufferArray error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.bindTexture = (ctx, target, texture) => {
    try {
      webgl.contextArray[ctx].bindTexture(target, webgl.textureArray[texture]);
    } catch (err) {
      console.log("bindTexture error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.blendColor = (ctx, r, g, b, a) => {
    try {
      webgl.contextArray[ctx].blendColor(r, g, b, a);
    } catch (err) {
      console.log("blendColor error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.blendEquation = (ctx, mode) => {
    try {
      webgl.contextArray[ctx].blendEquation(mode);
    } catch (err) {
      console.log("blendEquation error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.blendEquationSeparate = (ctx, modeRGB, modeAlpha) => {
    try {
      webgl.contextArray[ctx].blendEquationSeparate(modeRGB, modeAlpha);
    } catch (err) {
      console.log("blendEquationSeparate error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.blendFunc = (ctx, sfactor, dfactor) => {
    try {
      webgl.contextArray[ctx].blendFunc(sfactor, dfactor);
    } catch (err) {
      console.log("blendFunc error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.blendFuncSeparate = (ctx, srcRGB, dstRGB, srcAlpha, dstAlpha) => {
    try {
      webgl.contextArray[ctx].blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    } catch (err) {
      console.log("blendFuncSeparate error");
      console.error(err);
    } // end catch
  }

  const bufferdata = (ctx, target, data, usage) => {
    try {
      webgl.contextArray[ctx].bufferData(target, webgl.getArrayView(data), usage);
    } catch (err) {
      console.log("bufferData error");
      console.error(err);
    } // end catch
  }

  importObject.webgl["bufferData<f32>"] = bufferdata;
  importObject.webgl["bufferData<f64>"] = bufferdata;
  importObject.webgl["bufferData<i32>"] = bufferdata;

  // LAST TWO PARAMETERS ARE IN WEBGL 2.0
  importObject.webgl.bufferSubData = (target, dstByteOffset, srcData, srcOffset, length) => {
    try {
      webgl.contextArray[ctx].bufferSubData(target, dstByteOffset, webgl.getArrayView(srcData), srcOffset, length);
    } catch (err) {
      console.log("bufferSubData error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.checkFramebufferStatus = (ctx, target) => {
    try {
      return webgl.contextArray[ctx].checkFramebufferStatus(target);
    } catch (err) {
      console.log("checkFramebufferStatus error");
      console.error(err);
    } // end catch
  }

  // Clears the color, depth and stencil buffers
  importObject.webgl.clear = (ctx, mask) => {
    try {
      webgl.contextArray[ctx].clear(mask);
    } catch (err) {
      console.log("clear error");
      console.error(err);
    } // end catch
  }

  // Specify the color fill a cleared color buffer with
  importObject.webgl.clearColor = (ctx, r, g, b, a) => {
    try {
      webgl.contextArray[ctx].clearColor(r, g, b, a);
    } catch (err) {
      console.log("clearColor error");
      console.error(err);
    } // end catch
  }

  // Specifies a depth value to fill the depth buffer when it is cleared
  importObject.webgl.clearDepth = (ctx, depth) => {
    try {
      webgl.contextArray[ctx].clearDepth(depth);
    } catch (err) {
      console.log("clearDepth error");
      console.error(err);
    } // end catch
  }

  // Specifies a clear value for the stencil buffer
  importObject.webgl.clearStencil = (ctx, s) => {
    try {
      webgl.contextArray[ctx].clearStencil(s);
    } catch (err) {
      console.log("clearStencil error");
      console.error(err);
    } // end catch
  }

  // Allows you to turn on and off colors when writing to a framebuffer
  importObject.webgl.colorMask = (ctx, r, g, b, a) => {
    try {
      webgl.contextArray[ctx].colorMask(r, g, b, a);
    } catch (err) {
      console.log("colorMask error");
      console.error(err);
    } // end catch
  }

  // Compiles a GLSL shader to be used by a WebGL program.
  importObject.webgl.compileShader = (ctx, shader) => {
    try {
      webgl.contextArray[ctx].compileShader(webgl.shaderArray[shader]);
    } catch (err) {
      console.log("compileShader error");
      console.error(err);
    } // end catch
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Secifies a 2D texture image in a compressed format
  importObject.webgl.compressedTexImage2D = (ctx, target, level, internalformat, width, height, border, data) => {
    try {
      webgl.contextArray[ctx].compileShader(target, level, internalformat,
        width, height, border, webgl.getArrayView(data));
    } catch (err) {
      console.log("compressedTexImage2D error");
      console.error(err);
    } // end catch
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Specifies a 2D sub-image rectangle for a compressed format texture image.
  importObject.webgl.compressedTexSubImage2D = (ctx, target, level, xoffset, yoffset, width, height, format, data) => {
    try {
      webgl.contextArray[ctx].compressedTexSubImage2D(target, xoffset, yoffset, width, height, format,
        webgl.getArrayView(data));
    } catch (err) {
      console.log("compressedTexSubImage2D error");
      console.error(err);
    } // end catch
  }

  // Copies pixels from the current WebGLFramebuffer into a 2D texture image
  importObject.webgl.copyTexImage2D = (ctx, target, level, internalformat, x, y, width, height, border) => {
    try {
      webgl.contextArray[ctx].copyTexImage2D(target, level, internalformat, x, y, width, height, border);
    } catch (err) {
      console.log("copyTexImage2D error");
      console.error(err);
    } // end catch
  }

  // Copies pixels from the current WebGLFramebuffer into an existing 2D texture sub-image
  importObject.webgl.copyTexSubImage2D = (ctx, target, level, xoffset, yoffset, x, y, width, height) => {
    try {
      webgl.contextArray[ctx].copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
    } catch (err) {
      console.log("copyTexSubImage2D error");
      console.error(err);
    } // end catch
  }

  // Creates a buffer to hold vertex related data
  importObject.webgl.createBuffer = (ctx) => {
    try {
      let id = webgl.bufferArray.findIndex((element) => element == null);
      let buffer = webgl.contextArray[ctx].createBuffer();

      if (id == -1) {
        id = webgl.bufferArray.length;
        webgl.bufferArray.push(buffer);
      }
      else {
        webgl.bufferArray[id] = buffer;
      }
      return id;
    } catch (err) {
      console.log("createBuffer error");
      console.error(err);
    } // end catch
  }

  // Creates a frame buffer object to be used as a rendering destination
  importObject.webgl.createFramebuffer = (ctx) => {
    alert(arguments.callee.toString());
  }

  // Creates a WebGL program that consists of a vertex and fragment shader
  importObject.webgl.createProgram = (ctx) => {
    try {
      let id = webgl.programArray.findIndex((element) => element == null);
      let program = webgl.contextArray[ctx].createProgram();

      if (id == -1) {
        id = webgl.programArray.length;
        webgl.programArray.push(program);
      }
      else {
        webgl.programArray[id] = program;
      }
      return id;
    } catch (err) {
      console.log("createProgram error");
      console.error(err);
    } // end catch
  }

  // Creates a render buffer object that can be used as a source or target for rendering
  importObject.webgl.createRenderbuffer = (ctx) => {
    try {
      let id = webgl.renderBufferArray.findIndex((element) => element == null);
      let renderbuffer = webgl.contextArray[ctx].createRenderbuffer();

      if (id == -1) {
        id = webgl.renderBufferArray.length;
        webgl.renderBufferArray.push(renderbuffer);
      }
      else {
        webgl.renderBufferArray[id] = renderbuffer;
      }
      return id;
    } catch (err) {
      console.log("renderBufferArray error");
      console.error(err);
    } // end catch
  }

  // Creates a vertex or fragment shader object to be used when compiling a WebGL program
  importObject.webgl.createShader = (ctx, type) => {
    try {
      let id = webgl.shaderArray.findIndex((element) => element == null);
      let shader = webgl.contextArray[ctx].createShader(type);

      if (id == -1) {
        id = webgl.shaderArray.length;
        webgl.shaderArray.push(shader);
      }
      else {
        webgl.shaderArray[id] = shader;
      }
      return id;
    } catch (err) {
      console.log("createShader error");
      console.error(err);
    } // end catch
  }

  // Creates a texture object 
  importObject.webgl.createTexture = (ctx) => {
    try {
      let id = webgl.shaderArray.findIndex((element) => element == null);
      let texture = webgl.contextArray[ctx].createTexture();

      if (id == -1) {
        id = webgl.textureArray.length;
        webgl.textureArray.push(texture);
      }
      else {
        webgl.textureArray[id] = texture;
      }
      return id;
    } catch (err) {
      console.log("createTexture error");
      console.error(err);
    } // end catch
  }

  // Sets the culling mode
  importObject.webgl.cullFace = (ctx, mode) => {
    try {
      webgl.contextArray[ctx].cullFace(target, mode);
    } catch (err) {
      console.log("cullFace error");
      console.error(err);
    } // end catch
  }

  // delete the buffer object
  importObject.webgl.deleteBuffer = (ctx, buffer) => {
    try {
      webgl.contextArray[ctx].deleteBuffer(this.bufferArray[buffer]);
      this.bufferArray[buffer] = null;
    } catch (err) {
      console.log("deleteBuffer error");
      console.error(err);
    } // end catch
  }

  // delete the frame buffer object
  importObject.webgl.deleteFramebuffer = (ctx, frame_buffer) => {
    try {
      webgl.contextArray[ctx].deleteFramebuffer(this.framebufferArray[frame_buffer]);
      this.framebufferArray[frame_buffer] = null;
    } catch (err) {
      console.log("deleteFramebuffer error");
      console.error(err);
    } // end catch
  }

  // delete the render buffer object
  importObject.webgl.deleteRenderbuffer = (ctx, render_buffer) => {
    try {
      webgl.contextArray[ctx].deleteRenderbuffer(this.renderBufferArray[render_buffer]);
      this.renderBufferArray[render_buffer] = null;
    } catch (err) {
      console.log("deleteRenderbuffer error");
      console.error(err);
    } // end catch
  }

  // delete the program object
  importObject.webgl.deleteProgram = (ctx, program) => {
    try {
      webgl.contextArray[ctx].deleteProgram(this.programArray[program]);
      this.program[program] = null;
    } catch (err) {
      console.log("deleteProgram error");
      console.error(err);
    } // end catch
  }

  // delete the shader object
  importObject.webgl.deleteShader = (ctx, shader) => {
    try {
      webgl.contextArray[ctx].deleteShader(this.shaderArray[shader]);
      this.shaderArray[shader] = null;
    } catch (err) {
      console.log("deleteShader error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.deleteTexture = (ctx, texture) => {
    try {
      webgl.contextArray[ctx].deleteShader(this.textureArray[texture]);
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
  importObject.webgl.depthFunc = (ctx, func) => { // func is a depth function enumeration
    try {
      webgl.contextArray[ctx].depthFunc(func);
    } catch (err) {
      console.log("depthFunc error");
      console.error(err);
    } // end catch
  }

  // enable or disable writing to the depth buffer
  importObject.webgl.depthMask = (ctx, flag) => {
    try {
      webgl.contextArray[ctx].depthMask(flag);
    } catch (err) {
      console.log("depthMask error");
      console.error(err);
    } // end catch
  }

  // defines the near and far clipping plane in the depth buffer
  importObject.webgl.depthRange = (ctx, zNear, zFar) => {
    try {
      webgl.contextArray[ctx].depthRange(zNear, zFar);
    } catch (err) {
      console.log("depthRange error");
      console.error(err);
    } // end catch
  }

  // detach the shader currently attached to the program
  importObject.webgl.detachShader = (ctx, program, shader) => {
    try {
      webgl.contextArray[ctx].detachShader(program, shader);
    } catch (err) {
      console.log("detachShader error");
      console.error(err);
    } // end catch
  }

  // disable a specific webgl capability
  importObject.webgl.disable = (ctx, cap) => {
    try {
      webgl.contextArray[ctx].disable(cap);
    } catch (err) {
      console.log("disable error");
      console.error(err);
    } // end catch
  }

  // disables a vertex attribute array at the index loction passed in.
  importObject.webgl.disableVertexAttribArray = (ctx, index) => {
    try {
      webgl.contextArray[ctx].disableVertexAttribArray(index);
    } catch (err) {
      console.log("disableVertexAttribArray error");
      console.error(err);
    } // end catch
  }

  // render primitive data from array
  importObject.webgl.drawArrays = (ctx, mode, first, count) => {
    try {
      webgl.contextArray[ctx].drawArrays(mode, first, count);
    } catch (err) {
      console.log("drawArrays error");
      console.error(err);
    } // end catch
  }

  // uses index data to render elements from array data
  importObject.webgl.drawElements = (ctx, mode, count, typ, offset) => {
    try {
      webgl.contextArray[ctx].drawElements(mode, count, typ, offset);
    } catch (err) {
      console.log("drawElements error");
      console.error(err);
    } // end catch
  }

  // enable a specific webgl capability
  importObject.webgl.enable = (ctx, cap) => {
    try {
      webgl.contextArray[ctx].enable(cap);
    } catch (err) {
      console.log("enable error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.enableVertexAttribArray = (ctx, index) => {
    try {
      webgl.contextArray[ctx].enableVertexAttribArray(index);
    } catch (err) {
      console.log("enableVertexAttribArray error");
      console.error(err);
    } // end catch
  }

  // waits for all previously executed webgl api calls to finish
  importObject.webgl.finish = (ctx) => {
    try {
      webgl.contextArray[ctx].finish();
    } catch (err) {
      console.log("finish error");
      console.error(err);
    } // end catch
  }

  // ???
  importObject.webgl.flush = (ctx) => {
    try {
      webgl.contextArray[ctx].flush();
    } catch (err) {
      console.log("flush error");
      console.error(err);
    } // end catch
  }

  // attach a render buffer to a frame buffer
  importObject.webgl.framebufferRenderbuffer = (ctx, target, attachment, renderbuffertarget, renderbuffer) => {
    try {
      webgl.contextArray[ctx].framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
    } catch (err) {
      console.log("framebufferRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.framebufferTexture2D = (ctx, target, attachment, textarget, texture, level) => {
    try {
      webgl.contextArray[ctx].framebufferTexture2D(target, attachment, textarget, texture, level);
    } catch (err) {
      console.log("framebufferTexture2D error");
      console.error(err);
    } // end catch
  }

  // set the winding direction of the verticies, which defines the front face
  importObject.webgl.frontFace = (ctx, mode) => {
    try {
      webgl.contextArray[ctx].frontFace(mode);
    } catch (err) {
      console.log("frontFace error");
      console.error(err);
    } // end catch
  }

  // generates reduced resolution mipmap textures for rendering objects at a distance
  importObject.webgl.generateMipmap = (ctx, target) => {
    try {
      webgl.contextArray[ctx].generateMipmap(target);
    } catch (err) {
      console.log("generateMipmap error");
      console.error(err);
    } // end catch
  }

  // query information about an attribute of a given program
  importObject.webgl.getActiveAttrib = (ctx, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveAttrib is not implemented");
    return 0;
  }

  // query information about a uniform in a given program
  importObject.webgl.getActiveUniform = (ctx, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveUniform is not implemented");
    return 0;
  }

  // needs to return an array of webgl shaders to the AS
  importObject.webgl.getAttachedShaders = (ctx, program) => {
    // this will need to return an array of shader indicies.
    alert("getAttachedShaders is not implemented");
    return 0;
  }

  // get an attribute location inside a program given a name
  importObject.webgl.getAttribLocation = (ctx, program, name) => {
    try {
      return webgl.contextArray[ctx].getAttribLocation(webgl.programArray[program], webgl.getString(name));
    } catch (err) {
      console.log("getAttribLocation error");
      console.error(err);
    } // end catch
  }

  // returns an int given a buffer parameter name
  importObject.webgl.getBufferParameter = (ctx, target, pname) => {
    try {
      return webgl.contextArray[ctx].getBufferParameter(target, pname);
    } catch (err) {
      console.log("getBufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getParameter = (ctx, pname) => {
    try {
      return webgl.contextArray[ctx].getParameter(pname);
    } catch (err) {
      console.log("getParameter error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getError = (ctx) => {
    try {
      return webgl.contextArray[ctx].getError();
    } catch (err) {
      console.log("getError error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getFramebufferAttachmentParameter = (ctx, target, attachment, pname) => {
    try {
      return webgl.contextArray[ctx].getParameter(target, attachment, pname);
    } catch (err) {
      console.log("getFramebufferAttachmentParameter error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getProgramInfoLog = (ctx, program) => {
    // this needs to return a string to the AS
    alert("getProgramInfoLog not implemented");
    return 0;
  }

  // get information about the renderbuffer
  importObject.webgl.getRenderbufferParameter = (ctx, target, pname) => {
    try {
      return webgl.contextArray[ctx].getRenderbufferParameter(target, pname);
    } catch (err) {
      console.log("getRenderbufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getShaderParameter = (ctx, shader, pname) => {
    alert("getShaderParameter not implemented");
    return 0;
  }

  importObject.webgl.getShaderPrecisionFormat = (ctx, shadertype, precisiontype) => {
    alert("getShaderPrecisionFormat not implemented");
    return 0;
  }

  importObject.webgl.getShaderInfoLog = (ctx, shader) => {
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.webgl.getShaderSource = (ctx, shader) => {
    // this needs to return a string to AS
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.webgl.getTexParameter = (ctx, target, pname) => {
    alert("getTexParameter not implemented");
    return 0;
  }

  importObject.webgl.getUniform = (ctx, program, location) => {
    // this can return multiple types
    alert("getUniform not implemented");
    return 0;
  }

  importObject.webgl.getUniformLocation = (ctx, program, name) => {
    try {
      let id = webgl.uniformLocationArray.findIndex((element) => element == null);
      let uniformLocation = webgl.contextArray[ctx].getUniformLocation(webgl.programArray[program], webgl.getString(name));

      if (id == -1) {
        id = webgl.uniformLocationArray.length;
        webgl.uniformLocationArray.push(uniformLocation);
      }
      else {
        webgl.uniformLocationArray[id] = uniformLocation;
      }

      return id;
    } catch (err) {
      console.log("getUniformLocation error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.getVertexAttrib = (ctx, index, pname) => {
    // this can return multiple types
    alert("getVertexAttrib not implemented");
    return 0;
  }

  // given a vertex attribute index, return the offset value
  importObject.webgl.getVertexAttribOffset = (ctx, index, pname) => {
    try {
      return webgl.contextArray[ctx].getVertexAttribOffset(index, pname);
    } catch (err) {
      console.log("getVertexAttribOffset error");
      console.error(err);
    } // end catch
  }

  // sets shader behaviorial hints, which could potentially improve performance on some implementations
  importObject.webgl.hint = (ctx, target, mode) => {
    try {
      return webgl.contextArray[ctx].hint(target, mode);
    } catch (err) {
      console.log("hint error");
      console.error(err);
    } // end catch
  }

  // THIS MAY JUST NEED TO CHECK TO SEE IF THE NUMBER IS IN THE RENDERBUFFER ARRAY
  // THERE ARE SEVERAL OF THESE isX FUNCTIONS.  I'M NOT SURE IF ANY OF THEM ARE USEFUL
  // IN THE AS CODE
  importObject.webgl.isBuffer = (ctx, buffer) => {
    try {
      return webgl.contextArray[ctx].isBuffer(webgl.bufferArray[buffer]);
    } catch (err) {
      console.log("isBuffer error");
      console.error(err);
    } // end catch
  }

  // tests a webgl capability to see if it is enabled
  importObject.webgl.isEnabled = (ctx, cap) => {
    try {
      return webgl.contextArray[ctx].isEnabled(cap);
    } catch (err) {
      console.log("isEnabled error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.isFramebuffer = (ctx, framebuffer) => {
    try {
      return webgl.contextArray[ctx].isFramebuffer(webgl.frameBufferArray[framebuffer]);
    } catch (err) {
      console.log("isFramebuffer error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.isProgram = (ctx, program) => {
    try {
      return webgl.contextArray[ctx].isProgram(webgl.programArray[program]);
    } catch (err) {
      console.log("isProgram error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.isRenderbuffer = (ctx, renderbuffer) => {
    try {
      return webgl.contextArray[ctx].isRenderbuffer(webgl.renderBufferArray[renderbuffer]);
    } catch (err) {
      console.log("isRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.isShader = (ctx, shader) => {
    try {
      return webgl.contextArray[ctx].isShader(webgl.shaderArray[shader]);
    } catch (err) {
      console.log("isShader error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.isTexture = (ctx, texture) => {
    try {
      return webgl.contextArray[ctx].isTexture(webgl.textureArray[texture]);
    } catch (err) {
      console.log("isTexture error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.lineWidth = (ctx, width) => {
    try {
      return webgl.contextArray[ctx].lineWidth(width);
    } catch (err) {
      console.log("lineWidth error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.linkProgram = (ctx, program) => {
    try {
      webgl.contextArray[ctx].linkProgram(webgl.programArray[program]);

      if (!webgl.contextArray[ctx].getProgramParameter(webgl.programArray[program],
        webgl.contextArray[ctx].LINK_STATUS)) {
        console.log(arg[0].getProgramInfoLog(webgl.programArray[program]));
      }
    } catch (err) {
      console.log("linkProgram error");
      console.error(err);
    } // end catch
  }

  // set pixel storage mode
  importObject.webgl.pixelStorei = (ctx, pname, param) => {
    try {
      webgl.contextArray[ctx].pixelStorei(pname, param);
    } catch (err) {
      console.log("pixelStorei error");
      console.error(err);
    } // end catch
  }

  // ???
  importObject.webgl.polygonOffset = (ctx, factor, units) => {
    try {
      webgl.contextArray[ctx].polygonOffset(factor, units);
    } catch (err) {
      console.log("polygonOffset error");
      console.error(err);
    } // end catch
  }

  // read a block of pixels into an array buffer view
  importObject.webgl.readPixels = (ctx, x, y, width, height, format, typ, pixels) => {
    alert("readPixels not implemented");
  }

  // create and initialize a renderbuffer object's data store
  importObject.webgl.renderbufferStorage = (ctx, target, internalformat, width, height) => {
    try {
      webgl.contextArray[ctx].renderbufferStorage(target, internalformat, width, height);
    } catch (err) {
      console.log("renderbufferStorage error");
      console.error(err);
    } // end catch
  }

  // sampling for anti-aliasing.  SAMPLE_COVERAGE must be enabled.
  importObject.webgl.sampleCoverage = (ctx, value, invert) => {
    try {
      webgl.contextArray[ctx].sampleCoverage(value, invert);
    } catch (err) {
      console.log("sampleCoverage error");
      console.error(err);
    } // end catch
  }

  // create a scissor box to draw inside.  SCISSOR_TEST must be enabled.
  importObject.webgl.scissor = (ctx, x, y, width, height) => {
    try {
      webgl.contextArray[ctx].scissor(x, y, width, height);
    } catch (err) {
      console.log("scissor error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.shaderSource = (ctx, shader, source) => {
    try {
      webgl.contextArray[ctx].shaderSource(webgl.shaderArray[shader], webgl.getString(source));
    } catch (err) {
      console.log("shaderSource error");
      console.error(err);
    } // end catch
  }

  // sets a function for allowing pixels to pass through a stencil.  STENCIL_TEST must be set.
  importObject.webgl.stencilFunc = (ctx, func, ref, mask) => {
    try {
      webgl.contextArray[ctx].stencilFunc(func, ref, mask);
    } catch (err) {
      console.log("stencilFunc error");
      console.error(err);
    } // end catch
  }

  // allows you to set different stencils for front and back faces.
  importObject.webgl.stencilFuncSeparate = (ctx, face, func, ref, mask) => {
    try {
      webgl.contextArray[ctx].stencilFuncSeparate(face, func, ref, mask);
    } catch (err) {
      console.log("stencilFuncSeparate error");
      console.error(err);
    } // end catch
  }

  // defines stencil masking bits
  importObject.webgl.stencilMask = (ctx, mask) => {
    try {
      webgl.contextArray[ctx].stencilMask(mask);
    } catch (err) {
      console.log("stencilMask error");
      console.error(err);
    } // end catch
  }

  // use different stencil mask for front and back faces
  importObject.webgl.stencilMaskSeparate = (ctx, face, mask) => {
    try {
      webgl.contextArray[ctx].stencilMaskSeparate(face, mask);
    } catch (err) {
      console.log("stencilMaskSeparate error");
      console.error(err);
    } // end catch
  }

  // PROBLEM: zfail is a function
  importObject.webgl.stencilOp = (ctx, fail, zfail, zpass) => {
    alert("stencilOp is not implemented");
  }

  // PROBLEM: zfail is a function
  importObject.webgl.stencilOpSeparate = (ctx, face, fail, zfail, zpass) => {
    alert("stencilOpSeparate is not implemented");
  }

  // specify a two-dimensional texture image
  importObject.webgl.texImage2D = (ctx, target, level, internalformat,
    width, height, border, format, typ, pixels) => {
    try {
      webgl.contextArray[ctx].texImage2D(target, level, internalformat,
        width, height, border, format, typ, webgl.getArrayView(pixels));
    } catch (err) {
      console.log("texImage2D error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.texParameterf = (ctx, target, pname, param) => {
    try {
      webgl.contextArray[ctx].texParameterf(target, pname, param);
    } catch (err) {
      console.log("texParameterf error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.texParameteri = (ctx, target, pname, param) => {
    try {
      webgl.contextArray[ctx].texParameteri(target, pname, param);
    } catch (err) {
      console.log("texParameteri error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.texSubImage2D = (ctx, target, level, xoffset, yoffset,
    width, height,
    format, typ, pixels) => {
    try {
      webgl.contextArray[ctx].texSubImage2D(target, level, xoffset, yoffset,
        width, height, format, typ, webgl.getArrayView(pixels));
    } catch (err) {
      console.log("texSubImage2D error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform1f = (ctx, location, x) => {
    try {
      return webgl.contextArray[ctx].uniform1f(webgl.uniformLocationArray[location], x);
    } catch (err) {
      console.log("uniform1f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform1fv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform1fv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform1fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform1i = (ctx, location, x) => {
    try {
      return webgl.contextArray[ctx].uniform1i(webgl.uniformLocationArray[location], x);
    } catch (err) {
      console.log("uniform1i error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform1iv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform1iv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform1iv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform2f = (ctx, location, x, y) => {
    try {
      return webgl.contextArray[ctx].uniform2f(webgl.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform2fv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform2fv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform2fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform2i = (ctx, location, x, y) => {
    try {
      return webgl.contextArray[ctx].uniform2i(webgl.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2i error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform2iv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform2iv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform2iv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform3f = (ctx, location, x, y, z) => {
    try {
      return webgl.contextArray[ctx].uniform3f(webgl.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform3fv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform3fv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform3fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform3i = (ctx, location, x, y, z) => {
    try {
      return webgl.contextArray[ctx].uniform3i(webgl.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3i error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform3iv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform3iv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform3iv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform4f = (ctx, location, x, y, z, w) => {
    try {
      return webgl.contextArray[ctx].uniform4f(webgl.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform4fv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform4fv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform4fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform4i = (ctx, location, x, y, z, w) => {
    try {
      return webgl.contextArray[ctx].uniform4i(webgl.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4i error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniform4iv = (ctx, location, v) => {
    try {
      return webgl.contextArray[ctx].uniform4iv(webgl.uniformLocationArray[location], webgl.getArrayView(v));
    } catch (err) {
      console.log("uniform4iv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniformMatrix2fv = (ctx, location, transpose, value_arr) => {
    try {
      return webgl.contextArray[ctx].uniformMatrix2fv(webgl.uniformLocationArray[location], transpose,
        webgl.getArrayView(value_arr));
    } catch (err) {
      console.log("uniformMatrix2fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniformMatrix3fv = (ctx, location, transpose, value_arr) => {
    try {
      return webgl.contextArray[ctx].uniformMatrix3fv(webgl.uniformLocationArray[location], transpose,
        webgl.getArrayView(value_arr));
    } catch (err) {
      console.log("uniformMatrix3fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.uniformMatrix4fv = (ctx, location, transpose, value_arr) => {
    try {
      return webgl.contextArray[ctx].uniformMatrix4fv(webgl.uniformLocationArray[location], transpose,
        webgl.getArrayView(value_arr));
    } catch (err) {
      console.log("uniformMatrix4fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.useProgram = (ctx, program) => {
    try {
      webgl.contextArray[ctx].useProgram(webgl.programArray[program]);
    } catch (err) {
      console.log("useProgram error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.validateProgram = (ctx, program) => {
    try {
      webgl.contextArray[ctx].validateProgram(webgl.programArray[program]);
    } catch (err) {
      console.log("validateProgram error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib1f = (ctx, indx, x) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib1f(indx, x);
    } catch (err) {
      console.log("vertexAttrib1f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib1fv = (ctx, indx, v) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib1fv(indx, webgl.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib1fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib2f = (ctx, indx, x, y) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib2f(indx, x, y);
    } catch (err) {
      console.log("vertexAttrib2f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib2fv = (ctx, indx, v) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib2fv(indx, webgl.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib2fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib3f = (ctx, indx, x, y, z) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib3f(indx, x, y, z);
    } catch (err) {
      console.log("vertexAttrib3f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib3fv = (ctx, indx, v) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib3fv(indx, webgl.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib3fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib4f = (ctx, indx, x, y, z, w) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib4f(indx, x, y, z, w);
    } catch (err) {
      console.log("vertexAttrib4f error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttrib4fv = (ctx, indx, v) => {
    try {
      return webgl.contextArray[ctx].vertexAttrib4fv(indx, webgl.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib4fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.vertexAttribPointer = (ctx, indx, size, typ, normalized, stride, offset) => {
    try {
      webgl.contextArray[ctx].vertexAttribPointer(indx, size, typ, normalized, stride, offset);
    } catch (err) {
      console.log("vertexAttrib4fv error");
      console.error(err);
    } // end catch
  }

  importObject.webgl.viewport = (ctx, indx, x, y, width, height) => {
    try {
      webgl.contextArray[ctx].viewport(indx, x, y, width, height);
    } catch (err) {
      console.log("viewport error");
      console.error(err);
    } // end catch
  }

  // expiramental webgl2
  importObject.webgl.copyBufferSubData = (ctx, readTarget, writeTarget, readOffset, writeOffset, size) => {
    alert("copyBufferSubData not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.getBufferSubData = (ctx, target, srcByteOffset, dstBuffer, dstOffset, length) => {
    alert("getBufferSubData not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.blitFramebuffer = (ctx, srcX0, srcY0, srcX1, srcY1,
    dstX0, dstY0, dstX1, dstY1,
    mask, filter) => {
    alert("blitFramebuffer not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.framebufferTextureLayer = (ctx, target, attachment, texture, level, layer) => {
    alert("framebufferTextureLayer not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.invalidateFramebuffer = (ctx, target, attachments) => {
    alert("invalidateFramebuffer not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.invalidateSubFramebuffer = (ctx, target, attachments, x, y, width, height) => {
    alert("invalidateSubFramebuffer not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.readBuffer = (ctx, src) => {
    alert("readBuffer not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.getInternalformatParameter = (ctx, target, internalformat, pname) => {
    alert("getInternalformatParameter not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.renderbufferStorageMultisample = (ctx, target, samples, internalformat, width, height) => {
    alert("renderbufferStorageMultisample not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.texStorage2D = (ctx, target, levels, internalformat, width, height) => {
    alert("texStorage2D not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.texStorage3D = (ctx, target, levels, internalformat, width, height, depth) => {
    alert("texStorage3D not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.texSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, typ, pboOffset) => {
    alert("texSubImage3D not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.copyTexSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset, x, y, width, height) => {
    alert("copyTexSubImage3D not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.compressedTexImage3D = (ctx, target, level, internalformat, width,
    height, depth, border, imageSize, offset) => {
    alert("compressedTexImage3D not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.compressedTexSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, imageSize, offset) => {
    alert("compressedTexSubImage3D not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getFragDataLocation = (ctx, program, name) => {
    alert("getFragDataLocation not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform1ui = (ctx, location, v0) => {
    alert("uniform1ui not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform2ui = (ctx, location, v0, v1) => {
    alert("uniform2ui not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform3ui = (ctx, location, v0, v1, v3) => {
    alert("uniform3ui not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform4ui = (ctx, location, v0, v1, v3, v4) => {
    alert("uniform4ui not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform1uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform1uiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform2uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform2uiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform3uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform3uiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniform4uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform4uiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix3x2fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix3x2fv not implemented (expiramental)");
  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix4x2fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x2fv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix2x3fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix2x3fv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix4x3fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x3fv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix2x4fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix2x4fv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformMatrix3x4fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix3x4fv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribI4i = (ctx, index, x, y, z, w) => {
    alert("vertexAttribI4i not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribI4iv = (ctx, index, value_arr) => {
    alert("vertexAttribI4iv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribI4ui = (ctx, index, x, y, z, w) => {
    alert("vertexAttribI4ui not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribI4uiv = (ctx, index, value_arr) => {
    alert("vertexAttribI4uiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribIPointer = (ctx, index, size, typ, stride, offset) => {
    alert("vertexAttribIPointer not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.vertexAttribDivisor = (ctx, index, divisor) => {
    alert("vertexAttribIPointer not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.drawArraysInstanced = (ctx, mode, first, count, instanceCount) => {
    alert("drawArraysInstanced not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.drawElementsInstanced = (ctx, mode, count, typ, offset, instanceCount) => {
    alert("drawElementsInstanced not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.drawRangeElements = (ctx, mode, start, end, count, typ, offset) => {
    alert("drawRangeElements not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.drawBuffers = (ctx, buffers) => {
    alert("drawBuffers not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.clearBufferfv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferfv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.clearBufferiv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.clearBufferuiv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferuiv not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.clearBufferfi = (ctx, buffer, drawbuffer, depth, stencil) => {
    alert("clearBufferfi not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.createQuery = (ctx) => {
    alert("createQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.deleteQuery = (ctx, query) => {
    alert("deleteQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.isQuery = (ctx, query) => {
    alert("isQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.beginQuery = (ctx, target, query) => {
    alert("beginQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.endQuery = (ctx, query) => {
    alert("endQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getQuery = (ctx, query, pname) => {
    alert("getQuery not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getQueryParameter = (ctx, query, pname) => {
    alert("getQueryParameter not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.createSampler = (ctx) => {
    alert("createSampler not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.deleteSampler = (ctx, sampler) => {
    alert("deleteSampler not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.isSampler = (ctx, sampler) => {
    alert("isSampler not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.bindSampler = (ctx, uint, sampler) => {
    alert("bindSampler not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.samplerParameteri = (ctx, sampler, pname, param) => {
    alert("samplerParameteri not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.samplerParameterf = (ctx, sampler, pname, param) => {
    alert("samplerParameterf not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getSamplerParameter = (ctx, sampler, pname) => {
    alert("getSamplerParameter not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.fenceSync = (ctx, condition, flags) => {
    alert("fenceSync not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.isSync = (ctx, sync) => {
    alert("isSync not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.deleteSync = (ctx, sync) => {
    alert("deleteSync not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.clientWaitSync = (ctx, sync, flags, timeout) => {
    alert("clientWaitSync not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.waitSync = (ctx, sync, flags, timeout) => {
    alert("waitSync not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getSyncParameter = (ctx, sync, pname) => {
    alert("getSyncParameter not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.createTransformFeedback = (ctx) => {
    alert("createTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.deleteTransformFeedback = (ctx, tf) => {
    alert("deleteTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.isTransformFeedback = (ctx, tf) => {
    alert("isTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.bindTransformFeedback = (ctx, target, tf) => {
    alert("bindTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.beginTransformFeedback = (ctx, primitiveMode) => {
    alert("beginTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.endTransformFeedback = (ctx) => {
    alert("endTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.transformFeedbackVaryings = (ctx, program, varyings, bufferMode) => {
    alert("transformFeedbackVaryings not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getTransformFeedbackVarying = (ctx, program, index) => {
    alert("getTransformFeedbackVarying not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.pauseTransformFeedback = (ctx) => {
    alert("pauseTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.resumeTransformFeedback = (ctx) => {
    alert("resumeTransformFeedback not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.bindBufferBase = (ctx, target, index, buffer) => {
    alert("bindBufferBase not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.bindBufferRange = (ctx, target, index, buffer, offset, size) => {
    alert("bindBufferRange not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getIndexedParameter = (ctx, target, index) => {
    alert("getIndexedParameter not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getUniformIndices = (ctx, program, uniformNames) => {
    alert("getUniformIndices not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getActiveUniforms = (ctx, program, uniformIndices, pname) => {
    alert("getActiveUniforms not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getUniformBlockIndex = (ctx, program, uniformBlockName) => {
    alert("getUniformBlockIndex not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getActiveUniformBlockParameter = (ctx, program, uniformBlockIndex, pname) => {
    alert("getActiveUniformBlockParameter not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.getActiveUniformBlockName = (ctx, program, uniformBlockIndex) => {
    alert("getActiveUniformBlockName not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.uniformBlockBinding = (ctx, program, uniformBlockIndex, uniformBlockBinding) => {
    alert("uniformBlockBinding not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.createVertexArray = (ctx) => {
    alert("createVertexArray not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.deleteVertexArray = (ctx, vertexArray) => {
    alert("deleteVertexArray not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.isVertexArray = (ctx, vertexArray) => {
    alert("isVertexArray not implemented (expiramental)");

  }

  // expiramental webgl2
  importObject.webgl.bindVertexArray = (ctx, vertexArray) => {
    alert("bindVertexArray not implemented (expiramental)");
  }

}
