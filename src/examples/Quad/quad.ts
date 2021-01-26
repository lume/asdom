/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLRenderingContext, WebGLShader, WebGLProgram, ImageData,
  WebGLBuffer, GLint, WebGLUniformLocation,
} from '../../WebGL'


const VERTEX_SHADER_CODE: string = `#version 300 es
  precision highp float;

  in vec2 position;
  
  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
  }
`;
// THIS IS THE FRAGMENT SHADER
const FRAGMENT_SHADER_CODE: string = `#version 300 es
  precision highp float;
  out vec4 color;

  void main() {
    color = vec4( 0.5, 0.2, 1.0, 1.0 );
  }
`;

// initialize webgl
var gl: WebGLRenderingContext = new WebGLRenderingContext('cnvs', 'webgl2');

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

let quad_data: StaticArray<f32> = [-0.5, -0.5,
-0.5, 0.5,
  0.5, -0.5,
  0.5, 0.5,];

export function displayLoop(delta: i32): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bufferData<f32>(gl.ARRAY_BUFFER, quad_data, gl.STATIC_DRAW);

  const dimensions: i32 = 2;
  const data_type: i32 = gl.FLOAT;
  const normalize: i32 = false;
  const stride: i32 = 0;
  const offset: i32 = 0;

  gl.vertexAttribPointer(position_al, dimensions, data_type, normalize, stride, offset);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, quad_data.length / 2);
}