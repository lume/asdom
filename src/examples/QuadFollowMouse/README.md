# Quad Follow Mouse

This is a simple *follow the mouse* demo that makes a WebGL quad follow the mouse cursor around the canvas.


## Vertex Shader
The `uniform vec2 quad_pos` is a uniform variable with the x and y coordinates of the mouse relative to the canvas.  This value will be combined with the quad vector data to have your quad follow your mouse cursor.

```
precision highp float;

uniform vec2 quad_pos;
in vec2 position;

void main() {
  vec2 pos = position + quad_pos;
  gl_Position = vec4( pos, 0.0, 1.0 );
}
```

## Fragment Shader

In the fragment shader code I hardcoded the color I'm passing out of the shader to a purple shade;

```
precision highp float;
out vec4 color;

void main() {
  color = vec4( 0.5, 0.2, 1.0, 1.0 );
}
```

## moveMouse function

The `moveMouse` function replaces the `displayLoop` function in most of the examples.  The `moveMouse` passes in the mouse x and y positions relative to the canvas.  In addition to buffering the data, the `quad_pos` uniform must be set:

```
uniform2f(gl, quad_pos, mouse_x, mouse_y);
```