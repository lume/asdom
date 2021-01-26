const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const min = require('node-minify');
const imagemin = require('imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const { exit } = require("process");
/*
const ASWebGLueWasm = './src/WebGL.ts';
const ASWebGLueWasmOut = './dist/WebGL.wasm';
*/
const distDir = './dist';

if (!fs.existsSync(distDir)) {
	fs.mkdirSync(distDir, 0744);
}
/*
let ascRun = `asc ${ASWebGLueWasm} --runtime stub -O3 --importMemory -o ${ASWebGLueWasmOut}`;
exec(ascRun);
*/
fs.copyFile('./src/ASWebGLue.js', './dist/ASWebGLue.js', (err) => {
	console.log(err);
	if (err) throw err;
});

const exampleDirectory = './src/examples/';
const distDirectory = './dist/examples/';

fs.readdir(exampleDirectory, (err, files) => {

	files.forEach(file => {
		if (fs.lstatSync(path.resolve(exampleDirectory, file)).isDirectory()) {
			let subDir = file;
			fs.readdir(exampleDirectory + file, async (err, exampleFiles) => {
				exampleFiles.forEach(exampleFile => {
					if (exampleFile.indexOf('.ts') >= 0) {
						let fi = `${exampleDirectory}${subDir}/${exampleFile}`;
						let fo = `${distDirectory}${subDir}/${exampleFile.replace('.ts', '.wasm')}`;
						let ascRun = `asc ${fi} --runtime stub -O3 --importMemory -o ${fo}`;
						console.log(ascRun);
						exec(ascRun); /*, function (err, stdout, stderr) {
							if (err !== null) {
								console.log(err);
								exit(0);
							}
							if (stderr !== null) {
								console.log(stderr);
								exit(0);
							}
							console.log('exec runs');
							console.log(stdout);
						});*/
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