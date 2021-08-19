// import benchmark.js
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// use fs to read the pow2_test.wasm module into a byte array
const fs = require('fs');
const bytes = fs.readFileSync('./objTest.wasm');
const colors = require('colors'); // allow console logs with color

// Variables for the WebAssembly functions
var inline_object_test;
var call_object_test;
var direct_test;

console.log(`
================= RUNNING BENCHMARK =================
`.rainbow);

function init_benchmark() {
	// adds the callbacks for the benchmarks
	suite.add('#1 '.yellow + 'Direct call test', direct_test);
	suite.add('#2 '.yellow + 'Object inline test', inline_object_test);
	suite.add('#3 '.yellow + 'Object call test', call_object_test);
	// add listeners
	suite.on('cycle', function (event) {
		console.log(String(event.target));
	});

	suite.on('complete', function () {
		// when the benchmark has finished, log the fastest and slowest functions
		let fast_string = ('Fastest is ' +
			this.filter('fastest').map('name'));
		let slow_string = ('Slowest is ' +
			this.filter('slowest').map('name'));
		console.log(`
    ------------------------------------------------------------
    ${fast_string.green}
    ${slow_string.red}
    ------------------------------------------------------------
    `);

		// create an array of all successful runs and sort fast to slow
		var arr = this.filter('successful');
		arr.sort(function (a, b) {
			return a.stats.mean - b.stats.mean;
		});

		console.log(`
    
    `);
		console.log("============ FASTEST ============".green);
		while (obj = arr.shift()) {
			let extension = '';
			let count = Math.ceil(1 / obj.stats.mean);

			if (count > 1000) {
				count /= 1000;
				extension = 'K'.green.bold;
			}

			if (count > 1000) {
				count /= 1000;
				extension = 'M'.green.bold;
			}

			count = Math.ceil(count);
			let count_string = count.toString().yellow + extension;
			console.log(
				`${obj.name.padEnd(45, ' ')} ${count_string} exec/sec`
			);
		}
		console.log("============ SLOWEST ============".red);
	});
	// run async
	suite.run({ 'async': false });
}
var importObject = {
	objTest: {
		passInt: (i) => {
		}
	},
	env: {
		abort: () => { },
	}
};

(async () => {
	const obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);

	inline_object_test = obj.instance.exports.inline_object_test;
	call_object_test = obj.instance.exports.call_object_test;
	direct_test = obj.instance.exports.direct_test;
	init_benchmark();
})();
