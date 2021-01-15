# Drawing a quad

Drawing a quad isn't much different than drawing a triangle.  Quads are used for sprites and billboards in a lot of games, and are rectangles.  The main difference between this and the triangle rendering app is that the quad_data static array variable has eight floats in stead of six, because there are four x, y coordinate pairs:
```
let quad_data: StaticArray<f32> = [-0.5, -0.5,
-0.5, 0.5,
  0.5, -0.5,
  0.5, 0.5,];
```