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
  importObject.WebGL.activateTexture = (ctx, texture) => {
    WebGL.contextArray[ctx].activateTexture(WebGL.textureArray[texture]);
  }
  */

  importObject.WebGL.getSupportedExtensions = (ctx) => {
    alert('getSupportedExtensions is not currently supported');
  }

  importObject.WebGL.getExtension = (ctx, name_string) => {
    WebGL.contextArray[ctx].getExtension(WebGL.getString(name));
  }

  importObject.WebGL.activeTexture = (ctx, texture) => {
    WebGL.contextArray[ctx].activeTexture(texture);
  }

  importObject.WebGL.attachShader = (ctx, program, shader) => {
    WebGL.contextArray[ctx].attachShader(WebGL.programArray[program], WebGL.shaderArray[shader]);
  }

  importObject.WebGL.bindAttribLocation = (ctx, program, index, name) => {
    WebGL.contextArray[ctx].bindAttribLocation(WebGL.programArray[program], index, WebGL.getString(name));
  }

  importObject.WebGL.bindBuffer = (ctx, target, buffer) => {
    WebGL.contextArray[ctx].bindBuffer(target, WebGL.bufferArray[buffer]);
  }

  importObject.WebGL.bindFramebuffer = (ctx, target, framebuffer) => {
    WebGL.contextArray[ctx].bindFramebuffer(target, WebGL.framebufferArray[framebuffer]);
  }

  importObject.WebGL.bindRenderbuffer = (ctx, target, renderbuffer) => {
    WebGL.contextArray[ctx].bindRenderbuffer(target, WebGL.renderbufferArray[renderbuffer]);
  }

  importObject.WebGL.bindTexture = (ctx, target, texture) => {
    WebGL.contextArray[ctx].bindTexture(target, WebGL.textureArray[texture]);
  }

  importObject.WebGL.blendColor = (ctx, r, g, b, a) => {
    WebGL.contextArray[ctx].blendColor(r, g, b, a);
  }

  importObject.WebGL.blendEquation = (ctx, mode) => {
    WebGL.contextArray[ctx].blendEquation(mode);
  }

  importObject.WebGL.blendEquationSeparate = (ctx, modeRGB, modeAlpha) => {
    WebGL.contextArray[ctx].blendEquationSeparate(modeRGB, modeAlpha);
  }

  importObject.WebGL.blendFunc = (ctx, sfactor, dfactor) => {
    WebGL.contextArray[ctx].blendFunc(sfactor, dfactor);
  }

  importObject.WebGL.blendFuncSeparate = (ctx, srcRGB, dstRGB, srcAlpha, dstAlpha) => {
    WebGL.contextArray[ctx].blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
  }

  const bufferdata = (ctx, target, data, usage) => {
    WebGL.contextArray[ctx].bufferData(target, WebGL.getArrayView(data), usage);
  }

  importObject.WebGL["bufferData<f32>"] = bufferdata;
  importObject.WebGL["bufferData<f64>"] = bufferdata;
  importObject.WebGL["bufferData<i32>"] = bufferdata;

  // LAST TWO PARAMETERS ARE IN WEBGL 2.0
  importObject.WebGL.bufferSubData = (target, dstByteOffset, srcData, srcOffset, length) => {
    WebGL.contextArray[ctx].bufferSubData(target, dstByteOffset, WebGL.getArrayView(srcData), srcOffset, length);
  }

  importObject.WebGL.checkFramebufferStatus = (ctx, target) => {
    return WebGL.contextArray[ctx].checkFramebufferStatus(target);
  }

  // Clears the color, depth and stencil buffers
  importObject.WebGL.clear = (ctx, mask) => {
    WebGL.contextArray[ctx].clear(mask);
  }

  // Specify the color fill a cleared color buffer with
  importObject.WebGL.clearColor = (ctx, r, g, b, a) => {
    WebGL.contextArray[ctx].clearColor(r, g, b, a);
  }

  // Specifies a depth value to fill the depth buffer when it is cleared
  importObject.WebGL.clearDepth = (ctx, depth) => {
    WebGL.contextArray[ctx].clearDepth(depth);
  }

  // Specifies a clear value for the stencil buffer
  importObject.WebGL.clearStencil = (ctx, s) => {
    WebGL.contextArray[ctx].clearStencil(s);
  }

  // Allows you to turn on and off colors when writing to a framebuffer
  importObject.WebGL.colorMask = (ctx, r, g, b, a) => {
    WebGL.contextArray[ctx].colorMask(r, g, b, a);
  }

  // Compiles a GLSL shader to be used by a WebGL program.
  importObject.WebGL.compileShader = (ctx, shader) => {
    WebGL.contextArray[ctx].compileShader(WebGL.shaderArray[shader]);
    var compilationLog = WebGL.contextArray[ctx].getShaderInfoLog(WebGL.shaderArray[shader]);
    console.log(compilationLog);
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Secifies a 2D texture image in a compressed format
  importObject.WebGL.compressedTexImage2D = (ctx, target, level, internalformat, width, height, border, data) => {
    // THIS DOES NOT LOOK RIGHT TO ME
    WebGL.contextArray[ctx].compileShader(target, level, internalformat,
      width, height, border, WebGL.getArrayView(data));
  }

  // NOTE: Requires extensions
  // see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  // Specifies a 2D sub-image rectangle for a compressed format texture image.
  importObject.WebGL.compressedTexSubImage2D = (ctx, target, level, xoffset, yoffset, width, height, format, data) => {
    WebGL.contextArray[ctx].compressedTexSubImage2D(target, xoffset, yoffset, width, height, format,
      WebGL.getArrayView(data));
  }

  // Copies pixels from the current WebGLFramebuffer into a 2D texture image
  importObject.WebGL.copyTexImage2D = (ctx, target, level, internalformat, x, y, width, height, border) => {
    WebGL.contextArray[ctx].copyTexImage2D(target, level, internalformat, x, y, width, height, border);
  }

  // Copies pixels from the current WebGLFramebuffer into an existing 2D texture sub-image
  importObject.WebGL.copyTexSubImage2D = (ctx, target, level, xoffset, yoffset, x, y, width, height) => {
    WebGL.contextArray[ctx].copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
  }

  // Creates a buffer to hold vertex related data
  importObject.WebGL.createBuffer = (ctx) => {
    let id = WebGL.bufferArray.findIndex((element) => element == null);
    let buffer = WebGL.contextArray[ctx].createBuffer();

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
    let program = WebGL.contextArray[ctx].createProgram();

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
      let renderbuffer = WebGL.contextArray[ctx].createRenderbuffer();

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
  importObject.WebGL.createShader = (ctx, type) => {
    let id = WebGL.shaderArray.findIndex((element) => element == null);
    let shader = WebGL.contextArray[ctx].createShader(type);

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
    let texture = WebGL.contextArray[ctx].createTexture();

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
  importObject.WebGL.cullFace = (ctx, mode) => {
    try {
      WebGL.contextArray[ctx].cullFace(target, mode);
    } catch (err) {
      console.log("cullFace error");
      console.error(err);
    } // end catch
  }

  // delete the buffer object
  importObject.WebGL.deleteBuffer = (ctx, buffer) => {
    try {
      WebGL.contextArray[ctx].deleteBuffer(this.bufferArray[buffer]);
      this.bufferArray[buffer] = null;
    } catch (err) {
      console.log("deleteBuffer error");
      console.error(err);
    } // end catch
  }

  // delete the frame buffer object
  importObject.WebGL.deleteFramebuffer = (ctx, frame_buffer) => {
    try {
      WebGL.contextArray[ctx].deleteFramebuffer(this.framebufferArray[frame_buffer]);
      this.framebufferArray[frame_buffer] = null;
    } catch (err) {
      console.log("deleteFramebuffer error");
      console.error(err);
    } // end catch
  }

  // delete the render buffer object
  importObject.WebGL.deleteRenderbuffer = (ctx, render_buffer) => {
    try {
      WebGL.contextArray[ctx].deleteRenderbuffer(this.renderBufferArray[render_buffer]);
      this.renderBufferArray[render_buffer] = null;
    } catch (err) {
      console.log("deleteRenderbuffer error");
      console.error(err);
    } // end catch
  }

  // delete the program object
  importObject.WebGL.deleteProgram = (ctx, program) => {
    try {
      WebGL.contextArray[ctx].deleteProgram(this.programArray[program]);
      this.program[program] = null;
    } catch (err) {
      console.log("deleteProgram error");
      console.error(err);
    } // end catch
  }

  // delete the shader object
  importObject.WebGL.deleteShader = (ctx, shader) => {
    try {
      WebGL.contextArray[ctx].deleteShader(this.shaderArray[shader]);
      this.shaderArray[shader] = null;
    } catch (err) {
      console.log("deleteShader error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.deleteTexture = (ctx, texture) => {
    try {
      WebGL.contextArray[ctx].deleteShader(this.textureArray[texture]);
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
  importObject.WebGL.depthFunc = (ctx, func) => { // func is a depth function enumeration
    try {
      WebGL.contextArray[ctx].depthFunc(func);
    } catch (err) {
      console.log("depthFunc error");
      console.error(err);
    } // end catch
  }

  // enable or disable writing to the depth buffer
  importObject.WebGL.depthMask = (ctx, flag) => {
    try {
      WebGL.contextArray[ctx].depthMask(flag);
    } catch (err) {
      console.log("depthMask error");
      console.error(err);
    } // end catch
  }

  // defines the near and far clipping plane in the depth buffer
  importObject.WebGL.depthRange = (ctx, zNear, zFar) => {
    try {
      WebGL.contextArray[ctx].depthRange(zNear, zFar);
    } catch (err) {
      console.log("depthRange error");
      console.error(err);
    } // end catch
  }

  // detach the shader currently attached to the program
  importObject.WebGL.detachShader = (ctx, program, shader) => {
    try {
      WebGL.contextArray[ctx].detachShader(program, shader);
    } catch (err) {
      console.log("detachShader error");
      console.error(err);
    } // end catch
  }

  // disable a specific WebGL capability
  importObject.WebGL.disable = (ctx, cap) => {
    try {
      WebGL.contextArray[ctx].disable(cap);
    } catch (err) {
      console.log("disable error");
      console.error(err);
    } // end catch
  }

  // disables a vertex attribute array at the index loction passed in.
  importObject.WebGL.disableVertexAttribArray = (ctx, index) => {
    try {
      WebGL.contextArray[ctx].disableVertexAttribArray(index);
    } catch (err) {
      console.log("disableVertexAttribArray error");
      console.error(err);
    } // end catch
  }

  // render primitive data from array
  importObject.WebGL.drawArrays = (ctx, mode, first, count) => {
    try {
      WebGL.contextArray[ctx].drawArrays(mode, first, count);
    } catch (err) {
      console.log("drawArrays error");
      console.error(err);
    } // end catch
  }

  // uses index data to render elements from array data
  importObject.WebGL.drawElements = (ctx, mode, count, typ, offset) => {
    try {
      WebGL.contextArray[ctx].drawElements(mode, count, typ, offset);
    } catch (err) {
      console.log("drawElements error");
      console.error(err);
    } // end catch
  }

  // enable a specific WebGL capability
  importObject.WebGL.enable = (ctx, cap) => {
    try {
      WebGL.contextArray[ctx].enable(cap);
    } catch (err) {
      console.log("enable error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.enableVertexAttribArray = (ctx, index) => {
    WebGL.contextArray[ctx].enableVertexAttribArray(index);
  }

  // waits for all previously executed WebGL api calls to finish
  importObject.WebGL.finish = (ctx) => {
    try {
      WebGL.contextArray[ctx].finish();
    } catch (err) {
      console.log("finish error");
      console.error(err);
    } // end catch
  }

  // ???
  importObject.WebGL.flush = (ctx) => {
    try {
      WebGL.contextArray[ctx].flush();
    } catch (err) {
      console.log("flush error");
      console.error(err);
    } // end catch
  }

  // attach a render buffer to a frame buffer
  importObject.WebGL.framebufferRenderbuffer = (ctx, target, attachment, renderbuffertarget, renderbuffer) => {
    try {
      WebGL.contextArray[ctx].framebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
    } catch (err) {
      console.log("framebufferRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.framebufferTexture2D = (ctx, target, attachment, textarget, texture, level) => {
    try {
      WebGL.contextArray[ctx].framebufferTexture2D(target, attachment, textarget, texture, level);
    } catch (err) {
      console.log("framebufferTexture2D error");
      console.error(err);
    } // end catch
  }

  // set the winding direction of the verticies, which defines the front face
  importObject.WebGL.frontFace = (ctx, mode) => {
    try {
      WebGL.contextArray[ctx].frontFace(mode);
    } catch (err) {
      console.log("frontFace error");
      console.error(err);
    } // end catch
  }

  // generates reduced resolution mipmap textures for rendering objects at a distance
  importObject.WebGL.generateMipmap = (ctx, target) => {
    try {
      WebGL.contextArray[ctx].generateMipmap(target);
    } catch (err) {
      console.log("generateMipmap error");
      console.error(err);
    } // end catch
  }

  // query information about an attribute of a given program
  importObject.WebGL.getActiveAttrib = (ctx, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveAttrib is not implemented");
    return 0;
  }

  // query information about a uniform in a given program
  importObject.WebGL.getActiveUniform = (ctx, program, index) => {
    // will this return an externref?  How do I move in the data
    alert("getActiveUniform is not implemented");
    return 0;
  }

  // needs to return an array of WebGL shaders to the AS
  importObject.WebGL.getAttachedShaders = (ctx, program) => {
    // this will need to return an array of shader indicies.
    alert("getAttachedShaders is not implemented");
    return 0;
  }

  // get an attribute location inside a program given a name
  importObject.WebGL.getAttribLocation = (ctx, program, name) => {
    return WebGL.contextArray[ctx].getAttribLocation(WebGL.programArray[program], WebGL.getString(name));
  }

  // returns an int given a buffer parameter name
  importObject.WebGL.getBufferParameter = (ctx, target, pname) => {
    try {
      return WebGL.contextArray[ctx].getBufferParameter(target, pname);
    } catch (err) {
      console.log("getBufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getParameter = (ctx, pname) => {
    try {
      return WebGL.contextArray[ctx].getParameter(pname);
    } catch (err) {
      console.log("getParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getError = (ctx) => {
    try {
      return WebGL.contextArray[ctx].getError();
    } catch (err) {
      console.log("getError error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getFramebufferAttachmentParameter = (ctx, target, attachment, pname) => {
    try {
      return WebGL.contextArray[ctx].getParameter(target, attachment, pname);
    } catch (err) {
      console.log("getFramebufferAttachmentParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getProgramInfoLog = (ctx, program) => {
    // this needs to return a string to the AS
    alert("getProgramInfoLog not implemented");
    return 0;
  }

  // get information about the renderbuffer
  importObject.WebGL.getRenderbufferParameter = (ctx, target, pname) => {
    try {
      return WebGL.contextArray[ctx].getRenderbufferParameter(target, pname);
    } catch (err) {
      console.log("getRenderbufferParameter error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.getShaderParameter = (ctx, shader, pname) => {
    alert("getShaderParameter not implemented");
    return 0;
  }

  importObject.WebGL.getShaderPrecisionFormat = (ctx, shadertype, precisiontype) => {
    alert("getShaderPrecisionFormat not implemented");
    return 0;
  }

  importObject.WebGL.getShaderInfoLog = (ctx, shader) => {
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.WebGL.getShaderSource = (ctx, shader) => {
    // this needs to return a string to AS
    alert("getShaderInfoLog not implemented");
    return 0;
  }

  importObject.WebGL.getTexParameter = (ctx, target, pname) => {
    alert("getTexParameter not implemented");
    return 0;
  }

  importObject.WebGL.getUniform = (ctx, program, location) => {
    // this can return multiple types
    alert("getUniform not implemented");
    return 0;
  }

  importObject.WebGL.getUniformLocation = (ctx, program, name) => {
    let id = WebGL.uniformLocationArray.findIndex((element) => element == null);
    let uniformLocation = WebGL.contextArray[ctx].getUniformLocation(WebGL.programArray[program], WebGL.getString(name));

    if (id == -1) {
      id = WebGL.uniformLocationArray.length;
      WebGL.uniformLocationArray.push(uniformLocation);
    }
    else {
      WebGL.uniformLocationArray[id] = uniformLocation;
    }

    return id;
  }

  importObject.WebGL.getVertexAttrib = (ctx, index, pname) => {
    // this can return multiple types
    alert("getVertexAttrib not implemented");
    return 0;
  }

  // given a vertex attribute index, return the offset value
  importObject.WebGL.getVertexAttribOffset = (ctx, index, pname) => {
    try {
      return WebGL.contextArray[ctx].getVertexAttribOffset(index, pname);
    } catch (err) {
      console.log("getVertexAttribOffset error");
      console.error(err);
    } // end catch
  }

  // sets shader behaviorial hints, which could potentially improve performance on some implementations
  importObject.WebGL.hint = (ctx, target, mode) => {
    try {
      return WebGL.contextArray[ctx].hint(target, mode);
    } catch (err) {
      console.log("hint error");
      console.error(err);
    } // end catch
  }

  // THIS MAY JUST NEED TO CHECK TO SEE IF THE NUMBER IS IN THE RENDERBUFFER ARRAY
  // THERE ARE SEVERAL OF THESE isX FUNCTIONS.  I'M NOT SURE IF ANY OF THEM ARE USEFUL
  // IN THE AS CODE
  importObject.WebGL.isBuffer = (ctx, buffer) => {
    try {
      return WebGL.contextArray[ctx].isBuffer(WebGL.bufferArray[buffer]);
    } catch (err) {
      console.log("isBuffer error");
      console.error(err);
    } // end catch
  }

  // tests a WebGL capability to see if it is enabled
  importObject.WebGL.isEnabled = (ctx, cap) => {
    try {
      return WebGL.contextArray[ctx].isEnabled(cap);
    } catch (err) {
      console.log("isEnabled error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isFramebuffer = (ctx, framebuffer) => {
    try {
      return WebGL.contextArray[ctx].isFramebuffer(WebGL.frameBufferArray[framebuffer]);
    } catch (err) {
      console.log("isFramebuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isProgram = (ctx, program) => {
    try {
      return WebGL.contextArray[ctx].isProgram(WebGL.programArray[program]);
    } catch (err) {
      console.log("isProgram error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isRenderbuffer = (ctx, renderbuffer) => {
    try {
      return WebGL.contextArray[ctx].isRenderbuffer(WebGL.renderBufferArray[renderbuffer]);
    } catch (err) {
      console.log("isRenderbuffer error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isShader = (ctx, shader) => {
    try {
      return WebGL.contextArray[ctx].isShader(WebGL.shaderArray[shader]);
    } catch (err) {
      console.log("isShader error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.isTexture = (ctx, texture) => {
    try {
      return WebGL.contextArray[ctx].isTexture(WebGL.textureArray[texture]);
    } catch (err) {
      console.log("isTexture error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.lineWidth = (ctx, width) => {
    try {
      return WebGL.contextArray[ctx].lineWidth(width);
    } catch (err) {
      console.log("lineWidth error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.linkProgram = (ctx, program) => {
    WebGL.contextArray[ctx].linkProgram(WebGL.programArray[program]);

    if (!WebGL.contextArray[ctx].getProgramParameter(WebGL.programArray[program],
      WebGL.contextArray[ctx].LINK_STATUS)) {
      console.log(WebGL.contextArray[ctx].getProgramInfoLog(WebGL.programArray[program]));
    }
  }

  // set pixel storage mode
  importObject.WebGL.pixelStorei = (ctx, pname, param) => {
    WebGL.contextArray[ctx].pixelStorei(pname, param);
  }

  // ???
  importObject.WebGL.polygonOffset = (ctx, factor, units) => {
    try {
      WebGL.contextArray[ctx].polygonOffset(factor, units);
    } catch (err) {
      console.log("polygonOffset error");
      console.error(err);
    } // end catch
  }

  // read a block of pixels into an array buffer view
  importObject.WebGL.readPixels = (ctx, x, y, width, height, format, typ, pixels) => {
    alert("readPixels not implemented");
  }

  // create and initialize a renderbuffer object's data store
  importObject.WebGL.renderbufferStorage = (ctx, target, internalformat, width, height) => {
    try {
      WebGL.contextArray[ctx].renderbufferStorage(target, internalformat, width, height);
    } catch (err) {
      console.log("renderbufferStorage error");
      console.error(err);
    } // end catch
  }

  // sampling for anti-aliasing.  SAMPLE_COVERAGE must be enabled.
  importObject.WebGL.sampleCoverage = (ctx, value, invert) => {
    try {
      WebGL.contextArray[ctx].sampleCoverage(value, invert);
    } catch (err) {
      console.log("sampleCoverage error");
      console.error(err);
    } // end catch
  }

  // create a scissor box to draw inside.  SCISSOR_TEST must be enabled.
  importObject.WebGL.scissor = (ctx, x, y, width, height) => {
    try {
      WebGL.contextArray[ctx].scissor(x, y, width, height);
    } catch (err) {
      console.log("scissor error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.shaderSource = (ctx, shader, source) => {
    WebGL.contextArray[ctx].shaderSource(WebGL.shaderArray[shader], WebGL.getString(source));
  }

  // sets a function for allowing pixels to pass through a stencil.  STENCIL_TEST must be set.
  importObject.WebGL.stencilFunc = (ctx, func, ref, mask) => {
    try {
      WebGL.contextArray[ctx].stencilFunc(func, ref, mask);
    } catch (err) {
      console.log("stencilFunc error");
      console.error(err);
    } // end catch
  }

  // allows you to set different stencils for front and back faces.
  importObject.WebGL.stencilFuncSeparate = (ctx, face, func, ref, mask) => {
    try {
      WebGL.contextArray[ctx].stencilFuncSeparate(face, func, ref, mask);
    } catch (err) {
      console.log("stencilFuncSeparate error");
      console.error(err);
    } // end catch
  }

  // defines stencil masking bits
  importObject.WebGL.stencilMask = (ctx, mask) => {
    try {
      WebGL.contextArray[ctx].stencilMask(mask);
    } catch (err) {
      console.log("stencilMask error");
      console.error(err);
    } // end catch
  }

  // use different stencil mask for front and back faces
  importObject.WebGL.stencilMaskSeparate = (ctx, face, mask) => {
    try {
      WebGL.contextArray[ctx].stencilMaskSeparate(face, mask);
    } catch (err) {
      console.log("stencilMaskSeparate error");
      console.error(err);
    } // end catch
  }

  // PROBLEM: zfail is a function
  importObject.WebGL.stencilOp = (ctx, fail, zfail, zpass) => {
    alert("stencilOp is not implemented");
  }

  // PROBLEM: zfail is a function
  importObject.WebGL.stencilOpSeparate = (ctx, face, fail, zfail, zpass) => {
    alert("stencilOpSeparate is not implemented");
  }

  // specify a two-dimensional texture image
  importObject.WebGL.texImage2D = (ctx, target, level, internalformat, format, typ, image_id) => {
    WebGL.contextArray[ctx].texImage2D(target, level, internalformat,
      format, typ, WebGL.imageArray[image_id]);//WebGL.getArrayView(pixels));
  }

  importObject.WebGL.texParameterf = (ctx, target, pname, param) => {
    try {
      WebGL.contextArray[ctx].texParameterf(target, pname, param);
    } catch (err) {
      console.log("texParameterf error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.texParameteri = (ctx, target, pname, param) => {
    WebGL.contextArray[ctx].texParameteri(target, pname, param);
  }

  importObject.WebGL.texSubImage2D = (ctx, target, level, xoffset, yoffset,
    width, height,
    format, typ, pixels) => {
    try {
      WebGL.contextArray[ctx].texSubImage2D(target, level, xoffset, yoffset,
        width, height, format, typ, WebGL.getArrayView(pixels));
    } catch (err) {
      console.log("texSubImage2D error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1f = (ctx, location, x) => {
    try {
      return WebGL.contextArray[ctx].uniform1f(WebGL.uniformLocationArray[location], x);
    } catch (err) {
      console.log("uniform1f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1fv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform1fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform1fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform1i = (ctx, location, x) => {
    return WebGL.contextArray[ctx].uniform1i(WebGL.uniformLocationArray[location], x);
  }

  importObject.WebGL.uniform1iv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform1iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform1iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2f = (ctx, location, x, y) => {
    try {
      return WebGL.contextArray[ctx].uniform2f(WebGL.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2fv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform2fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform2fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2i = (ctx, location, x, y) => {
    try {
      return WebGL.contextArray[ctx].uniform2i(WebGL.uniformLocationArray[location], x, y);
    } catch (err) {
      console.log("uniform2i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform2iv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform2iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform2iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3f = (ctx, location, x, y, z) => {
    try {
      return WebGL.contextArray[ctx].uniform3f(WebGL.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3fv = (ctx, location, v) => {
    try {
      //Float32Array
      //return WebGL.contextArray[ctx].uniform3fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
      return WebGL.contextArray[ctx].uniform3fv(WebGL.uniformLocationArray[location], new Float32Array(v));
    } catch (err) {
      console.log("uniform3fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3i = (ctx, location, x, y, z) => {
    try {
      return WebGL.contextArray[ctx].uniform3i(WebGL.uniformLocationArray[location], x, y, z);
    } catch (err) {
      console.log("uniform3i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform3iv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform3iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform3iv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4f = (ctx, location, x, y, z, w) => {
    try {
      return WebGL.contextArray[ctx].uniform4f(WebGL.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4fv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform4fv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4i = (ctx, location, x, y, z, w) => {
    try {
      return WebGL.contextArray[ctx].uniform4i(WebGL.uniformLocationArray[location], x, y, z, w);
    } catch (err) {
      console.log("uniform4i error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.uniform4iv = (ctx, location, v) => {
    try {
      return WebGL.contextArray[ctx].uniform4iv(WebGL.uniformLocationArray[location], WebGL.getArrayView(v));
    } catch (err) {
      console.log("uniform4iv error");
      console.error(err);
    } // end catch
  }

  // Assumes an f32 as GLfloat
  importObject.WebGL.uniformMatrix2fv = (ctx, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      return WebGL.contextArray[ctx].uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 4));

    } catch (err) {
      console.log("uniformMatrix2fv error");
      console.error(err);
    } // end catch
  }

  // this assumes f32 as GLfloat
  importObject.WebGL.uniformMatrix3fv = (ctx, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      //console.log(new Float32Array(buffer).subarray(start_pos, start_pos + 9));
      return WebGL.contextArray[ctx].uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 9));

    } catch (err) {
      console.log("uniformMatrix3fv error");
      console.error(err);
    } // end catch
  }

  // this assumes f32 as GLfloat
  // I might do this for more functions
  importObject.WebGL.uniformMatrix4fv = (ctx, location, transpose, value_arr) => {
    try {
      const buffer = WebGL.memory.buffer;
      let start_pos = value_arr >> 2;
      return WebGL.contextArray[ctx].uniformMatrix3fv(WebGL.uniformLocationArray[location], transpose,
        new Float32Array(buffer).subarray(start_pos, start_pos + 16));

    } catch (err) {
      console.log("uniformMatrix4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.useProgram = (ctx, program) => {
    WebGL.contextArray[ctx].useProgram(WebGL.programArray[program]);
  }

  importObject.WebGL.validateProgram = (ctx, program) => {
    try {
      WebGL.contextArray[ctx].validateProgram(WebGL.programArray[program]);
    } catch (err) {
      console.log("validateProgram error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib1f = (ctx, indx, x) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib1f(indx, x);
    } catch (err) {
      console.log("vertexAttrib1f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib1fv = (ctx, indx, v) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib1fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib1fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib2f = (ctx, indx, x, y) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib2f(indx, x, y);
    } catch (err) {
      console.log("vertexAttrib2f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib2fv = (ctx, indx, v) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib2fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib2fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib3f = (ctx, indx, x, y, z) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib3f(indx, x, y, z);
    } catch (err) {
      console.log("vertexAttrib3f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib3fv = (ctx, indx, v) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib3fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib3fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib4f = (ctx, indx, x, y, z, w) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib4f(indx, x, y, z, w);
    } catch (err) {
      console.log("vertexAttrib4f error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttrib4fv = (ctx, indx, v) => {
    try {
      return WebGL.contextArray[ctx].vertexAttrib4fv(indx, WebGL.getArrayView(v));
    } catch (err) {
      console.log("vertexAttrib4fv error");
      console.error(err);
    } // end catch
  }

  importObject.WebGL.vertexAttribPointer = (ctx, indx, size, typ, normalized, stride, offset) => {
    WebGL.contextArray[ctx].vertexAttribPointer(indx, size, typ, normalized, stride, offset);
  }

  importObject.WebGL.viewport = (ctx, indx, x, y, width, height) => {
    try {
      WebGL.contextArray[ctx].viewport(indx, x, y, width, height);
    } catch (err) {
      console.log("viewport error");
      console.error(err);
    } // end catch
  }

  // expiramental WebGL2
  importObject.WebGL.copyBufferSubData = (ctx, readTarget, writeTarget, readOffset, writeOffset, size) => {
    alert("copyBufferSubData not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.getBufferSubData = (ctx, target, srcByteOffset, dstBuffer, dstOffset, length) => {
    alert("getBufferSubData not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.blitFramebuffer = (ctx, srcX0, srcY0, srcX1, srcY1,
    dstX0, dstY0, dstX1, dstY1,
    mask, filter) => {
    alert("blitFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.framebufferTextureLayer = (ctx, target, attachment, texture, level, layer) => {
    alert("framebufferTextureLayer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.invalidateFramebuffer = (ctx, target, attachments) => {
    alert("invalidateFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.invalidateSubFramebuffer = (ctx, target, attachments, x, y, width, height) => {
    alert("invalidateSubFramebuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.readBuffer = (ctx, src) => {
    alert("readBuffer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.getInternalformatParameter = (ctx, target, internalformat, pname) => {
    alert("getInternalformatParameter not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.renderbufferStorageMultisample = (ctx, target, samples, internalformat, width, height) => {
    alert("renderbufferStorageMultisample not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texStorage2D = (ctx, target, levels, internalformat, width, height) => {
    alert("texStorage2D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texStorage3D = (ctx, target, levels, internalformat, width, height, depth) => {
    alert("texStorage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.texSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, typ, pboOffset) => {
    alert("texSubImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.copyTexSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset, x, y, width, height) => {
    alert("copyTexSubImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.compressedTexImage3D = (ctx, target, level, internalformat, width,
    height, depth, border, imageSize, offset) => {
    alert("compressedTexImage3D not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.compressedTexSubImage3D = (ctx, target, level, xoffset, yoffset, zoffset,
    width, height, depth, format, imageSize, offset) => {
    alert("compressedTexSubImage3D not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getFragDataLocation = (ctx, program, name) => {
    alert("getFragDataLocation not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform1ui = (ctx, location, v0) => {
    alert("uniform1ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform2ui = (ctx, location, v0, v1) => {
    alert("uniform2ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform3ui = (ctx, location, v0, v1, v3) => {
    alert("uniform3ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform4ui = (ctx, location, v0, v1, v3, v4) => {
    alert("uniform4ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform1uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform1uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform2uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform2uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform3uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform3uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniform4uiv = (ctx, location, data, srcOffset, srcLength) => {
    alert("uniform4uiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix3x2fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix3x2fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix4x2fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x2fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix2x3fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix2x3fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix4x3fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    alert("uniformMatrix4x3fv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix2x4fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    console.trace("uniformMatrix2x4fv");
    alert("uniformMatrix2x4fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.uniformMatrix3x4fv = (ctx, location, transpose, data, srcOffset, srcLength) => {
    console.trace("uniformMatrix3x4fv");
    alert("uniformMatrix3x4fv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4i = (ctx, index, x, y, z, w) => {
    console.trace("vertexAttribI4i");
    alert("vertexAttribI4i not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4iv = (ctx, index, value_arr) => {
    console.trace("vertexAttribI4iv");
    alert("vertexAttribI4iv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4ui = (ctx, index, x, y, z, w) => {
    console.trace("vertexAttribI4ui");
    alert("vertexAttribI4ui not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribI4uiv = (ctx, index, value_arr) => {
    console.trace("vertexAttribI4uiv");
    alert("vertexAttribI4uiv not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribIPointer = (ctx, index, size, typ, stride, offset) => {
    console.trace("vertexAttribIPointer");
    alert("vertexAttribIPointer not implemented (expiramental)");
  }

  // expiramental WebGL2
  importObject.WebGL.vertexAttribDivisor = (ctx, index, divisor) => {
    return WebGL.contextArray[ctx].vertexAttribDivisor(ctx, index, divisor);
  }

  // expiramental WebGL2
  importObject.WebGL.drawArraysInstanced = (ctx, mode, first, count, instanceCount) => {
    return WebGL.contextArray[ctx].drawArraysInstanced(mode, first, count, instanceCount);
  }

  // expiramental WebGL2
  importObject.WebGL.drawElementsInstanced = (ctx, mode, count, typ, offset, instanceCount) => {
    try {
      return WebGL.contextArray[ctx].drawArraysInstanced(mode, count, typ, offset, instanceCount);
    } catch (err) {
      console.log("drawElementsInstanced error");
      console.error(err);
    } // end catch

  }

  // expiramental WebGL2
  importObject.WebGL.drawRangeElements = (ctx, mode, start, end, count, typ, offset) => {
    alert("drawRangeElements not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.drawBuffers = (ctx, buffers) => {
    alert("drawBuffers not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferfv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferfv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferiv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferuiv = (ctx, buffer, drawbuffer, values, srcOffset) => {
    alert("clearBufferuiv not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clearBufferfi = (ctx, buffer, drawbuffer, depth, stencil) => {
    alert("clearBufferfi not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createQuery = (ctx) => {
    alert("createQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteQuery = (ctx, query) => {
    alert("deleteQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isQuery = (ctx, query) => {
    alert("isQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.beginQuery = (ctx, target, query) => {
    alert("beginQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.endQuery = (ctx, query) => {
    alert("endQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getQuery = (ctx, query, pname) => {
    alert("getQuery not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getQueryParameter = (ctx, query, pname) => {
    alert("getQueryParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createSampler = (ctx) => {
    alert("createSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteSampler = (ctx, sampler) => {
    alert("deleteSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isSampler = (ctx, sampler) => {
    alert("isSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindSampler = (ctx, uint, sampler) => {
    alert("bindSampler not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.samplerParameteri = (ctx, sampler, pname, param) => {
    alert("samplerParameteri not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.samplerParameterf = (ctx, sampler, pname, param) => {
    alert("samplerParameterf not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getSamplerParameter = (ctx, sampler, pname) => {
    alert("getSamplerParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.fenceSync = (ctx, condition, flags) => {
    alert("fenceSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isSync = (ctx, sync) => {
    alert("isSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteSync = (ctx, sync) => {
    alert("deleteSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.clientWaitSync = (ctx, sync, flags, timeout) => {
    alert("clientWaitSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.waitSync = (ctx, sync, flags, timeout) => {
    alert("waitSync not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getSyncParameter = (ctx, sync, pname) => {
    alert("getSyncParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createTransformFeedback = (ctx) => {
    alert("createTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.deleteTransformFeedback = (ctx, tf) => {
    alert("deleteTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isTransformFeedback = (ctx, tf) => {
    alert("isTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindTransformFeedback = (ctx, target, tf) => {
    alert("bindTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.beginTransformFeedback = (ctx, primitiveMode) => {
    alert("beginTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.endTransformFeedback = (ctx) => {
    alert("endTransformFeedback not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.transformFeedbackVaryings = (ctx, program, varyings, bufferMode) => {
    alert("transformFeedbackVaryings not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getTransformFeedbackVarying = (ctx, program, index) => {
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
  importObject.WebGL.bindBufferBase = (ctx, target, index, buffer) => {
    alert("bindBufferBase not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindBufferRange = (ctx, target, index, buffer, offset, size) => {
    alert("bindBufferRange not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getIndexedParameter = (ctx, target, index) => {
    alert("getIndexedParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getUniformIndices = (ctx, program, uniformNames) => {
    alert("getUniformIndices not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniforms = (ctx, program, uniformIndices, pname) => {
    alert("getActiveUniforms not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getUniformBlockIndex = (ctx, program, uniformBlockName) => {
    alert("getUniformBlockIndex not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniformBlockParameter = (ctx, program, uniformBlockIndex, pname) => {
    alert("getActiveUniformBlockParameter not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.getActiveUniformBlockName = (ctx, program, uniformBlockIndex) => {
    alert("getActiveUniformBlockName not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.uniformBlockBinding = (ctx, program, uniformBlockIndex, uniformBlockBinding) => {
    alert("uniformBlockBinding not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.createVertexArray = (ctx) => {
    let id = WebGL.vaoArray.findIndex((element) => element == null);
    let vao = WebGL.contextArray[ctx].createVertexArray();

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
  importObject.WebGL.deleteVertexArray = (ctx, vertexArray) => {
    alert("deleteVertexArray not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.isVertexArray = (ctx, vertexArray) => {
    alert("isVertexArray not implemented (expiramental)");

  }

  // expiramental WebGL2
  importObject.WebGL.bindVertexArray = (ctx, vaoId) => {
    WebGL.contextArray[ctx].bindVertexArray(WebGL.vaoArray[vaoId]);
  }

}
