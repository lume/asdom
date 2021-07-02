import {Asdom} from './node_modules/asdom/glue/index.js'
import {ECMAssembly} from './node_modules/ecmassembly/index.js'
import {instantiate} from './node_modules/@assemblyscript/loader/index.js'

async function main() {
	// Create an Asdom instance that has the glue code DOM APIs.
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

	// Now execute whatever you want from your Wasm module.
	exports.run()
}

main()
