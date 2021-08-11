# Performance tests

I made this folder to test some performance hyptheses.

## objTest.ts

This test was based on a conversation I had with @decode on the AssemblyScript Discord:
https://discord.gg/mNPWbVT4

The calls to the WebGLContext object require a `global.get` and `load` Wasm call, where
using the direct calls only need a `global.get` call.  @decode believed that this would
be a negligible performance cost, and as always, he was correct.  When I wrote this test
I had the following outout:
```
============ FASTEST ============
#1 Direct call test                 177 exec/sec
#2 Object inline test               161 exec/sec
#3 Object call test                 161 exec/sec
============ SLOWEST ============
```
Each exec is really 1 Million calls.  When you disassemble the code to WAT, the difference 
is the single load call.  There is a performance difference, but it is quite small.