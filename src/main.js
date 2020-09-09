import * as loader from "./old/loader.js";

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
            ? (thisArg, ...arg) => thisArg[key](...arg)
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

importObject.webgl.gl = gl;
importObject.render_lines = {};
importObject.render_lines.log = (arg) => { console.log(arg) };
importObject.webgl.getJSString = (arg) => { return exports.__getString(arg) };
importObject.webgl.getJSFloat32Array = (arg) => { return exports.__getFloat32Array(arg) };

importObject.webgl.getUniformLocation = (...arg) => {
  return arg[0].getUniformLocation(programs[arg[1]], exports.__getString(arg[2]));;
};

importObject.webgl.createProgram = (...arg) => {
  let id = programs.length;
  let program = arg[0].createProgram();
  programs.push(program);
  return id;
}

importObject.webgl.linkProgram = (...arg) => {
  arg[0].linkProgram(programs[arg[1]]);

  if (!arg[0].getProgramParameter(programs[arg[1]], gl.LINK_STATUS)) {
    console.log(arg[0].getProgramInfoLog(programs[arg[1]]));
  }
}

importObject.webgl.attachShader = (...arg) => {
  arg[0].attachShader(programs[arg[1]], arg[2]);
}

importObject.webgl.shaderSource = (...arg) => {
  arg[0].shaderSource(arg[1], exports.__getString(arg[2]));
}

importObject.webgl.useProgram = (...arg) => {
  arg[0].useProgram(programs[arg[1]]);
}

importObject.webgl.getAttribLocation = (...arg) => {
  return arg[0].getAttribLocation(programs[arg[1]], exports.__getString(arg[2]));
}

// ONLY SUPPORTS F32
importObject.webgl.uniform4fv = (...arg) => {
  return arg[0].uniform4fv(arg[1], exports.__getArrayView(arg[2]));
}

importObject.webgl.getJSArrayViewF32 = (...arg) => {
  return exports.__getFloat32ArrayView(arg[0]);
}

importObject.webgl.getJSArrayViewI32 = (...arg) => {
  return exports.__getInt32ArrayView(arg[0]);
}

importObject.webgl.bufferDataABV = (...arg) => {
  arg[0].bufferData(arg[1], exports.__getArrayView(arg[2]), arg[3]);
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

function render_frame() {
  exports.animation_frame();
  requestAnimationFrame(render_frame);
}

loader.instantiate(fetch('lines.wasm'),
  importObject).then((obj) => {
    console.log(obj);
    exports = obj.exports;
    exports.init();
    requestAnimationFrame(render_frame);
  });
