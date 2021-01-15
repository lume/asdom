/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLShader, shaderSource, createShader, compileShader,
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  linkProgram, clearColor, clear,
  createBuffer, ARRAY_BUFFER,
  STATIC_DRAW, FLOAT, COLOR_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  bufferData, getAttribLocation, drawArrays,
  vertexAttribPointer, POINTS,
} from '../../webgl'

class Point {
  public x: f32 = 0.0;
  public y: f32 = 0.0;
  public dx: f32 = 0.0;
  public dy: f32 = 0.0;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;

    do {
      this.dx = Mathf.random() * 0.1 - 0.05;
      this.dy = Mathf.random() * 0.1 - 0.05;
    } while (Mathf.abs(this.dx) + Mathf.abs(this.dy) < 0.02);
  }

  public move(): void {
    if (this.x > 1.0 || this.x < -1.0 || this.y > 1.0 || this.y < -1.0) {
      this.reset();
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const VERTEX_SHADER_CODE: string = `#version 300 es
  precision highp float;

  in vec2 position;
  out vec4 c;
  
  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
    float total = clamp(abs(position.x) + abs(position.y) + 0.4, 0.01, 1.0);
    gl_PointSize = total * 8.0;
    c = vec4(total, total, total, 1.0);

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
var gl = createContextFromCanvas('cnvs', 'webgl2');

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

let point_list: StaticArray<Point> = [new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),
new Point(), new Point(), new Point(), new Point(), new Point(),];

let point_data: StaticArray<f32> = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,];

export function displayLoop(delta: i32): void {
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  for (let i: i32 = 0; i < point_list.length; i++) {
    point_list[i].move();
    point_data[i * 2] = point_list[i].x;
    point_data[i * 2 + 1] = point_list[i].y;
  }

  bufferData<f32>(gl, ARRAY_BUFFER, point_data, STATIC_DRAW);

  const dimensions: i32 = 2;
  const data_type: i32 = FLOAT;
  const normalize: i32 = false;
  const stride: i32 = 0;
  const offset: i32 = 0;

  vertexAttribPointer(gl, position_al, dimensions, data_type, normalize, stride, offset);

  drawArrays(gl, POINTS, 0, point_list.length);

}