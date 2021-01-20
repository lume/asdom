# ASWebGLue (Assemblyscript WebGL Bindings)

ASWebGLue is a set of javascript bindings for AssemblyScript/WebGL. Currently is being ported into typescript for
better assembly script compatibility. The primary goal of this project is to provide high level access to WebGL
for AssemblyScript projects. The glue adds the webgl exports to your asc program. 

**>>> THIS PROJECT IS IN ALPHA STATE <<<**

## Building 

- First make sure to install the project dependecies with `npm install`
- Once the dependencies have been installed execute `npm run build`
- After the build completes, use `npm start` to launch the example code on your localhost
- Navigate your browser to `http://localhost:8080/examples/` for a simple example. 

## Using

Within your AssemblyScript project run `npm install aswebglue` to install the module. Basically there are two
main files to be concerned with. One. `webgl.ts` exposes the webgl bindings to your assembly script code. The
compiler will pull this into to make sure everything is happy within typescript. The other file is the `ASWebGLuejs` 
which is used to iniatize the loader used by WebAssembly. This file also provides an initialization function
which will attach the webgl bindings to your instatiated WebGL AssemblyScript program. The js file contains all
of the high level WebGL functions which are contained in your browsers `lib.dom.js`. 

Here is a simple example from **HelloTriangle**

**< JavaScript >**
```
 import { initASWebGLue, ASWebGLReady } from '../../ASWebGLue.js';
  const wasm_file = 'triangle.wasm';
  var exports;
  var w = window.innerWidth * 0.99;
  var h = window.innerHeight * 0.99;
  var cnvs = document.getElementById("cnvs");
  if (w > h) {
    cnvs.width = h;
    cnvs.height = h;
  }
  else {
    cnvs.width = w;
    cnvs.height = w;
  }

  function renderFrame() {
    // call the displayLoop function in the WASM module
    exports.displayLoop();

    // requestAnimationFrame calls renderFrame the next time a frame is rendered
    requestAnimationFrame(renderFrame);

  }

  const memory = new WebAssembly.Memory({ initial: 100 }); // linear memory

  var importObject = {
    env: {
      memory: memory,
      seed: Date.now,
    }
  };

  initASWebGLue(importObject);

  (async () => {
    // use WebAssembly.instantiateStreaming in combination with
    // fetch instead of WebAssembly.instantiate and fs.readFileSync
    let obj = await WebAssembly.instantiateStreaming(
      fetch(wasm_file),
      importObject);
    console.log(obj);
    exports = obj.instance.exports;
    console.log(exports);
    ASWebGLReady(obj, importObject);
    requestAnimationFrame(renderFrame);
  })();
  ```
**< AssemblyScript >**
```
import {
  WebGLShader, shaderSource, createShader, compileShader,
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  linkProgram, clearColor, clear, WebGLBuffer,
  createBuffer, ARRAY_BUFFER, GLint,
  STATIC_DRAW, FLOAT, COLOR_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  bufferData, getAttribLocation, drawArrays,
  vertexAttribPointer, TRIANGLE_STRIP,
} from '../../webgl'

const VERTEX_SHADER_CODE:string = /*glsl*/ `#version 300 es
  precision highp float;

  in vec2 position;

  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
  }
`;

const FRAGMENT_SHADER_CODE:string = /*glsl*/ `#version 300 es
  precision highp float;
  out vec4 color;

  void main() {
    color = vec4( 1.0, 0.0, 0.0, 1.0 );
  }
`;

  // initialize webgl
  var gl = createContextFromCanvas('cnvs', 'webgl2');

  let vertex_shader: WebGLShader = createShader(gl, VERTEX_SHADER);
  shaderSource(gl, vertex_shader, VERTEX_SHADER_CODE);
  compileShader(gl, vertex_shader);

  let fragment_shader: WebGLShader = createShader(gl, FRAGMENT_SHADER);
  shaderSource( gl, fragment_shader, FRAGMENT_SHADER_CODE);
  compileShader( gl, fragment_shader );

  let program:WebGLProgram = createProgram(gl);

  attachShader(gl, program, vertex_shader);
  attachShader(gl, program, fragment_shader);

  linkProgram( gl, program );

  useProgram( gl, program );

  let buffer:WebGLBuffer = createBuffer(gl);
  bindBuffer(gl, ARRAY_BUFFER, buffer);

  let position_al:GLint = getAttribLocation(gl, program, 'position');
  enableVertexAttribArray(gl, position_al);

  let triangle_data: StaticArray<f32> = [0.0,0.5,
                                    -0.5,-0.5,
                                    0.5,-0.5,];

  export function displayLoop():void {
    //             R    G    B    A
    clearColor(gl, 0.0, 0.0, 0.0, 1.0);
    clear(gl, COLOR_BUFFER_BIT);

    bufferData<f32>(gl, ARRAY_BUFFER, triangle_data, STATIC_DRAW);

    //                      attribute | dimensions | data_type | normalize | stride | offset
    vertexAttribPointer(gl, position_al, 2,          FLOAT,      false,      0,       0 );

    //                      mode | first vertex | count
    drawArrays(gl, TRIANGLE_STRIP, 0,             3 );
  }

```