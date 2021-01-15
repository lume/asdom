const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const min = require('node-minify');
const imagemin = require('imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const ASWebGLueWasm = './src/webgl.ts';
const ASWebGLueWasmOut = './dist/webgl.wasm';

let ascRun = `asc ${ASWebGLueWasm} --runtime stub -O3 --importMemory -o ${ASWebGLueWasmOut}`;
exec(ascRun);

fs.copyFile('./src/ASWebGLue.js', './dist/ASWebGLue.js', (err) => {
	if (err) throw err;
});

const exampleDirectory = './src/examples/';
const distDirectory = './dist/examples/';

fs.readdir(exampleDirectory, (err, files) => {

	files.forEach(file => {
		if (fs.lstatSync(path.resolve(exampleDirectory, file)).isDirectory()) {
			let subDir = file;
			fs.readdir(exampleDirectory + file, (err, exampleFiles) => {
				exampleFiles.forEach(exampleFile => {
					if (exampleFile.indexOf('.ts') >= 0) {
						let fi = `${exampleDirectory}${subDir}/${exampleFile}`;
						let fo = `${distDirectory}${subDir}/${exampleFile.replace('.ts', '.wasm')}`;
						let ascRun = `asc ${fi} --runtime stub -O3 --importMemory -o ${fo}`;

						exec(ascRun);
					}
					else if (exampleFile.indexOf('.html') >= 0) {
						min.minify({
							compressor: 'html-minifier',
							input: `${exampleDirectory}${subDir}/${exampleFile}`,
							output: `${distDirectory}${subDir}/${exampleFile}`,
							callback: function (err, min) {
								if (err != null) console.log(err);
							}
						});
					}
					else if (exampleFile.indexOf('.png') >= 0) {
						(async () => {
							let fi = `${exampleDirectory}${subDir}/${exampleFile}`;
							let fo = `${distDirectory}${subDir}`;

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