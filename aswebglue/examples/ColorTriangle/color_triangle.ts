/**
 * @author Rick Battagline / https://embed.com/wasm
 */

import {WebGLRenderingContext} from '../../WebGL';

const VERTEX_SHADER_CODE: string = `#version 300 es
  precision highp float;

  layout(location = 0) in vec2 position;
  layout(location = 1) in vec3 color;
  out vec4 c;

  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
    c = vec4(color, 1.0);
  }
`;
// THIS IS THE FRAGMENT SHADER
const FRAGMENT_SHADER_CODE: string = `#version 300 es
  precision highp float;
  in vec4 c;
  out vec4 color;

  void main() {
    color = c;
  }
`;

// initialize webgl
var gl = new WebGLRenderingContext('cnvs', 'webgl2');

let vertex_shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader, VERTEX_SHADER_CODE);
gl.compileShader(vertex_shader);

let fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader, FRAGMENT_SHADER_CODE);
gl.compileShader(fragment_shader);

let program = gl.createProgram();

gl.attachShader(program, vertex_shader);
gl.attachShader(program, fragment_shader);

gl.linkProgram(program);

gl.useProgram(program);

let buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

let position_al = gl.getAttribLocation(program, 'position');

let color_al = gl.getAttribLocation(program, 'color');

// prettier-ignore
let line_data: StaticArray<f32> = [
// X     Y    R    G    B
   0.0,  0.5, 1.0, 0.0, 0.0,
  -0.5, -0.5, 0.0, 1.0, 0.0,
   0.5, -0.5, 0.0, 0.0, 1.0,
];

gl.enableVertexAttribArray(position_al);
gl.enableVertexAttribArray(color_al);

export function displayLoop(delta: i32): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bufferData<f32>(gl.ARRAY_BUFFER, line_data, gl.STATIC_DRAW);

  //vertexAttribPointer     attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  gl.vertexAttribPointer(position_al, 2, gl.FLOAT, +false, 20, 0);
  gl.vertexAttribPointer(color_al, 3, gl.FLOAT, +false, 20, 8);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, line_data.length / 5);
}
