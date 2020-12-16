/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLShader, shaderSource, createShader, compileShader, 
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  linkProgram, clearColor, clear,
  createBuffer, ARRAY_BUFFER, 
  DYNAMIC_DRAW, FLOAT, COLOR_BUFFER_BIT, DEPTH_TEST, DEPTH_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  bufferData, getAttribLocation, drawArrays, enable, depthFunc,
  vertexAttribPointer, TRIANGLES, GREATER
} from '../../webgl'

import {
  Suzanne_data
} from './Suzanne'

const VERTEX_SHADER_CODE:string = `#version 300 es
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
const FRAGMENT_SHADER_CODE:string = `#version 300 es
  precision highp float;
  in vec4 c;
  out vec4 color;

  void main() {
    color = c;
  }
`;

  // initialize webgl
  var gl = createContextFromCanvas('cnvs', 'webgl2');

  let vertex_shader: WebGLShader = createShader(this.gl, VERTEX_SHADER);
  shaderSource(gl, vertex_shader, VERTEX_SHADER_CODE);
  compileShader(gl, vertex_shader);

  let fragment_shader: WebGLShader = createShader(gl, FRAGMENT_SHADER);
  shaderSource( gl, fragment_shader, FRAGMENT_SHADER_CODE);
  compileShader( gl, fragment_shader );

  let program = createProgram(gl);

  attachShader(gl, program, vertex_shader);
  attachShader(gl, program, fragment_shader);

  linkProgram( gl, program );

  useProgram( gl, program );

  let buffer = createBuffer(gl);
  bindBuffer(gl, ARRAY_BUFFER, buffer);

  let position_al = getAttribLocation(gl, program, 'position');
  enableVertexAttribArray(gl, position_al);

  let normal_al = getAttribLocation(gl, program, 'normal');
  enableVertexAttribArray(gl, normal_al);

  enable(gl, DEPTH_TEST);

  // I'M DUPLICATING A LOT OF VERTICES HERE.
  // INDEXES WOULD BE BETTER

function rotate(theta: f32) : void { //u32 {
  for( var coord_i: i32 = 0; coord_i < Suzanne_data.length; coord_i += 6 ) {
    let x:f32 = Suzanne_data[coord_i];
    let z:f32 = Suzanne_data[coord_i+2];

    let nx:f32 = Suzanne_data[coord_i+3];
    let nz:f32 = Suzanne_data[coord_i+5];

    let x1:f32 = x * Mathf.cos(theta) - z * Mathf.sin(theta);
    let z1:f32 = z * Mathf.cos(theta) + x * Mathf.sin(theta);

    let nx1:f32 = nx * Mathf.cos(theta) - nz * Mathf.sin(theta);
    let nz1:f32 = nz * Mathf.cos(theta) + nx * Mathf.sin(theta);

    Suzanne_data[coord_i] = x1;
    Suzanne_data[coord_i+2] = z1;

    Suzanne_data[coord_i+3] = nx1;
    Suzanne_data[coord_i+5] = nz1;
  }

  return;
}

  export function displayLoop(delta:i32):void {
    let r: f32 = <f32>delta / 10000.0;
    rotate(r);

    clearColor(gl, 0.0, 0.0, 0.0, 1.0);
    clear(gl, COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT);


      bufferData<f32>(gl, ARRAY_BUFFER, Suzanne_data, DYNAMIC_DRAW);
      //                                   dimensions | data_type | normalize | stride | offset
      vertexAttribPointer(gl, position_al, 3,           FLOAT,      false,      24,      0);
      vertexAttribPointer(gl, normal_al,   3,           FLOAT,      false,      24,      12);
      drawArrays(gl, TRIANGLES, 0, Suzanne_data.length / 6);

  }