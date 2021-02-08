# ASWebGLue (Assemblyscript WebGL Bindings)

ASWebGLue is a set of javascript bindings for AssemblyScript/WebGL. Currently is being ported into typescript for
better assembly script compatibility. The primary goal of this project is to provide high level access to WebGL
for AssemblyScript projects. The glue adds the webgl exports to your asc program.

## Using

There are two files in this project to use in your project. These files are `ASWebGLue.js` which contains the JavaScript glue code and `WebGL.ts` that contains the AssemblyScript bindings. There are several examples in the `/src/examples` directory. A version of aswebglue is available on npm, but I didn't create it, so I am not sure how up to date it is.

There are two main files to be concerned with. One. `WebGL.ts` exposes the webgl bindings to your assembly script code. The compiler will pull this into to make sure everything is happy within typescript. The other file is the `ASWebGLuejs` which is used to iniatize the loader used by WebAssembly. This file also provides an initialization function which will attach the webgl bindings to your instatiated WebGL AssemblyScript program. The js file contains all of the high level WebGL functions which are contained in your browsers `lib.dom.js`.

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
  WebGLRenderingContext, WebGLShader, WebGLProgram, WebGLBuffer, GLint,
} from '../../webgl'

const VERTEX_SHADER_CODE: string = /*glsl*/ `#version 300 es
  precision highp float;

  in vec2 position;

  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
  }
`;

const FRAGMENT_SHADER_CODE: string = /*glsl*/ `#version 300 es
  precision highp float;
  out vec4 color;

  void main() {
    color = vec4( 1.0, 0.0, 0.0, 1.0 );
  }
`;

// initialize webgl
var gl = new WebGLRenderingContext('cnvs', 'webgl2');

let vertex_shader: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader, VERTEX_SHADER_CODE);
gl.compileShader(vertex_shader);

let fragment_shader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader, FRAGMENT_SHADER_CODE);
gl.compileShader(fragment_shader);

let program: WebGLProgram = gl.createProgram();

gl.attachShader(program, vertex_shader);
gl.attachShader(program, fragment_shader);

gl.linkProgram(program);

gl.useProgram(program);

let buffer: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

let position_al: GLint = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(position_al);

let triangle_data: StaticArray<f32> = [0.0, 0.5,
  -0.5, -0.5,
  0.5, -0.5,];

export function displayLoop(): void {
  //             R    G    B    A
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bufferData<f32>(gl.ARRAY_BUFFER, triangle_data, gl.STATIC_DRAW);

  //                      attribute | dimensions | data_type | normalize | stride | offset
  gl.vertexAttribPointer(position_al, 2, gl.FLOAT, false, 0, 0);

  //                      mode | first vertex | count
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
}

```

## Conact me

If you have any questions, please feel free to conatct me (Rick) on
<br/><br/>
Twitter: https://twitter.com/battagline @battagline <br/>
LinkeIn: https://www.linkedin.com/in/battagline <br/>
AssemblyScript Discord: https://discord.gg/mNPWbVT4
