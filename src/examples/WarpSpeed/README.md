# Warp Speed

This is a pretty simple point drawing app that looked like that screen saver from the early 1990s.  The vertex shader takes in a point and outputs the color, which transitions from gray to white.  

# The Point class

The `Point` class is contains position and direction attributes.  The direction variables `dx` and `dy` are set to a random value between -0.05 and 0.05.  This gives each of the point a different speed as it moves from the center of the canvas to the outer edge.  When the point hits the edge of the canvas, it's `x` and `y` attributes are set back to 0 and the `dx` and `dy` values are once again randomly set.

```
class Point {
  public x: f32 = 0.0;
  public y: f32 = 0.0;
  public dx: f32 = 0.0;
  public dy: f32 = 0.0;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;

    do {
      this.dx = Mathf.random() * 0.1 - 0.05;
      this.dy = Mathf.random() * 0.1 - 0.05;
    } while (Mathf.abs(this.dx) + Mathf.abs(this.dy) < 0.02);
  }

  public move(): void {
    if (this.x > 1.0 || this.x < -1.0 || this.y > 1.0 || this.y < -1.0) {
      this.reset();
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}
```

There is a large `StaticArray` that holds all of the `Point` objects when it is initialized: 
```
let point_list: StaticArray<Point> = [new Point(), new Point(),
```

There is also a `StaticArray` named `point_data` that holds the `f32` data I pass into the shader:

```
let point_data: StaticArray<f32> = [0.0, 0.0, 0.0,
```

In the displayLoop function I clear the canva to black:

```
clearColor(gl, 0.0, 0.0, 0.0, 1.0);
  clear(gl, COLOR_BUFFER_BIT);
```

I then loop over every `Point` object in the `point_list` array, move the point, and then copy the `x` and `y` data into the `point_data array`:

```
  for (let i: i32 = 0; i < point_list.length; i++) {
    point_list[i].move();
    point_data[i * 2] = point_list[i].x;
    point_data[i * 2 + 1] = point_list[i].y;
  }
```

