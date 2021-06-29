import {Asdom} from '../glue/index.js'
import {instantiate} from '../node_modules/@assemblyscript/loader/index.js'

async function main() {
	// Create an Asdom instance.
	const asdom = new Asdom()

	const {exports} = await instantiate(fetch('/example/build/untouched.wasm'), {
		// Pass the wasmImports in.
		...asdom.wasmImports,

		// ...Add any other imports your apps needs as usual...
	})

	// Before you do anything, pass the the Wasm module's exports to asdom.
	asdom.wasmExports = exports

	// Now execute whatever you want from your Wasm module.
	exports.run()
}

main()
