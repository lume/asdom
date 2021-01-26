/**
 * @author Rick Battagline / https://embed.com/wasm
 */

import {
  WebGLRenderingContext, WebGLShader, WebGLProgram, WebGLBuffer, GLint,
} from '../../WebGL'

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
