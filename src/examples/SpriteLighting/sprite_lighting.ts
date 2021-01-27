/**
 * @author Rick Battagline / https://embed.com
 */

import {
  WebGLRenderingContext, WebGLShader, ImageData, WebGLUniformLocation,
  WebGLBuffer, GLint, WebGLProgram, WebGLTexture,
} from '../../WebGL'

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
var gl: WebGLRenderingContext = new WebGLRenderingContext('cnvs', 'webgl2');

//  ImageData, createImage, imageReady,
var image_id: ImageData = gl.createImage('SpaceShip.png');
var normal_image_id: ImageData = gl.createImage('SpaceShipN.png');
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
gl.enableVertexAttribArray(position_al);

let tex_coord_al: GLint = gl.getAttribLocation(program, 'tex_coord');
gl.enableVertexAttribArray(tex_coord_al);

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

let vertex_shader2: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader2, VS_POINT_CODE);
gl.compileShader(vertex_shader2);

let fragment_shader2: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader2, FS_POINT_CODE);
gl.compileShader(fragment_shader2);

let program2: WebGLProgram = gl.createProgram();

gl.attachShader(program2, vertex_shader2);
gl.attachShader(program2, fragment_shader2);

gl.linkProgram(program2);

gl.useProgram(program2);

let buffer2: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);

let position2_al: GLint = gl.getAttribLocation(program2, 'position');
gl.enableVertexAttribArray(position2_al);


let quad_data: StaticArray<f32> = [
  //  x     y     u     v
  -0.15, -0.15, 0.0, 0.0,
  -0.15, 0.15, 0.0, 0.99,
  0.15, -0.15, 0.95, 0.0,
  0.15, 0.15, 0.95, 0.99,];

let light_point: StaticArray<f32> = [
  0.0, 0.0,
];

let texture: WebGLTexture = gl.createTexture();
let normal_texture: WebGLTexture = gl.createTexture();
let sampler: WebGLUniformLocation = gl.getUniformLocation(program, 'sampler');
let normal_map: WebGLUniformLocation = gl.getUniformLocation(program, 'normal_map');
let light_source: WebGLUniformLocation = gl.getUniformLocation(program, 'light_source');


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

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (gl.imageReady(image_id) == false ||
      gl.imageReady(normal_image_id) == false) {
      return;
    }
    gl.useProgram(program);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image_id);

    gl.uniform1i(sampler, 0);


    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, normal_texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, normal_image_id);

    gl.uniform1i(normal_map, 1);
    image_ready = true;
  }
  gl.useProgram(program);

  gl.uniform3f(light_source, light_x, light_y, light_z);
  gl.bufferData<f32>(gl.ARRAY_BUFFER, quad_data, gl.STATIC_DRAW);

  //vertexAttribPointer     attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  gl.vertexAttribPointer(position_al, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(tex_coord_al, 2, gl.FLOAT, false, 16, 8);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, quad_data.length / 4);

  gl.useProgram(program2);
  gl.bufferData<f32>(gl.ARRAY_BUFFER, light_point, gl.STATIC_DRAW);
  gl.vertexAttribPointer(position2_al, 2, gl.FLOAT, false, 8, 0);
  gl.drawArrays(gl.POINTS, 0, 1);
}