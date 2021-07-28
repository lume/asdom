# asdom

Use DOM APIs in [AssemblyScript](https://assemblyscript.org) (TypeScript compiled to WebAssembly).

This allows us to write WebAssembly applications that can
manipulate the DOM, and with potential for more speed!

# Early Stages!

Work in progress (probably may always be), but right now it's early and many APIs need to be added.

# Supported APIs so far

See the outline of [supported APIs](./supported-APIs.md).

# Usage

First you should get familiar with AssemblyScript and learn how to run
AssemlyScript code in a browser.

The following `asc` compiler options are required: `--exportRuntime`,
`--exportTable`.

The `--explicitStart` option is required only if any of your ES modules use DOM
APIs at their top level (read the comments in the below example).

In your JavaScript code that loads your Wasm module, import `Asdom` and pass
its `wasmImports` to your Wasm module's imports. The following snippet assumes
the use of native ES Modules in the browser and a static HTTP server serving
files at the root of a project that has `node_modules`:

```js
import {Asdom} from './node_modules/asdom/glue/index.js'
import {instantiate} from './node_modules/@assemblyscript/loader/index.js'

async function main() {
	// Create an Asdom instance containing the glue code for DOM APIs.
	const asdom = new Asdom()

	const {exports} = await instantiate(fetch('/build/untouched.wasm'), {
		// Pass the wasmImports in.
		...asdom.wasmImports,

		// ...Add any other imports your apps needs as usual...
	})

	// Before you do anything, pass the the Wasm module's exports to asdom.
	asdom.wasmExports = exports

	// Now execute the Wasm module. Make sure you use the `--explicitStart`
	// compiler option so that a `_start()` method is automatically exported if
	// you will have any code that uses DOM APIs at the top level of any ES
	// module (i.e. top level of any file). Otherwise, you could skip using the
	// `--explicitStart` option and export your own method(s) to call, but in
	// that case you should not use any DOM APIs at the top level of any
	// modules or else the glue code won't be ready because asdom.wasmImports
	// will not be set by the time the top level of modules execute.
	exports._start()

	// If you didn't use `--explicitStart`, you can call your own export instead,
	// assuming no top-level ES module code uses DOM APIs, f.e.
	// exports.whatever()
}

main()
```

If you use a tool like Webpack or Rollup to bundle your application, or if you
know how to write import maps for native ES Modules, then you can use
Node.js-style import specifiers instead:

```js
import {Asdom} from 'asdom/glue/index.js'
import {instantiate} from '@assemblyscript/loader/index.js'
```

Now in your AssemblyScript code, re-export the AssemblyScript glue, and then
you can import `document` or `window` from `asdom` to start manipulating the
DOM:

```ts
// Export AssemblyScript-side glue code or not everything will work (for example the customElements API).
export * from '../node_modules/asdom/assembly/glue'

import {document} from '../node_modules/asdom/assembly/index'

const el = document.createElement('h1')

el.setAttribute('foo', 'bar')

const s: string = el.getAttribute('foo')! // returns "bar"

el.innerHTML = /*html*/ `
  <span style="font-weight: normal; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
    <em>hello</em> from <strong>AssemblyScript</strong>
  </span>
`

document.body!.appendChild(el)
```

# Caveats

- Don't create built-in elements (f.e. `<div>` elements) using their
  constructors. For example, don't do `new HTMLDivElement`, instead use
  `document.createElement('div')`, or things won't work as expected.
- AS does not yet support referencing constructors, but the Custom Elements API
  is one that accepts a constructor as the second argument to
  `customElements.define('tag-name', YourClass)`. To work around this
  limitation, the `define()` API should be use like so:
  ```js
  customElements.define('tag-name', () => new YourClass(), YourClass.observedAttributes)
  ```
  As with built-in elements, do not manually `new` your custom element class,
  except in the factory function that you pass into `customElements.define()`
  as the second arg. In other scenarios when you want a ref to your custom
  element, you can use any pattern that grabs your element from the DOM instead
  of creating it with `new`.
  ```js
  const temp = document.createElement('<div>')
  temp.innerHTML = '<your-element></your-element>'
  const yourElement = temp.firstElementChild
  // ...use yourElement...
  ```
  This will be improved.

# TODO

We will add more DOM APIs as needed while we chisel away.

- [ ] Improve custom element API to allow directly creating custom element
      instances from their constructors.
- [ ] Use as-pect for testing.
- [ ] Import jsdom or undom so that DOM APIs are mocked (on the JavaScript
      side) during testing (as-pect runs in Node.js not a browser).
- [ ] Make `window` and any of its properties global. Currently making AS
      globals is incompatible with TypeScript, so VS Code intellisense doesn't pick
      up AS globals (https://github.com/AssemblyScript/assemblyscript/issues/1929)
