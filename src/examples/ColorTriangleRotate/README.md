# Rotating color triangle

This takes the color triangle example and rotates it around the z-axis with a new rotate function:

```
function rotate(theta: f32): void { //u32 {

  for (var coord_i: i32 = 0; coord_i < line_data.length; coord_i += 5) {
    let x: f32 = line_data[coord_i];
    let y: f32 = line_data[coord_i + 1];

    let x1: f32 = x * Mathf.cos(theta) - y * Mathf.sin(theta);

    let y1: f32 = y * Mathf.cos(theta) + x * Mathf.sin(theta);

    line_data[coord_i] = x1;
    line_data[coord_i + 1] = y1;
  }
  return;
}
```