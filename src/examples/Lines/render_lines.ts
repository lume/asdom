import {
  WebGLShader, shaderSource, createShader, compileShader, 
  VERTEX_SHADER, FRAGMENT_SHADER, createProgram, WebGLProgram,
  attachShader, useProgram, WebGLUniformLocation, getUniformLocation,
  uniform4fv, linkProgram, WebGLRenderingContext,
  createBuffer, WebGLBuffer, ARRAY_BUFFER, LINK_STATUS, COMPILE_STATUS,
  STATIC_DRAW, GLint, FLOAT, LINE_LOOP, COLOR_BUFFER_BIT,
  enableVertexAttribArray, bindBuffer, createContextFromCanvas,
  getProgramInfoLog, getShaderInfoLog, clearColor, clear,
  bufferData, getAttribLocation, drawArrays, getShaderParameter,
  vertexAttribPointer, GLuint,
} from '../../webgl'

const V_COLOR_LINE_SHADER:string = /*glsl*/ `#version 300 es
  precision highp float;

  uniform vec4 u_color;

  in vec2 position;
  out vec4 c;
  
  void main() {
    gl_Position = vec4( position, 0.0, 1.0 );
    c = u_color/255.0;
  }
`;

// THIS IS THE FRAGMENT SHADER
const F_SHADER:string = /*glsl*/ `#version 300 es
  precision highp float;

  in vec4 c;
  out vec4 color;

  void main() {
    color = c;
  }
`;

var theta:f32 = 0.0;

var loop_color: StaticArray<StaticArray<f32>> = [
              [0.0,   255.0, 0.0, 255.0],   // default layer color
              [255.0, 255.0, 0.0, 255.0], // cockpit layer color
              [0.0,   255.0, 0.0, 255.0],   // wings layer color
              [0.0,   255.0, 0.0, 255.0],   // wings2 layer color
              [255.0,   0.0, 0.0, 255.0],   // engine layer color
              [0.0,   255.0, 0.0, 255.0],   // recoloration layer color
];

var program_id:i32 = -1;
var default_layer: StaticArray<f32> = [-0.1,0.4,-0.2,0,0,-0.3,0.2,0,0.1,0.4,0.2,0.3,0,0.9,-0.2,0.3];

var cockpit_layer: StaticArray<f32> = [-0.1,0.1,0,0.6,0.1,0.1]; 

var wings_layer: StaticArray<f32> = [0.7,0.2,0.2,0,0,-0.3]; 

var wings2_layer: StaticArray<f32> = [0,-0.3,-0.2,0,-0.7,0.2]; 

var engine_layer: StaticArray<f32> = [-0.1,-0.2,-0.1,-0.3,0.1,-0.3,0.1,-0.2,0,-0.6]; 

var recoloration_layer: StaticArray<f32> = [0.2,0,0,-0.3,-0.2,0,0,-0.3];

var layer_array: StaticArray<StaticArray<f32>> = [default_layer, cockpit_layer, 
                                                  wings_layer, wings2_layer, 
                                                  engine_layer, recoloration_layer];

var color_line_program: WebGLProgram;
var gl: WebGLRenderingContext;

export function init(): void {
  gl = createContextFromCanvas('cnvs', 'webgl2');
  let color_line_vertex_shader: WebGLShader = createShader(gl, VERTEX_SHADER);
  shaderSource(gl, color_line_vertex_shader, V_COLOR_LINE_SHADER);
  compileShader(gl, color_line_vertex_shader);

  let fragment_shader: WebGLShader = createShader(gl, FRAGMENT_SHADER);
  shaderSource( gl, fragment_shader, F_SHADER);
  compileShader( gl, fragment_shader );

  color_line_program = createProgram(gl);

  attachShader(gl, color_line_program, color_line_vertex_shader);
  attachShader(gl, color_line_program, fragment_shader);

  linkProgram( gl, color_line_program );

  useProgram( gl, color_line_program );
  // could use mutable import
  // let color_location: WebGLUniformLocation = getUniformLocation(gl, color_line_program, "u_color");
}
/*Array<f32>*/
function drawLines(line_data: StaticArray<f32>, color_data: StaticArray<f32>):void { 
  let buffer:WebGLBuffer = createBuffer(gl);
  bindBuffer(gl, ARRAY_BUFFER, buffer);
  store<u32>(changetype<usize>(line_data) - 8, idof<StaticArray<f32>>());
  bufferData(gl, ARRAY_BUFFER, line_data, STATIC_DRAW);

  let position_al: GLint = getAttribLocation(gl, color_line_program, 'position');
  enableVertexAttribArray(gl, position_al);

  let color_location:WebGLUniformLocation = getUniformLocation(gl, color_line_program, "u_color");
  store<u32>(changetype<usize>(color_data) - 8, idof<StaticArray<f32>>());
  uniform4fv(gl, color_location, color_data); 

  const dimensions:i32 = 2;
  const data_type: i32 = FLOAT;
  const normalize: i32 = false;
  const stride:i32 = 0;
  const offset:i32 = 0;

  vertexAttribPointer(gl, position_al, dimensions, data_type, normalize, stride, offset);

  drawArrays(gl, LINE_LOOP, 0, line_data.length/2);
}

export function animation_frame():void {
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  theta += 0.01;
  if (theta >= 6.28318) {
    theta = 0.0;
  }

  animation(0.001);

  for (var i:i32 = 0; i < layer_array.length; i++) {
    let loop_size: i32 = layer_array[i].length;

    let layer:StaticArray<f32> = layer_array[i]; //,
    let color: StaticArray<f32> = loop_color[i];

    drawLines(layer, color);
  }
}


export function animation(theta: f32) : void { //u32 {

  for( var ship_i:i32 = 0; ship_i < layer_array.length; ship_i++) {
    const layer = layer_array[ship_i];
    const ship_loop_size = layer.length;

    for( var coord_i: i32 = 0; coord_i < ship_loop_size; coord_i += 2 ) {
      let x:f32 = layer[coord_i];
      let y:f32 = layer[coord_i+1];

      let x1:f32 = x * <f32>Math.cos(theta) - y * <f32>Math.sin(theta);

      let y1:f32 = y * <f32>Math.cos(theta) + x * <f32>Math.sin(theta);

      layer[coord_i] = x1;
      layer[coord_i+1] = y1;
    }
  }
  return;
}