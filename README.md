# asdom

Use DOM APIs in AssemblyScript.

This allows us to write WebAssembly applications (in AssemblyScript) that can
manipulate the DOM.

# Usage

First you should get familiar with AssemblyScript and learn how to run
AssemlyScript code in a browser.

In your JavaScript code that loads your Wasm module, import `Asdom` and pass
its `wasmImports` to your Wasm module's imports. The following snippet assumes
the use of native ES Modules in the browser and a static HTTP server serving
files at the root of a project that has `node_modules`:

```js
import {Asdom} from './node_modules/asdom/glue/index.js'
import {instantiate} from './node_modules/@assemblyscript/loader/index.js'

async function main() {
	// Create an Asdom instance.
	const asdom = new Asdom()

	const {exports} = await instantiate(fetch('/build/untouched.wasm'), {
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
```

If you use a tools like Webpack or Rollup to bundle your application, or if you
know how to write import maps for native ES Modules, then you can use
Node.js-style import specifiers instead:

```js
import {Asdom} from 'asdom/glue/index.js'
import {instantiate} from '@assemblyscript/loader/index.js'
```

Now in your AssemblyScript code you can import `document` from `asdom` then
start manipulating the DOM:

```ts
import {document} from '../node_modules/asdom/assembly/index'

export function run(): void {
	const el = document.createElement('h1')

	el.setAttribute('foo', 'bar')

	const s: string = el.getAttribute('foo')! // returns "bar"

	el.innerHTML = /*html*/ `
		<span style="font-weight: normal; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
			<em>hello</em> from <strong>AssemblyScript</strong>
		</span>
	`

	document.body!.appendChild(el)
}
```

# TODO

We will add more DOM APIs as needed while we chisel away.

- [ ] Use as-pect for testing.
- [ ] Import jsdom or undom so that DOM APIs are mocked (on the JavaScript side) during testing (as-pect runs in Node.js not a browser).
- [ ] Make `document` global. Currently making AS globals is incompatible with TypeScript, so VS Code intellisense doesn't pick up AS globals (https://github.com/AssemblyScript/assemblyscript/issues/1929)
