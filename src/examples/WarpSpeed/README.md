# Simple Lighting Model

This is a simple lighting model for cube.  With each call of the displayLoop function I rotate the cube and render it.  

## Vertex Shader

The vertex shader has a fixed light position hardcoded into the shader.  The face lighting is calculated with a simple dot product.  I have a hardcoded rotation matrix that I use to tilt the cube when I render it. The dot product value is used for the red, green and blue components of the color value passed to the fragment shader.  The red and green component has a minimum ambient lighting value of 0.2, and the blue has a minimum value of 0.3.  This gives the cube shadows a slight blue tint.  

Here's the vertex shader code:
```
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
    c = vec4(max(d, 0.2), max(d, 0.2), max(d, 0.3), 1.0);
  }
```
## Fragment Shader

The fragment shader simply outputs the color value coming in from the vertex shader:

```
  precision highp float;
  in vec4 c;
  out vec4 color;

  void main() {
    color = c;
  }
```

## The Cube

The cube vertex data is hardcoded into a StaticArray with each vertex having x,y,z vertex values and x,y,z normal values:

```
let cube_data: StaticArray<f32> = [
  //        X    Y    Z       NX   NY   NZ
  // Front
  -0.5, -0.5, 0.5, 0.0, 0.0, 1.0,
  0.5, -0.5, 0.5, 0.0, 0.0, 1.0,
  -0.5, 0.5, 0.5, 0.0, 0.0, 1.0,

  0.5, 0.5, 0.5, 0.0, 0.0, 1.0,
  -0.5, 0.5, 0.5, 0.0, 0.0, 1.0,
  0.5, -0.5, 0.5, 0.0, 0.0, 1.0,
  //        X    Y    Z       NX   NY   NZ
  // Top
  -0.5, 0.5, -0.5, 0.0, 1.0, 0.0,
  0.5, 0.5, -0.5, 0.0, 1.0, 0.0,
  -0.5, 0.5, 0.5, 0.0, 1.0, 0.0,

  0.5, 0.5, 0.5, 0.0, 1.0, 0.0,
  -0.5, 0.5, 0.5, 0.0, 1.0, 0.0,
  0.5, 0.5, -0.5, 0.0, 1.0, 0.0,
  //        X    Y    Z       NX   NY   NZ
  // Back
  -0.5, -0.5, -0.5, 0.0, 0.0, -1.0,
  0.5, -0.5, -0.5, 0.0, 0.0, -1.0,
  -0.5, 0.5, -0.5, 0.0, 0.0, -1.0,

  0.5, 0.5, -0.5, 0.0, 0.0, -1.0,
  -0.5, 0.5, -0.5, 0.0, 0.0, -1.0,
  0.5, -0.5, -0.5, 0.0, 0.0, -1.0,
  //        X    Y    Z       NX   NY   NZ
  // Right
  0.5, -0.5, -0.5, 1.0, 0.0, 0.0,
  0.5, -0.5, 0.5, 1.0, 0.0, 0.0,
  0.5, 0.5, -0.5, 1.0, 0.0, 0.0,

  0.5, 0.5, 0.5, 1.0, 0.0, 0.0,
  0.5, 0.5, -0.5, 1.0, 0.0, 0.0,
  0.5, -0.5, 0.5, 1.0, 0.0, 0.0,
  // Bottom
  -0.5, -0.5, -0.5, 0.0, -1.0, 0.0,
  0.5, -0.5, -0.5, 0.0, -1.0, 0.0,
  -0.5, -0.5, 0.5, 0.0, -1.0, 0.0,

  0.5, -0.5, 0.5, 0.0, -1.0, 0.0,
  -0.5, -0.5, 0.5, 0.0, -1.0, 0.0,
  0.5, -0.5, -0.5, 0.0, -1.0, 0.0,

  //        X    Y    Z       NX   NY   NZ
  // Left
  -0.5, -0.5, -0.5, -1.0, 0.0, 0.0,
  -0.5, -0.5, 0.5, -1.0, 0.0, 0.0,
  -0.5, 0.5, -0.5, -1.0, 0.0, 0.0,

  -0.5, 0.5, 0.5, -1.0, 0.0, 0.0,
  -0.5, 0.5, -0.5, -1.0, 0.0, 0.0,
  -0.5, -0.5, 0.5, -1.0, 0.0, 0.0,
];
```

## rotate function

The rotate function is called once per frame and rotates the cube data based on the time delta between the current frame and the previous frame:

```
function rotate(theta: f32): void { //u32 {
  for (var coord_i: i32 = 0; coord_i < cube_data.length; coord_i += 6) {
    let x: f32 = cube_data[coord_i];
    let z: f32 = cube_data[coord_i + 2];

    let nx: f32 = cube_data[coord_i + 3];
    let nz: f32 = cube_data[coord_i + 5];

    let x1: f32 = x * Mathf.cos(theta) - z * Mathf.sin(theta);
    let z1: f32 = z * Mathf.cos(theta) + x * Mathf.sin(theta);

    let nx1: f32 = nx * Mathf.cos(theta) - nz * Mathf.sin(theta);
    let nz1: f32 = nz * Mathf.cos(theta) + nx * Mathf.sin(theta);

    cube_data[coord_i] = x1;
    cube_data[coord_i + 2] = z1;

    cube_data[coord_i + 3] = nx1;
    cube_data[coord_i + 5] = nz1;
  }

  return;
}
```

## displayLoop function

The displayLoop is passed the time delta between the previous frame render and this one.  I divide the delta value by 10000.0 because that amount of rotation per second felt right for this demo:
```
  let r: f32 = <f32>delta / 10000.0;
  rotate(r);
```

Everything else is pretty standard for a display loop, clearing the canvas:

```
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT);
```

Buffering the cube data:

```
  bufferData<f32>(gl, ARRAY_BUFFER, cube_data, DYNAMIC_DRAW);
```

Binding the vertex data to the vertex attributes in the shader:

```
  vertexAttribPointer(gl, position_al, 3, FLOAT, false, 24, 0);
  vertexAttribPointer(gl, normal_al, 3, FLOAT, false, 24, 12);
```

Finally, drawing the array:
```
  drawArrays(gl, TRIANGLES, 0, cube_data.length / 6);
```





