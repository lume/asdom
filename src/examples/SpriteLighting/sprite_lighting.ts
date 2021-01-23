/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLShader, shaderSource, createShader, compileShader,
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  linkProgram, clearColor, clear, uniform1i, uniform3f,
  createTexture, createBuffer, ARRAY_BUFFER,
  STATIC_DRAW, FLOAT, COLOR_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  bufferData, getAttribLocation, drawArrays,
  vertexAttribPointer, TRIANGLE_STRIP,
  ImageData, createImage, imageReady,
  pixelStorei, activeTexture, bindTexture,
  texParameteri, texImage2D, TEXTURE0, TEXTURE1, TEXTURE_2D,
  SRC_ALPHA, ONE_MINUS_SRC_ALPHA, BLEND, DEPTH_TEST,
  enable, blendFunc,
  TEXTURE_MIN_FILTER, TEXTURE_MAG_FILTER, NEAREST, RGB,
  UNSIGNED_BYTE, UNPACK_FLIP_Y_WEBGL, UNPACK_PREMULTIPLY_ALPHA_WEBGL,
  POINTS,
  logi32, logf32,
} from '../../webgl'

const VS_POINT_CODE: string = `#version 300 es
  in vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 16.0;
  }
`;

const FS_POINT_CODE: string = `#version 300 es
precision highp float;
out vec4 color;

void main() {
  color = vec4(1.0, 1.0, 1.0, 1.0);;
}
`;

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

const FRAGMENT_SHADER_CODE: string = `#version 300 es
  precision highp float;

  in vec2 tc;

  uniform sampler2D sampler;
  uniform sampler2D normal_map;
  uniform vec3 light_source;

  out vec4 color;

  void main() {
    vec3 NormalMap = texture( normal_map, tc ).xyz;
    vec3 norm;
    norm.xyz = NormalMap.rgb * 2.0 - 1.0;

    vec3 N = normalize(norm);
    vec3 L = normalize(light_source);

    float norm_light = clamp(dot( N, L ), 0.5, 2.0);

    color = texture( sampler, tc );
    color.rgb *= norm_light; // / 3.0;
  }
`;

// light source
var light_x: f32 = 0.5;
var light_y: f32 = 0.0;
var light_z: f32 = 0.5;

// initialize webgl
var gl = createContextFromCanvas('cnvs', 'webgl2');


//  ImageData, createImage, imageReady,
var image_id: ImageData = createImage('SpaceShip.png');
var normal_image_id: ImageData = createImage('SpaceShipN.png');
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

let vertex_shader2: WebGLShader = createShader(gl, VERTEX_SHADER);
shaderSource(gl, vertex_shader2, VS_POINT_CODE);
compileShader(gl, vertex_shader2);

let fragment_shader2: WebGLShader = createShader(gl, FRAGMENT_SHADER);
shaderSource(gl, fragment_shader2, FS_POINT_CODE);
compileShader(gl, fragment_shader2);

let program2 = createProgram(gl);

attachShader(gl, program2, vertex_shader2);
attachShader(gl, program2, fragment_shader2);

linkProgram(gl, program2);

useProgram(gl, program2);

let buffer2 = createBuffer(gl);
bindBuffer(gl, ARRAY_BUFFER, buffer2);

let position2_al = getAttribLocation(gl, program2, 'position');
enableVertexAttribArray(gl, position2_al);


let quad_data: StaticArray<f32> = [
  //  x     y     u     v
  -0.15, -0.15, 0.0, 0.0,
  -0.15, 0.15, 0.0, 0.99,
  0.15, -0.15, 0.95, 0.0,
  0.15, 0.15, 0.95, 0.99,];

let light_point: StaticArray<f32> = [
  0.0, 0.0,
];

let texture = createTexture(gl);
let normal_texture = createTexture(gl);
let sampler = getUniformLocation(gl, program, 'sampler');
let normal_map = getUniformLocation(gl, program, 'normal_map');
let light_source = getUniformLocation(gl, program, 'light_source');


function rotateLight(theta: f32): void { //u32 {
  let x: f32 = light_x;
  let y: f32 = light_y;

  light_x = x * Mathf.cos(theta) - y * Mathf.sin(theta);
  light_y = y * Mathf.cos(theta) + x * Mathf.sin(theta);

  light_point[0] = light_x;
  light_point[1] = light_y;
  return;
}


export function displayLoop(delta: i32): void {
  let r: f32 = <f32>delta / 1000.0;
  rotateLight(r);

  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (imageReady(image_id) == false ||
      imageReady(normal_image_id) == false) {
      return;
    }
    useProgram(gl, program);

    pixelStorei(gl, UNPACK_FLIP_Y_WEBGL, 1);
    pixelStorei(gl, UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    activeTexture(gl, TEXTURE0);
    bindTexture(gl, TEXTURE_2D, texture);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    texImage2D(gl, TEXTURE_2D, 0, RGB, RGB, UNSIGNED_BYTE, image_id);

    uniform1i(gl, sampler, 0);


    activeTexture(gl, TEXTURE1);
    bindTexture(gl, TEXTURE_2D, normal_texture);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    texImage2D(gl, TEXTURE_2D, 0, RGB, RGB, UNSIGNED_BYTE, normal_image_id);

    uniform1i(gl, normal_map, 1);
    image_ready = true;
  }
  /*
  logi32(11111111);
  logf32(light_x);
  logf32(light_y);
  logf32(light_z);
  */
  useProgram(gl, program);

  uniform3f(gl, light_source, light_x, light_y, light_z);
  bufferData<f32>(gl, ARRAY_BUFFER, quad_data, STATIC_DRAW);

  //vertexAttribPointer     attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  vertexAttribPointer(gl, position_al, 2, FLOAT, false, 16, 0);
  vertexAttribPointer(gl, tex_coord_al, 2, FLOAT, false, 16, 8);

  drawArrays(gl, TRIANGLE_STRIP, 0, quad_data.length / 4);

  useProgram(gl, program2);
  bufferData<f32>(gl, ARRAY_BUFFER, light_point, STATIC_DRAW);
  vertexAttribPointer(gl, position2_al, 2, FLOAT, false, 8, 0);
  drawArrays(gl, POINTS, 0, 1);

}