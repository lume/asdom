import {Asdom} from './node_modules/asdom/glue/index.js'
import {ECMAssembly} from './node_modules/ecmassembly/index.js'
import {instantiate} from './node_modules/@assemblyscript/loader/index.js'

async function main() {
	// Create an Asdom instance that has the glue code for DOM APIs.
	const asdom = new Asdom()

	// Create an ECMAssembly instance that has glue code for requestAnimationFrame.
	const ecmassembly = new ECMAssembly()

	const {exports} = await instantiate(fetch('./build/untouched.wasm'), {
		// Pass the glue code wasmImports in.
		...asdom.wasmImports,
		...ecmassembly.wasmImports,

		// ...Add any other imports your apps needs as usual...
	})

	// Before you do anything, pass the the Wasm module's exports to the glue code instances.
	asdom.wasmExports = exports
	ecmassembly.wasmExports = exports

	// Now execute the Wasm module. Make sure you use the `--explicitStart`
	// compiler option so that a `_start()` method is automatically exported if
	// you will have any code that uses DOM APIs at the top level of any ES
	// module (i.e. top level of any file). Otherwise, you could skip using the
	// `--explicitStart` option and export your own method(s) to call, but in
	// that case you should not use any DOM APIs at the top level of any
	// modules or else the glue code won't be ready because asdom.wasmImports
	// will not be set by the time the top level of modules execute.
	exports._start()
}

main()
