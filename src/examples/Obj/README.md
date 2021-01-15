# Using Wavefront .obj files

This program has a second .ts file that includes the model data for the Blender3D demo monkey (named Suzanne).  This model data was created using the npm module I created called [obj2asc](https://www.npmjs.com/package/obj2asc).

The obj2asc CLI converts a Wavefront .obj file to an AssemblyScript .asc file.  If you use it, and you are using the .ts extension for AssemblyScript, you will need to change the .asc file extension to .ts, or copy and paste the data into an existing .ts file.  You can install obj2asc using npm:
```
npm i obj2asc -g
```