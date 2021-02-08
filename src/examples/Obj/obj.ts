/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLRenderingContext,
  WebGLShader,
  WebGLProgram,
  ImageData,
  WebGLBuffer,
  GLint,
  WebGLUniformLocation,
} from '../../WebGL';

import {Suzanne_data} from './Suzanne';

const VERTEX_SHADER_CODE: string = `#version 300 es
  precision mediump float;

  in vec3 position;
  in vec3 normal;
  out vec4 c;

  void main() {
    const vec3 light = vec3(0.25, 2.0, -0.5);
    float d = clamp( dot( normal, light ), 0.0, 1.0);
    vec4 pos = vec4( position, 1.0 );

    mat4 mRotateTranslate = mat4(
       1.0, 0.0,       0.0,        0.0, // column 1
       0.0, cos(-0.2),-sin(-0.2), -0.2, // column 2
       0.0, sin(-0.0), cos(-0.2),  0.0, // column 3
       0.0, 0.0,       0.0,        1.0  // column 4
    );

    gl_Position = pos * mRotateTranslate;
    c = vec4(max(d, 0.2), max(d, 0.2), max(d, 0.25), 1.0);
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

let normal_al: GLint = gl.getAttribLocation(program, 'normal');
gl.enableVertexAttribArray(normal_al);

gl.enable(gl.DEPTH_TEST);

// I'M DUPLICATING A LOT OF VERTICES HERE.
// INDEXES WOULD BE BETTER

function rotate(theta: f32): void {
  for (var coord_i: i32 = 0; coord_i < Suzanne_data.length; coord_i += 6) {
    let x: f32 = Suzanne_data[coord_i];
    let z: f32 = Suzanne_data[coord_i + 2];

    let nx: f32 = Suzanne_data[coord_i + 3];
    let nz: f32 = Suzanne_data[coord_i + 5];

    let x1: f32 = x * Mathf.cos(theta) - z * Mathf.sin(theta);
    let z1: f32 = z * Mathf.cos(theta) + x * Mathf.sin(theta);

    let nx1: f32 = nx * Mathf.cos(theta) - nz * Mathf.sin(theta);
    let nz1: f32 = nz * Mathf.cos(theta) + nx * Mathf.sin(theta);

    Suzanne_data[coord_i] = x1;
    Suzanne_data[coord_i + 2] = z1;

    Suzanne_data[coord_i + 3] = nx1;
    Suzanne_data[coord_i + 5] = nz1;
  }

  return;
}

export function displayLoop(delta: i32): void {
  let r: f32 = <f32>delta / 10000.0;
  rotate(r);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.bufferData<f32>(gl.ARRAY_BUFFER, Suzanne_data, gl.DYNAMIC_DRAW);
  //                                   dimensions | data_type | normalize | stride | offset
  gl.vertexAttribPointer(position_al, 3, gl.FLOAT, +false, 24, 0);
  gl.vertexAttribPointer(normal_al, 3, gl.FLOAT, +false, 24, 12);
  gl.drawArrays(gl.TRIANGLES, 0, Suzanne_data.length / 6);
}
