// TODO Import JSDOM or UNDOM so we can run tests.
// TODO Use as-pect for testing.

const assert = require('assert')
const myModule = require('..')
assert.equal(myModule.add(1, 2), 3)
console.log('ok')
