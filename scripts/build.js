import { exec } from "child_process"
import fs from "fs"
import path from "path"
import makeDir from "make-dir"
import min from "node-minify"
import imagemin from "imagemin"
import imageminPngQuant from "imagemin-pngquant"

const srcDir = './src/';
const buildDir = './build/'
const examplesDir = 'examples/'
const srcExamplesDir = srcDir + examplesDir;
const buildExamplesDir = buildDir + examplesDir;
const ascFile = 'webgl.ts'
const wasmFile = 'webgl.wasm'
const ascSrcFile = srcDir + ascFile;
const ascOutFile = buildDir + wasmFile;
const ascCmd = `asc ${ascSrcFile} --runtime stub -O3 --importMemory -o ${ascOutFile}`;

console.log("|-> create build dir");
makeDir.sync(buildDir);

console.log("|-> compile assembly script");
exec(ascCmd);

console.log("|-> copying aswebglue files");
fs.copyFile('./src/ASWebGLue.d.ts', './build/ASWebGLue.d.ts', (err) => {
	if (err) throw err;
});
fs.copyFile('./src/ASWebGLue.js', './build/ASWebGLue.js', (err) => {
	if (err) throw err;
});

console.log("|_> building ...");
fs.readdir(srcExamplesDir, (err, files) => {

	files.forEach(file => {
		if (fs.lstatSync(path.resolve(srcExamplesDir, file)).isDirectory()) {
			let subDir = file;
			fs.readdir(srcExamplesDir + file, (err, exampleFiles) => {
				exampleFiles.forEach(exampleFile => {

					if (exampleFile.indexOf('.ts') >= 0) {
						let fi = `${srcExamplesDir}${subDir}/${exampleFile}`;
						let fo = `${buildExamplesDir}${subDir}/${exampleFile.replace('.ts', '.wasm')}`;
						let ascRun = `asc ${fi} --runtime stub -O3 --importMemory -o ${fo}`;

						exec(ascRun);
					}
					else if (exampleFile.indexOf('.html') >= 0) {
						min.minify({
							compressor: 'html-minifier',
							input: `${srcExamplesDir}${subDir}/${exampleFile}`,
							output: `${buildExamplesDir}${subDir}/${exampleFile}`,
							callback: function (err, min) {
								if (err != null) console.log(err);
							}
						});
					}
					else if (exampleFile.indexOf('.png') >= 0) {
						(async () => {
							let fi = `${srcExamplesDir}${subDir}/${exampleFile}`;
							let fo = `${buildExamplesDir}${subDir}`;

							await imagemin([fi], {
								destination: fo,
								plugins: [
									imageminPngQuant({
										quality: [0.6, 0.8]
									})
								]
							});
						})();
					}
				});
			});
		}
	});
});