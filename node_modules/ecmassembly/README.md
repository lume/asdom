# ECMAssembly

Spec'd and/or common JavaScript APIs brought to AssemblyScript.

> The name is a play on words:
> `ECMAScript -> AssemblyScript -> ECMAssembly`

# Usage

Look at [`example/index.js`](./example/index.js) to see how one would
pass JavaScript-side requirements into the Wasm module via imports object, then
look at [`example/assembly/index.ts`](./example/assembly/index.ts) to see how
to import the APIs inside of AssemblyScript code.

First:

```sh
npm install ecmassembly
```

On the JavaScript side pass required glue code to the Wasm module via imports:

```js
import {ECMAssembly} from 'ecmassembly/index.js'
import ASLoader from '@assemblyscript/loader'

const es = new ECMAssembly()

const imports = {
	...es.wasmImports,
	/*...All your own imports...*/
}

ASLoader.instantiateStreaming(fetch('path/to/module.wasm'), imports).then(wasmModule => {
	// After the Wasm module is created, you need to pass the exports back to the lib:
	es.wasmExports = wasmModule.exports

	// Then finally, run anything from the module that depends on setTimeout, Promise, etc:
	wasmModule.exports.runMyApp()
})
```

In your AssemblyScript code import what you need an use it:

```ts
import {Promise, setTimeout, PromiseActions} from '../node_modules/ecmassembly/assembly/index'

export function runMyApp() {
	const actions: PromiseActions | null = null

	const promise = new Promise<boolean>(_actions => {
		// Temporary hack while AS does not yet support closures (no closing over variable except those that are at the top-level of the module).
		actions = _actions

		// resolve after 1 second
		setTimeout(() => {
			actions.resolve(true)
		}, 1000)
	})

	promise.then(result => {
		// `result` will be `true` here, this runs one second later.
	})
}
```

or

```ts
import {requestAnimationFrame} from '../node_modules/ecmassembly/assembly/index'

// This is out here because there is no closure support for non-top-level variables yet.
let loop: (time: f32) => void = (t: f32) => {}

export function runMyApp() {
	// Make an infinite game loop.

	loop = (time: f32) => {
		// ... render something based on the current elapsed time ...

		requestAnimationFrame(loop)
	}

	requestAnimationFrame(loop)
}
```

# APIs so far

- `requestAnimationFrame`/`cancelAnimationFrame`
- `setTimeout`/`clearTimeout`
- `setInterval`/`clearInterval`
- `Promise` (rudimentary initial implementation, still lacking things like promise chaining and static methods, etc)
