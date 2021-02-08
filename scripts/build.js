import {exec as _exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import min from 'node-minify';
import imagemin from 'imagemin';
import imageminPngQuant from 'imagemin-pngquant';
import {exit} from 'process';
import {promisify} from 'util';

const {readdir, copyFile, lstat, mkdir} = fs.promises;
const exec = promisify(_exec);

// Currently AS projects consume libs' AS code directly, so no need to build
// webgl.wasm into a Wasm module. Maybe later we'll have dynamic and static
// linking, in which case maybe we'd want to ship webgl.wasm too.
/*
const ASWebGLueWasm = './src/webgl.ts';
const ASWebGLueWasmOut = './dist/webgl.wasm';
let ascRun = `asc ${ASWebGLueWasm} --runtime stub -O3 --importMemory -o ${ASWebGLueWasmOut}`;
exec(ascRun);
*/

const distDir = './dist';

if (!fs.existsSync(distDir)) await mkdir(distDir, 0o744);

await copyFile('./src/ASWebGLue.js', './dist/ASWebGLue.js');
await copyFile('./src/ASWebGLue.d.ts', './dist/ASWebGLue.d.ts');

const exampleDirectory = './src/examples/';

// TODO Grab this option from the `--mode` CLI option.
const MODE = 'dev';

// In dev mode, we will output wasm files into the same folders as the example
// source code. This makes it easy to serve the files, and to make quick
// changes to the HTML files and refresh the browser without having to re-build
// all examples again.
const distDirectory = MODE === 'dev' ? './src/examples/' : './dist/examples/';

// TODO Spread `asc` processes across threads using a huristic so we don't
// overload the computer and crash. (Previously this script tried to run `asc`
// on every example in parallel, which would crash if there wasn't enough
// resources). Probably easier to use Gulp task runner for this, so it can
// include watch mode that re-builds only a particular example that is modified
// isntead of re-building everything.
//
// For now, it builds everything, one at a time.

const files = await readdir(exampleDirectory);

for (const file of files) {
  const stats = await lstat(path.resolve(exampleDirectory, file));
  if (!stats.isDirectory()) continue;

  let subDir = file;

  const exampleFiles = await readdir(exampleDirectory + file);

  for (const exampleFile of exampleFiles) {
    if (exampleFile.indexOf('.ts') >= 0) {
      let fi = `${exampleDirectory}${subDir}/${exampleFile}`;
      let fo = `${distDirectory}${subDir}/${exampleFile.replace('.ts', '.wasm')}`;
      let ascRun = `asc ${fi} --runtime stub -O3 --importMemory -o ${fo}`;

      console.log(ascRun);

      try {
        await exec(ascRun);
      } catch (err) {
        console.error('ERROR:\n', err.stderr);
        exit(1);
      }
    } else if (exampleFile.indexOf('.html') >= 0) {
      // We only minify the HTML files and output them into the dist/ dir when building for prod.
      if (MODE === 'prod') {
        console.log(`minify ${subDir}/${exampleFile}`);

        await new Promise((resolve, reject) => {
          min.minify({
            compressor: 'html-minifier',
            input: `${exampleDirectory}${subDir}/${exampleFile}`,
            output: `${distDirectory}${subDir}/${exampleFile}`,
            callback(err, min) {
              if (err) reject(err);
              else resolve();
            },
          });
        });
      }
    } else if (exampleFile.indexOf('.png') >= 0) {
      // We only compress the images and output them into the dist/ dir when building for prod.
      if (MODE === 'prod') {
        let fi = `${exampleDirectory}${subDir}/${exampleFile}`;
        let fo = `${distDirectory}${subDir}`;

        await imagemin([fi], {
          destination: fo,
          plugins: [
            imageminPngQuant({
              quality: [0.6, 0.8],
            }),
          ],
        });
      }
    }
  }
}
