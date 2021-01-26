/**
 * @author Rick Battagline / https://embed.com/wasm
 */

import {
  WebGLRenderingContext, WebGLShader, WebGLProgram, ImageData,
  WebGLBuffer, GLint, WebGLUniformLocation, WebGLTexture,
} from '../../WebGL'


import {
  objArray, matArray, groupArray, VertGroup, matMapArray, MaterialMap
} from './Moon_Sphere'

// OG CODE
const VERTEX_SHADER_CODE: string = `#version 300 es
precision highp float;

in vec3 position;
in vec3 normal;
in vec2 tex_uv;

out vec3 cam_dir;
out vec3 light_dir;
out vec2 tc;
out vec3 norm;

void main() {
  // rotate z axis
  
    mat4 mRotateTranslate = mat4(
       1.0, 0.0,       0.0,        0.0, // column 1
       0.0, cos(-0.2),-sin(-0.2), -0.2, // column 2
       0.0, sin(-0.0), cos(-0.2),  0.0, // column 3
       0.0, 0.0,       0.0,        1.0  // column 4
    );
  
  vec3 up = vec3(0.0, -1.0, 0.0);
  vec3 light_pos = vec3( 0.0, -0.7, 0.5 );
  float d = dot( up, normal ); 

  vec3 tan = cross( up, normal );
  vec3 bitan = cross( normal, tan );

  vec3 l;
  l.x = dot( tan, light_pos );
  l.y = dot( bitan, light_pos );
  l.z = dot( normal, light_pos );

  light_dir = l; //normalize(l);

  vec3 camera;
  camera.x = dot( tan, position );
  camera.y = dot( bitan, position );
  camera.z = dot( normal, position );

  cam_dir = normalize(camera);
  tc = tex_uv;
  norm = normal;

  gl_Position = vec4(position, 1.0);
}`;

// this shader is super kludgy
const FRAGMENT_SHADER_CODE: string = `#version 300 es
precision highp float;
uniform sampler2D normalMap;
uniform sampler2D sampler;

in vec3 cam_dir;
in vec3 light_dir;
in vec2 tc;
in vec3 norm;

out vec4 color;
void main (void)
{
	vec3 l = normalize(light_dir);
	vec3 e = normalize(-cam_dir);
	vec3 n = 2.0 * texture(normalMap, tc).rgb - 1.0;

	float kd = clamp(dot(l, n + norm - vec3(0.0, 0.0, 1.0)), 0.1, 1.0);

	vec3 tex_color = texture(sampler, tc).rgb;
	vec3 c = kd * tex_color;

  color = vec4( c, 1.0 );
}`;


// initialize webgl
var gl = new WebGLRenderingContext('cnvs', 'webgl2');

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

let tex_uv_al: GLint = gl.getAttribLocation(program, 'tex_uv');
gl.enableVertexAttribArray(tex_uv_al);

let normal_al: GLint = gl.getAttribLocation(program, 'normal');
gl.enableVertexAttribArray(normal_al);

let texture: WebGLTexture = gl.createTexture();
let sampler: WebGLUniformLocation = gl.getUniformLocation(program, 'sampler');

let texture_n: WebGLTexture = gl.createTexture();
let tex_norm: WebGLUniformLocation = gl.getUniformLocation(program, 'normalMap');

var image_id: ImageData = gl.createImage(<string>matMapArray[0].diffuse);
var norm_image_id: ImageData = gl.createImage(<string>matMapArray[0].bump);

var image_ready: bool = false;

//diffuse
gl.enable(gl.DEPTH_TEST);

function rotate(theta: f32): void { //u32 {
  for (var obj_i: i32 = 0; obj_i < objArray.length; obj_i++) {
    for (var coord_i: i32 = 0; coord_i < objArray[obj_i].length; coord_i += 8) {

      let x: f32 = objArray[obj_i][coord_i];
      let z: f32 = objArray[obj_i][coord_i + 2];

      let nx: f32 = objArray[obj_i][coord_i + 5];
      let nz: f32 = objArray[obj_i][coord_i + 7];

      let x1: f32 = x * Mathf.cos(theta) + z * Mathf.sin(theta);
      let z1: f32 = z * Mathf.cos(theta) - x * Mathf.sin(theta);

      let nx1: f32 = nx * Mathf.cos(theta) + nz * Mathf.sin(theta);
      let nz1: f32 = nz * Mathf.cos(theta) - nx * Mathf.sin(theta);

      objArray[obj_i][coord_i] = x1;
      objArray[obj_i][coord_i + 2] = z1;

      objArray[obj_i][coord_i + 5] = nx1;
      objArray[obj_i][coord_i + 7] = nz1;
    }
  }

  return;
}

var vGroup: VertGroup;
export function displayLoop(delta: i32): void {
  let r: f32 = <f32>delta / 10000.0;
  rotate(r);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if (image_ready == false) {
    if (gl.imageReady(image_id) == false || gl.imageReady(norm_image_id) == false) {
      return;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image_id);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture_n);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, norm_image_id);

    gl.uniform1i(sampler, 0);
    image_ready = true;
  }

  for (var g_i: i32 = 0; g_i < groupArray.length; g_i++) {
    vGroup = groupArray[g_i];
    gl.bufferData<f32>(gl.ARRAY_BUFFER, objArray[vGroup.obj_index], gl.DYNAMIC_DRAW);

    //                                   dimensions | data_type | normalize | stride | offset
    gl.vertexAttribPointer(position_al, 3, gl.FLOAT, false, 32, 0);
    gl.vertexAttribPointer(tex_uv_al, 2, gl.FLOAT, false, 32, 12);
    gl.vertexAttribPointer(normal_al, 3, gl.FLOAT, false, 32, 20);
    gl.drawArrays(gl.TRIANGLES, vGroup.start_face, vGroup.length);
  }
}