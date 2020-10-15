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
  vertexAttribPointer, TRIANGLE_STRIP, 
} from '../../webgl'

const VERTEX_SHADER_CODE:string = `#version 300 es
  precision highp float;

  in vec2 position;
  
  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
  }
`;
// THIS IS THE FRAGMENT SHADER
const FRAGMENT_SHADER_CODE:string = `#version 300 es
  precision highp float;
  out vec4 color;

  void main() {
    color = vec4( 0.5, 0.2, 1.0, 1.0 );
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

  let quad_data: StaticArray<f32> = [-0.5,-0.5,
                                     -0.5, 0.5,
                                      0.5,-0.5,
                                      0.5, 0.5,];

  export function displayLoop(delta:i32):void {
    clearColor(gl, 0.0, 0.0, 0.0, 1.0);
    clear(gl, COLOR_BUFFER_BIT);

    bufferData<f32>(gl, ARRAY_BUFFER, quad_data, STATIC_DRAW);

    const dimensions:i32 = 2;
    const data_type: i32 = FLOAT;
    const normalize: i32 = false;
    const stride:i32 = 0;
    const offset:i32 = 0;

    vertexAttribPointer(gl, position_al, dimensions, data_type, normalize, stride, offset);

    drawArrays(gl, TRIANGLE_STRIP, 0, quad_data.length/2);
  }