import * as loader from "./loader.js";

function bindFlat(obj, base) {
  console.log("bindFlat");
  if (!base) base = {};
  var isPrototype = false;
  for (let i = 0; i < 2; ++i) {
    for (const [key, { value }] of Object.entries(Object.getOwnPropertyDescriptors(obj))) {
      if (typeof value === "function") {
        console.log(`key=${key} value=${value}`);
        if (key !== "constructor") {
          base[key] = isPrototype
            ? (thisArg, ...args) => thisArg[key](...args)
            : value;
        }
      } else {
        console.log(`NOT FUNCTION key=${key} value=${value}`);
        if (isPrototype) {
          const ucKey = key.charAt(0).toUpperCase() + key.substring(1);
          console.log(`ucKey=${ucKey}`);
          base["get" + ucKey] = (thisArg) => thisArg[key];
          base["set" + ucKey] = (thisArg, value) => thisArg[key] = value;
        } else {
          console.log(`key=${key}`);
          base[key] = value;
        }
      }
    }
    if (!(obj = obj.prototype)) break;
    isPrototype = true;
  }
  return base;
}

const memory = new WebAssembly.Memory({ initial: 100 }); // linear memory

const canvas = document.getElementById('cnvs');
const gl = canvas.getContext('webgl2');
var exports = {};
//    console.log(WebGL2RenderingContext);

const programs = []; //Array<WebGLProgram>()

let importObject = {
  webgl: bindFlat(WebGL2RenderingContext)
};

var uniform_remove_me;

importObject.webgl.gl = gl;
importObject.render_lines = {};
importObject.render_lines.log = (arg) => { console.log(arg) };
importObject.webgl.getJSString = (arg) => { return exports.__getString(arg) };
importObject.webgl.getJSFloat32Array = (arg) => { return exports.__getFloat32Array(arg) };
importObject.webgl.getUniformLocation = (...args) => {
  try {
    //var loc = gl.getUniformLocation(args[1], exports.__getString(args[2]));
    uniform_remove_me = gl.getUniformLocation(args[1], exports.__getString(args[2]));
    console.log("**** uniform location ****")
    console.log(uniform_remove_me);
    return uniform_remove_me;
  }
  catch (error) {
    console.error(error);
  }
};
importObject.webgl.uniform4fv = (...args) => {
  try {
    console.log('arg1');
    console.log(args[1]);
    console.log('arg2');
    console.log(args[2]);
    gl.uniform4fv(/*args[1]*/ uniform_remove_me, /*args[2]*/ new Float32Array([255.0, 255.0, 255.0, 255.0]));//exports.__getUint32ArrayView(args[2]));
  }
  catch (error) {
    console.error(error);
  }
};

var remove_me_buffer;

importObject.webgl.createBuffer = (...args) => {
  console.log('createBuffer');
  remove_me_buffer = gl.createBuffer();
  console.log('end createBuffer');
  return remove_me_buffer;
}


importObject.webgl.createProgram = (...args) => {
  let id = programs.length;
  let program = gl.createProgram();
  programs.push(program);
  return id;
}

importObject.webgl.linkProgram = (...args) => {
  gl.linkProgram(programs[args[1]]);

  if (!gl.getProgramParameter(programs[args[1]], gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(programs[args[1]]));
  }
}
//(thisArg: WebGLRenderingContext, program: WebGLProgram): void;

importObject.webgl.attachShader = (...args) => { //  (thisArg: WebGLRenderingContext, program: WebGLProgram, shader: WebGLShader): void;
  gl.attachShader(programs[args[1]], args[2]);
}

importObject.webgl.useProgram = (...args) => {
  gl.useProgram(programs[/*args[1]*/0]);
}

importObject.webgl.getUniformLocation = (...args) => {
  return gl.getUniformLocation(programs[/*args[1]*/0], /*args[2]*/'u_color'); //exports.__getString(args[2]));
}

var position_remove_me;

importObject.webgl.getAttribLocation = (...args) => {
  console.log("getAttribLocation");
  console.log(args);
  /*let*/position_remove_me /*ret_val*/ = gl.getAttribLocation(programs[/*args[1]*/0], 'position'); //exports.__getString(args[2]));
  console.log(`returns ${position_remove_me}`);
  return position_remove_me; //ret_val;
}

importObject.webgl.enableVertexAttribArray = (...args) => {
  console.log("enableVertexAttribArray");
  gl.enableVertexAttribArray(position_remove_me);
  console.log("end enableVertexAttribArray");
}

importObject.webgl.vertexAttribPointer = (...args) => {
  console.log("vertexAttribPointer");
  console.log(args);
  console.log('----');
  //gl.vertexAttribPointer(index,   size,    type,    normalized, stride,  offset);
  //gl.vertexAttribPointer(args[1], args[2], args[3], args[4],    args[5], args[6]);
  gl.vertexAttribPointer(/*args[1]*/position_remove_me, 2, gl.FLOAT, false, 0, 0);
  console.log('----');
}

importObject.webgl.drawArrays = (...args) => {
  console.log("drawArrays");
  gl.drawArrays(gl.LINE_LOOP, 0, args[3]);
  console.log("end drawArrays");
}

importObject.webgl.bindBuffer = (...args) => {
  console.log("call bind buffer");
  gl.bindBuffer(gl.ARRAY_BUFFER, remove_me_buffer); //args[1], args[2]);
  console.log("buffer bound");
}

importObject.webgl.bufferDataABV = (...args) => {
  console.log("call buffer data");
  //thisArg: WebGLRenderingContext, target: GLenum, data: ArrayBufferView, usage: GLenum
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.1, 0.4, -0.2, 0, 0, -0.3, 0.2, 0, 0.1, 0.4, 0.2, 0.3, 0, 0.9, -0.2, 0.3,]), gl.STATIC_DRAW); //args[1], args[2], args[3]);
  console.log("end buffer data");
}

importObject.webgl.getJSArrayViewF32 = (...arg) => {
  console.log("getJSArrayViewF32");
  let arr = exports.__getFloat32ArrayView(arg);
  console.log("end getJSArrayViewF32");
  return arr;
}

importObject.webgl.getJSArrayViewU32 = (...arg) => {
  console.log("getJSArrayViewU32");
  let arr = exports.__getUint32ArrayView(arg);
  console.log("end getJSArrayViewU32");
  return arr;
}

bindFlat({
  prototype: {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "default",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    stencil: false,
    desynchronized: false,

    //    getJSString: function (arg) { return exports.__getString(arg); },
    getJSArrayBuffer: function (arg) { return exports.__getArrayBuffer(arg); },
    getJSArray: function (arg) { return exports.__getArray(arg); },
    /*
    getJSArrayViewF32: function (arg) {
      console.log("getJSArrayViewF32");
      return exports.__getArray(arg);
    },
    getJSArrayViewU32: function (arg) {
      console.log("getJSArrayViewU32");
      return exports.__getArray(arg);
    },
    */
    getJSInt8Array: function (arg) { return exports.__getInt8Array(arg); },
    getJSUint8Array: function (arg) { return exports.__getUint8Array(arg); },
    getJSUint8ClampedArray: function (arg) { return exports.__getUint8ClampedArray(arg); },
    getJSInt16Array: function (arg) { return exports.__getInt16Array(arg); },
    getJSUint16Array: function (arg) { return exports.__getUint16Array(arg); },
    getJSInt32Array: function (arg) { return exports.__getInt32Array(arg); },
    getJSUint32Array: function (arg) { return exports.__getUint32Array(arg); },
    getJSInt64Array: function (arg) { return exports.__getInt64Array(arg); },
    getJSUint64Array: function (arg) { return exports.__getUint64Array(arg); },
    //getJSFloat32Array: function (arg) { return exports.__getFloat32Array(arg); },
    getJSFloat64Array: function (arg) { return exports.__getFloat64Array(arg); },

    getJSArrayView: function (arg) {
      console.log('========= begin arg =============')
      console.log(arg);
      console.log('========= end arg =============')
      return exports.__getArrayView(arg);
    },
    getJSInt8ArrayView: function (arg) { return exports.__getInt8ArrayView(arg); },
    getJSUint8ArrayView: function (arg) { return exports.__getUint8ArrayView(arg); },
    getJSUint8ClampedArrayView: function (arg) { return exports.__getUint8ClampedArrayView(arg); },
    getJSInt16ArrayView: function (arg) { return exports.__getInt16ArrayView(arg); },
    getJSUint16ArrayView: function (arg) { return exports.__getUint16ArrayView(arg); },
    getJSInt32ArrayView: function (arg) { return exports.__getInt32ArrayView(arg); },
    getJSUint32ArrayView: function (arg) { return exports.__getUint32ArrayView(arg); },
    getJSInt64ArrayView: function (arg) { return exports.__getInt64ArrayView(arg); },
    getJSUint64ArrayView: function (arg) { return exports.__getUint64ArrayView(arg); },
    getJSFloat32ArrayView: function (arg) { return exports.__getFloat32ArrayView(arg); },
    getJSFloat64ArrayView: function (arg) { return exports.__getFloat64ArrayView(arg); },
  }
}, importObject.webgl);

bindFlat(WebGLActiveInfo, importObject.webgl);
bindFlat(WebGLShaderPrecisionFormat, importObject.webgl);

//    bindFlat(gl, importObject.webgl);
//importObject.webgl.viewport();

function render_frame() {
  console.log("call animation_frame");
  exports.animation_frame();
  console.log("call requestAnimationFrame");
  //requestAnimationFrame(render_frame);
  console.log("call render_frame");
}

console.log('====================================');
console.log('>> loader <<');
console.log(loader);
loader.instantiate(fetch('lines.wasm'),
  importObject).then((obj) => {
    console.log(obj);
    exports = obj.exports;
    exports.init();
    requestAnimationFrame(render_frame);
  });
console.log('====================================');

/*
clear();
asc_animation = obj.instance.exports.animation;
ship_loop_color_ptr = obj.instance.exports.color_addr();
requestAnimationFrame(animation_frame);
*/

