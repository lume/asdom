/**
 * @author Rick Battagline / https://embed.com/wasm
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
  vertexAttribPointer, TRIANGLE_STRIP, GREATER
} from '../../webgl'

const VERTEX_SHADER_CODE:string = `#version 300 es
  precision highp float;

  in vec3 position;
  in vec3 color;
  out vec4 c;
  
  void main() {
    mat4 mRotateTranslate = mat4(
       1.0, 0.0,       0.0,        0.0, // column 1
       0.0, cos(-0.2),-sin(-0.2), -0.2, // column 2
       0.0, sin(-0.0), cos(-0.2),  0.0, // column 3
       0.0, 0.0,       0.0,        1.0  // column 4
    );

    gl_Position = vec4( position, 1.0 ) * mRotateTranslate;
    c = vec4(color, 1.0);
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

  let color_al = getAttribLocation(gl, program, 'color');
  enableVertexAttribArray(gl, color_al);

  enable(gl, DEPTH_TEST);

  //                                  X    Y    Z     R    G    B
  let cube_data: StaticArray<StaticArray<f32>> = 
                                   [[-0.5,-0.5, 0.5,  1.0, 0.0, 0.0, // front face
                                     -0.5, 0.5, 0.5,  1.0, 0.0, 0.0,
                                      0.5,-0.5, 0.5,  1.0, 0.0, 0.0,
                                      0.5, 0.5, 0.5,  1.0, 0.0, 0.0],
  //  back face                       X    Y    Z     R    G    B
                                    [-0.5,-0.5,-0.5,  0.0, 1.0, 0.0,
                                     -0.5, 0.5,-0.5,  0.0, 1.0, 0.0,
                                      0.5,-0.5,-0.5,  0.0, 1.0, 0.0,
                                      0.5, 0.5,-0.5,  0.0, 1.0, 0.0],
  //  left face                       X    Y    Z     R    G    B
                                    [-0.5,-0.5,-0.5,  0.0, 0.0, 1.0,
                                     -0.5,-0.5, 0.5,  0.0, 0.0, 1.0,
                                     -0.5, 0.5,-0.5,  0.0, 0.0, 1.0,
                                     -0.5, 0.5, 0.5,  0.0, 0.0, 1.0],
  //  right face                      X    Y    Z     R    G    B
                                     [0.5,-0.5,-0.5,  1.0, 0.7, 0.0,
                                      0.5,-0.5, 0.5,  1.0, 0.7, 0.0,
                                      0.5, 0.5,-0.5,  1.0, 0.7, 0.0,
                                      0.5, 0.5, 0.5,  1.0, 0.7, 0.0],
  //  top face                        X    Y    Z     R    G    B
                                    [-0.5, 0.5,-0.5,  1.0, 0.0, 0.7,
                                     -0.5, 0.5, 0.5,  1.0, 0.0, 0.7,
                                      0.5, 0.5,-0.5,  1.0, 0.0, 0.7,
                                      0.5, 0.5, 0.5,  1.0, 0.0, 0.7],
  //  bottom face                     X    Y    Z     R    G    B
                                    [-0.5,-0.5,-0.5,  0.0, 1.0, 0.7,
                                     -0.5,-0.5, 0.5,  0.0, 1.0, 0.7,
                                      0.5,-0.5,-0.5,  0.0, 1.0, 0.7,
                                      0.5,-0.5, 0.5,  0.0, 1.0, 0.7,]];

function rotate(theta: f32) : void { //u32 {
  for( var i: i32 = 0; i < cube_data.length; i++ ) {
    for( var coord_i: i32 = 0; coord_i < cube_data[i].length; coord_i += 6 ) {
      let x:f32 = cube_data[i][coord_i];
      let z:f32 = cube_data[i][coord_i+2];

      let x1:f32 = x * Mathf.cos(theta) - z * Mathf.sin(theta);

      let z1:f32 = z * Mathf.cos(theta) + x * Mathf.sin(theta);

      cube_data[i][coord_i] = x1;
      cube_data[i][coord_i+2] = z1;
    }

  }
  return;
}

  export function displayLoop(delta:i32):void {
    let r: f32 = <f32>delta / 10000.0;
    rotate(r);

    clearColor(gl, 0.0, 0.0, 0.0, 1.0);
    clear(gl, COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT);


    for( var i: i32 = 0; i < 6; i++ ) {
      bufferData<f32>(gl, ARRAY_BUFFER, cube_data[i], DYNAMIC_DRAW);
      //                                   dimensions | data_type | normalize | stride | offset
      vertexAttribPointer(gl, position_al, 3,           FLOAT,      false,      24,      0);
      vertexAttribPointer(gl, color_al,    3,           FLOAT,      false,      24,      12);
      drawArrays(gl, TRIANGLE_STRIP, 0, 4);
    }

  }