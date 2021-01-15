# Mouse Point

This example renders points that fade away as the mouse moves away from them.  It does this with a point class and an array of those points.  The point gets activated and the alpha value is set to full opacity.
The point then fades out by altering the alpha value as it moves.  The active point data is copied into the array buffer to be rendered on the canvas.