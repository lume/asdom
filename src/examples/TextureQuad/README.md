# Textured Quad

Drawing sprites in WebGL is usually done by texturing a quad.  In this demo, I draw a sprite using WebGL by texturing a quad (rectangle).

## The Vertex Shader

The vertex shader is pretty striaght forward.  I'm passing in 2D coordinates so the coordinates must be transformed in a vec4 by adding a z and w value to the end of the position object before passing it on to gl_Position.  The UV coordinates are passed on from the vertex shader to the fragment shader without modification. 

Here's the code for the vertex shader:
```
  precision highp float;

  in vec2 position;
  in vec2 tex_coord;

  out vec2 tc;
  
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    tc = tex_coord;
  }
```
## The Fragment Shader

The fragment shader uses the uv coordinates to get the pixel value from the sampler2D passed in as a uniform.  The output color is set to the value retrieved from the sampler with a call to the texture function.  

Here's the fragment shader code:
```
  precision highp float;

  in vec2 position;
  in vec2 tex_coord;

  out vec2 tc;
  
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
    tc = tex_coord;
  }
	```
## Creating the ImageData object

When the Wasm module loads, I have to load an image.  I do so with the following call:

```
var image_id: ImageData = createImage('kaijunicorn.png');
var image_ready: bool = false;
```

The second line creates an image_ready boolean.  I'm going to set this flag when the image is ready so I don't need to make a call to the JavaScript from within the display_loop once the image is ready to render.  

## The Quad Data

I use a StaticArray<f32> where I put the quad's x and y data.  On each line I put the data for a single vertex, which is four f32 values for the x, y, u and v values.  Here's the quad_data:

```
let quad_data: StaticArray<f32> = [
// x      y    u     v
  -0.15, -0.2, 0.0,  0.0,
  -0.15,  0.2, 0.0,  0.99,
  0.15,  -0.2, 0.95, 0.0,
  0.15,   0.2, 0.95, 0.99,];
```

## The displayLoop function

in the displayLoop, I need to check the image_ready flag each time through the loop.  If the image is not ready yet, I need to call the imageReady function:

```
export function displayLoop(): void {
  clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);

  if (image_ready == false) {
    if (imageReady(image_id) == false) {
      return;
    }
```

There are several WebGL functions that need to be called to set up WebGL to render texture data.  It then sets the image_ready flat to true:

```
    pixelStorei(gl, UNPACK_FLIP_Y_WEBGL, 1);
    pixelStorei(gl, UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    activeTexture(gl, TEXTURE0);
    bindTexture(gl, TEXTURE_2D, texture);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MIN_FILTER, NEAREST);
    texParameteri(gl, TEXTURE_2D, TEXTURE_MAG_FILTER, NEAREST);
    texImage2D(gl, TEXTURE_2D, 0, RGB, RGB, UNSIGNED_BYTE, image_id);

    uniform1i(gl, sampler, 0);
    image_ready = true;
  }
```

I buffer the quad's vertex data:
```
  bufferData<f32>(gl, ARRAY_BUFFER, quad_data, STATIC_DRAW);
```

I bind the array buffer to the vertex attributes for the position and uv data:
```
  // attribute |  dimensions | data type | normalize | stride bytes | offset bytes
  vertexAttribPointer(gl, position_al, 2, FLOAT, false, 16, 0);
  vertexAttribPointer(gl, tex_coord_al, 2, FLOAT, false, 16, 8);

```


Finally I draw the arrays:
```
  drawArrays(gl, TRIANGLE_STRIP, 0, quad_data.length / 4);

```

