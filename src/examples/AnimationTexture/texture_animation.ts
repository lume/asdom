/**
 * @author Rick Battagline / https://embed.com/wasm
 */

import {
  WebGLRenderingContext
} from '../../WebGL'

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
var gl = new WebGLRenderingContext('cnvs', 'webgl2');


//  ImageData, createImage, imageReady,
var image_id = gl.createImage('kaijunicorn.png');
var image_ready: bool = false;

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
gl.enableVertexAttribArray(position_al);

let tex_coord_al = gl.getAttribLocation(program, 'tex_coord');
gl.enableVertexAttribArray(tex_coord_al);

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

let frame_num = 0;
// frame 44 x 198
//  x    y        u    v
let frame_1: StaticArray<f32> = [-0.15, -0.2, 0.0, 0.01,
-0.15, 0.2, 0.0, 0.33,
  0.15, -0.2, 0.95, 0.01,
  0.15, 0.2, 0.95, 0.33,];

let frame_2: StaticArray<f32> = [-0.15, -0.2, 0.0, 0.33,
-0.15, 0.2, 0.0, 0.66,
  0.15, -0.2, 0.95, 0.33,
  0.15, 0.2, 0.95, 0.66,];

let frame_3: StaticArray<f32> = [-0.15, -0.2, 0.0, 0.66,
-0.15, 0.2, 0.0, 0.999,
  0.15, -0.2, 0.95, 0.66,
  0.15, 0.2, 0.95, 0.999,];


let texture = gl.createTexture();
let sampler = gl.getUniformLocation(program, 'sampler');
let time_left: i32 = 100;

export function displayLoop(delta: i32): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (gl.imageReady(image_id) == false) {
      return;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image_id);

    gl.uniform1i(sampler, 0);
    image_ready = true;
  }

  if (time_left <= 0) {
    if (frame_num == 3) {
      frame_num = 0;
    }
    else {
      frame_num++;
    }
    time_left = 100;
  }
  else {
    time_left -= delta;
  }


  if (frame_num == 0) {
    gl.bufferData<f32>(gl.ARRAY_BUFFER, frame_3, gl.STATIC_DRAW);

  }
  else if (frame_num == 1) {
    gl.bufferData<f32>(gl.ARRAY_BUFFER, frame_2, gl.STATIC_DRAW);
  }
  else if (frame_num == 2) {
    gl.bufferData<f32>(gl.ARRAY_BUFFER, frame_3, gl.STATIC_DRAW);
  }
  else {
    gl.bufferData<f32>(gl.ARRAY_BUFFER, frame_1, gl.STATIC_DRAW);
  }

  //vertexAttribPointer     attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  gl.vertexAttribPointer(position_al, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(tex_coord_al, 2, gl.FLOAT, false, 16, 8);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, frame_1.length / 4);
}