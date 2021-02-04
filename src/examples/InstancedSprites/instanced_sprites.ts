/**
 * @author Rick Battagline / https://embed.com
 */

// prettier-ignore
import {
  FRAGMENT_SHADER, VERTEX_SHADER, ARRAY_BUFFER, DYNAMIC_DRAW,
  STATIC_DRAW, FLOAT, FALSE, COLOR_BUFFER_BIT, TRIANGLES,
  UNPACK_FLIP_Y_WEBGL, UNPACK_PREMULTIPLY_ALPHA_WEBGL,
  SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DEPTH_TEST, BLEND,
  TEXTURE0, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST,
  TEXTURE_MIN_FILTER, RGBA, UNSIGNED_BYTE, CULL_FACE,
  clearColor, clear, imageReady, pixelStorei,
  uniform1i, drawArraysInstanced, createImage,
  bindTexture, texParameteri, texImage2D,
  blendFunc, disable, enable, activeTexture,
  createShader, bindBuffer, getAttribLocation,
  vertexAttribPointer, vertexAttribDivisor,
  bindVertexArray, enableVertexAttribArray,
  createBuffer, bufferData, createVertexArray,
  shaderSource, compileShader, createProgram,
  attachShader, linkProgram, useProgram,
  createTexture, getUniformLocation,
  createContextFromCanvas, WebGLRenderingContextId,
  WebGLShader, ImageData, WebGLUniformLocation,
  WebGLBuffer, GLint, WebGLProgram, WebGLTexture, WebGLVertexArrayObject,
} from "../../WebGL";

const VERTEX_SHADER_CODE: string = /*glsl*/ `#version 300 es
precision mediump float;
layout (location = 0) in vec2 objPosition;
layout (location = 1) in vec2 position;
layout (location = 2) in vec2 tex_coord;

out vec2 tc;

// 1. 0.0, 0.0 to 0.5, 0.5
// 2. 0.5, 0.0 to 1.0, 0.5
// 3. 0.0, 0.5 to 0.5, 1.0
// 4. 0.5, 0.5 to 1.0, 1.0
const float u_start[4] = float[4](0.0, 0.5, 0.0, 0.5);
const float v_start[4] = float[4](0.0, 0.0, 0.5, 0.5);

void main() {

  gl_Position = vec4(position+objPosition, 0.0, 1.0);
  // gl_InstanceID
  int instance_sprite = gl_InstanceID & 3;
  tc.x = tex_coord.x * 0.5 + u_start[instance_sprite];
  tc.y = tex_coord.y * 0.5 + v_start[instance_sprite];
}
`;

const FRAGMENT_SHADER_CODE: string = /*glsl*/ `#version 300 es
precision mediump float;
in vec2 tc;

uniform sampler2D sampler;

out vec4 color;

void main() {
  color = texture( sampler, tc );
}
`;

// initialize webgl
const asteroidMax: i32 = 500_000;
var asteroidCount: i32 = 0;

var gl: WebGLRenderingContextId = createContextFromCanvas('cnvs', 'webgl2');

var image_id: ImageData = createImage('kaijunicorn-sheet.png');
var image_ready: bool = false;

let vertex_shader: WebGLShader = createShader(gl, VERTEX_SHADER);
shaderSource(gl, vertex_shader, VERTEX_SHADER_CODE);
compileShader(gl, vertex_shader);

let fragment_shader: WebGLShader = createShader(gl, FRAGMENT_SHADER);
shaderSource(gl, fragment_shader, FRAGMENT_SHADER_CODE);
compileShader(gl, fragment_shader);

let program: WebGLProgram = createProgram(gl);

attachShader(gl, program, vertex_shader);
attachShader(gl, program, fragment_shader);

linkProgram(gl, program);

useProgram(gl, program);

let buffer: WebGLBuffer = createBuffer(gl);
bindBuffer(gl, ARRAY_BUFFER, buffer);

let position_al: GLint = getAttribLocation(gl, program, 'position');
let obj_position_al: GLint = getAttribLocation(gl, program, 'objPosition');
let tex_coord_al: GLint = getAttribLocation(gl, program, 'tex_coord');

// prettier-ignore
let quad_data: StaticArray<f32> = [
// x      y     u    v
  -0.05,  0.05, 0.0, 1.0,
  -0.05, -0.05, 0.0, 0.0,
   0.05, -0.05, 1.0, 0.0,

  -0.05, 0.05, 0.0, 1.0,
   0.05, -0.05, 1.0, 0.0,
   0.05, 0.05, 1.0, 1.0,
];

let translation: StaticArray<f32> = new StaticArray<f32>(asteroidMax * 2);

class Asteroid {
  static COUNT: i32 = 0;
  public index: i32 = 0;
  public dx: f32;
  public dy: f32;

  @inline set x(val: f32) {
    translation[this.index << 1] = val;
  }

  @inline get x(): f32 {
    return translation[this.index << 1];
  }

  @inline set y(val: f32) {
    translation[(this.index << 1) + 1] = val;
  }

  @inline get y(): f32 {
    return translation[(this.index << 1) + 1];
  }

  constructor() {
    this.index = Asteroid.COUNT++;
    //this.x = Mathf.random() * 2.0 - 1.0;
    //this.y = Mathf.random() * 2.0 - 1.0;

    this.dx = Mathf.random() / 50.0 - 0.01;
    this.dy = Mathf.random() / 50.0 - 0.01;
  }

  @inline Move(): void {
    this.x += this.dx;
    this.y += this.dy;

    this.x %= 1.0;
    this.y %= 1.0;
    /*
    if (this.x > 1.0) {
      this.x = -1.0;
    } else if (this.x < -1.0) {
      this.x = 1.0;
    }

    if (this.y > 1.0) {
      this.y = -1.0;
    } else if (this.y < -1.0) {
      this.y = 1.0;
    }
    */
  }
}

var asteroidArray: StaticArray<Asteroid> = new StaticArray<Asteroid>(asteroidMax);

for (var i: i32 = 0; i < asteroidMax; i++) {
  asteroidArray[i] = new Asteroid();
}

let texture: WebGLTexture = createTexture(gl);
let sampler: WebGLUniformLocation = getUniformLocation(gl, program, 'sampler');

var quadVAO: WebGLVertexArrayObject;
var quadVBO: WebGLBuffer;
var instanceVBO: WebGLBuffer;

export function init(): void {
  instanceVBO = createBuffer(gl);

  bindBuffer(gl, ARRAY_BUFFER, instanceVBO);
  bufferData(gl, ARRAY_BUFFER, translation, DYNAMIC_DRAW);

  quadVAO = createVertexArray(gl);
  quadVBO = createBuffer(gl);

  bindVertexArray(gl, quadVAO);
  bindBuffer(gl, ARRAY_BUFFER, quadVBO);
  bufferData(gl, ARRAY_BUFFER, quad_data, STATIC_DRAW);

  enableVertexAttribArray(gl, position_al);
  vertexAttribPointer(gl, position_al, 2, FLOAT, +FALSE, 16, 0);

  enableVertexAttribArray(gl, tex_coord_al);
  vertexAttribPointer(gl, tex_coord_al, 2, FLOAT, +FALSE, 16, 8);

  bindBuffer(gl, ARRAY_BUFFER, instanceVBO);

  enableVertexAttribArray(gl, obj_position_al);
  vertexAttribPointer(gl, obj_position_al, 2, FLOAT, +FALSE, 0, 0);

  bindBuffer(gl, ARRAY_BUFFER, 0);

  vertexAttribDivisor(gl, 1, 2);
}

export function displayLoop(): void {
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (imageReady(image_id) == false) {
      return;
    }

    pixelStorei(gl, UNPACK_FLIP_Y_WEBGL, 1);
    pixelStorei(gl, UNPACK_PREMULTIPLY_ALPHA_WEBGL, +true);
    blendFunc(gl, SRC_ALPHA, ONE_MINUS_SRC_ALPHA);
    disable(gl, DEPTH_TEST);
    enable(gl, BLEND);
    enable(gl, CULL_FACE);

    activeTexture(gl, TEXTURE0);
    bindTexture(gl, TEXTURE_2D, texture);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    texImage2D(gl, TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, image_id);

    uniform1i(gl, sampler, 0);
    image_ready = true;
  }

  if (asteroidCount < asteroidMax) {
    asteroidCount += 100;
  }

  for (var i: i32 = 0; i < asteroidCount; i++) {
    asteroidArray[i].Move();
  }

  bindBuffer(gl, ARRAY_BUFFER, instanceVBO);
  bufferData(gl, ARRAY_BUFFER, translation, DYNAMIC_DRAW);

  bindVertexArray(gl, quadVAO);
  drawArraysInstanced(gl, TRIANGLES, 0, 6, asteroidCount);
}
