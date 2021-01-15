/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLShader, shaderSource, createShader, compileShader,
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  linkProgram, clearColor, clear, uniform1i,
  createTexture, createBuffer, ARRAY_BUFFER,
  STATIC_DRAW, FLOAT, COLOR_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  bufferData, getAttribLocation, drawArrays,
  vertexAttribPointer, TRIANGLE_STRIP,
  ImageData, createImage, imageReady,
  pixelStorei, activeTexture, bindTexture,
  texParameteri, texImage2D, TEXTURE0, TEXTURE_2D,
  SRC_ALPHA, ONE_MINUS_SRC_ALPHA, BLEND, DEPTH_TEST,
  enable, blendFunc,
  TEXTURE_MIN_FILTER, TEXTURE_MAG_FILTER, NEAREST, RGB,
  UNSIGNED_BYTE, UNPACK_FLIP_Y_WEBGL, UNPACK_PREMULTIPLY_ALPHA_WEBGL,
} from '../../webgl'

const VERTEX_SHADER_CODE: string = `#version 300 es
  precision highp float;

  in vec2 position;
  in vec2 tex_coord;

  out vec2 tc;
  
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    tc = tex_coord;
  }
`;
// THIS IS THE FRAGMENT SHADER
const FRAGMENT_SHADER_CODE: string = `#version 300 es
  precision highp float;

  in vec2 tc;

  uniform sampler2D sampler;

  out vec4 color;

  void main() {
    color = texture( sampler, tc );
  }
`;

// initialize webgl
var gl = createContextFromCanvas('cnvs', 'webgl2');


//  ImageData, createImage, imageReady,
var image_id: ImageData = createImage('kaijunicorn.png');
var image_ready: bool = false;

let vertex_shader: WebGLShader = createShader(gl, VERTEX_SHADER);
shaderSource(gl, vertex_shader, VERTEX_SHADER_CODE);
compileShader(gl, vertex_shader);

let fragment_shader: WebGLShader = createShader(gl, FRAGMENT_SHADER);
shaderSource(gl, fragment_shader, FRAGMENT_SHADER_CODE);
compileShader(gl, fragment_shader);

let program = createProgram(gl);

attachShader(gl, program, vertex_shader);
attachShader(gl, program, fragment_shader);

linkProgram(gl, program);

useProgram(gl, program);

let buffer = createBuffer(gl);
bindBuffer(gl, ARRAY_BUFFER, buffer);

let position_al = getAttribLocation(gl, program, 'position');
enableVertexAttribArray(gl, position_al);

let tex_coord_al = getAttribLocation(gl, program, 'tex_coord');
enableVertexAttribArray(gl, tex_coord_al);

enable(gl, BLEND);
blendFunc(gl, SRC_ALPHA, ONE_MINUS_SRC_ALPHA);

let quad_data: StaticArray<f32> = [
  //  x     y     u     v
  -0.15, -0.2, 0.0, 0.0,
  -0.15, 0.2, 0.0, 0.99,
  0.15, -0.2, 0.95, 0.0,
  0.15, 0.2, 0.95, 0.99,];

let texture = createTexture(gl);
let sampler = getUniformLocation(gl, program, 'sampler');

export function displayLoop(): void {
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (imageReady(image_id) == false) {
      return;
    }

    pixelStorei(gl, UNPACK_FLIP_Y_WEBGL, 1);
    pixelStorei(gl, UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    activeTexture(gl, TEXTURE0);
    bindTexture(gl, TEXTURE_2D, texture);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    texImage2D(gl, TEXTURE_2D, 0, RGB, RGB, UNSIGNED_BYTE, image_id);

    uniform1i(gl, sampler, 0);
    image_ready = true;
  }

  bufferData<f32>(gl, ARRAY_BUFFER, quad_data, STATIC_DRAW);

  //vertexAttribPointer     attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  vertexAttribPointer(gl, position_al, 2, FLOAT, false, 16, 0);
  vertexAttribPointer(gl, tex_coord_al, 2, FLOAT, false, 16, 8);

  drawArrays(gl, TRIANGLE_STRIP, 0, quad_data.length / 4);
}