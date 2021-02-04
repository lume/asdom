/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLRenderingContext, WebGLShader, ImageData, WebGLUniformLocation,
  WebGLBuffer, GLint, WebGLProgram, WebGLTexture, WebGLVertexArrayObject,
} from '../../WebGL';

const VERTEX_SHADER_CODE: string = `#version 300 es
precision mediump float;
layout (location = 0) in vec2 objPosition;
layout (location = 1) in vec2 position;
layout (location = 2) in vec2 tex_coord;

out vec2 tc;

void main() {
  gl_Position = vec4(position+objPosition, 0.0, 1.0);
  tc = tex_coord;
}
`;

const FRAGMENT_SHADER_CODE: string = `#version 300 es
precision mediump float;
in vec2 tc;

uniform sampler2D sampler;

out vec4 color;

void main() {
  color = texture( sampler, tc );
}
`;

// initialize webgl
const asteroidCount: i32 = 100000;

var gl: WebGLRenderingContext = new WebGLRenderingContext('cnvs', 'webgl2');

var image_id: ImageData = gl.createImage('kaijunicorn.png');
var image_ready: bool = false;

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
let obj_position_al: GLint = gl.getAttribLocation(program, 'objPosition');
let tex_coord_al: GLint = gl.getAttribLocation(program, 'tex_coord');

let quad_data: StaticArray<f32> = [
  //  x     y    u   v
  -0.04, 0.05, 0.0, 1.0,
  0.04, -0.05, 1.0, 0.0,
  -0.04, -0.05, 0.0, 0.0,

  -0.04, 0.05, 0.0, 1.0,
  0.04, -0.05, 1.0, 0.0,
  0.04, 0.05, 1.0, 1.0,
];

let translation: StaticArray<f32> = new StaticArray<f32>(asteroidCount * 2);

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

  set y(val: f32) {
    translation[(this.index << 1) + 1] = val;
  }

  get y(): f32 {
    return translation[(this.index << 1) + 1];
  }


  constructor() {
    this.index = Asteroid.COUNT++;
    this.x = Mathf.random() * 2.0 - 1.0;
    this.y = Mathf.random() * 2.0 - 1.0;

    this.dx = Mathf.random() / 50.0 - 0.01;
    this.dy = Mathf.random() / 50.0 - 0.01;
  }

  public Move(): void {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x > 1.0) {
      this.x = -1.0;
    }
    else if (this.x < -1.0) {
      this.x = 1.0;
    }

    if (this.y > 1.0) {
      this.y = -1.0;
    }
    else if (this.y < -1.0) {
      this.y = 1.0;
    }
  }

}

var asteroidArray: StaticArray<Asteroid> = new StaticArray<Asteroid>(asteroidCount);

for (var i: i32 = 0; i < asteroidCount; i++) {
  asteroidArray[i] = new Asteroid();
}

let texture: WebGLTexture = gl.createTexture();
let sampler: WebGLUniformLocation = gl.getUniformLocation(program, 'sampler');

var quadVAO: WebGLVertexArrayObject;
var quadVBO: WebGLBuffer;
var instanceVBO: WebGLBuffer;

export function init(): void {
  instanceVBO = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, instanceVBO);
  gl.bufferData(gl.ARRAY_BUFFER, translation, gl.DYNAMIC_DRAW);

  quadVAO = gl.createVertexArray();
  quadVBO = gl.createBuffer();

  gl.bindVertexArray(quadVAO);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
  gl.bufferData(gl.ARRAY_BUFFER, quad_data, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(position_al);
  gl.vertexAttribPointer(position_al, 2, gl.FLOAT, gl.FALSE, 16, 0);

  gl.enableVertexAttribArray(tex_coord_al);
  gl.vertexAttribPointer(tex_coord_al, 2, gl.FLOAT, gl.FALSE, 16, 8);


  gl.bindBuffer(gl.ARRAY_BUFFER, instanceVBO);

  gl.enableVertexAttribArray(obj_position_al);
  gl.vertexAttribPointer(obj_position_al, 2, gl.FLOAT, gl.FALSE, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, 0);

  gl.vertexAttribDivisor(1, 2);
}

export function displayLoop(): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (gl.imageReady(image_id) == false) {
      return;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image_id);

    gl.uniform1i(sampler, 0);
    image_ready = true;
  }

  for (var i: i32 = 0; i < asteroidCount; i++) {
    asteroidArray[i].Move();
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, instanceVBO);
  gl.bufferData(gl.ARRAY_BUFFER, translation, gl.DYNAMIC_DRAW);

  gl.bindVertexArray(quadVAO);
  gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, asteroidCount);
}