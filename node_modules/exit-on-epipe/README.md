# exit-on-epipe

Cleanly exit on pipe errors in NodeJS scripts.

These errors are common in pipelines that involve NodeJS scripts. For example,
take a simple script that prints out 10 lines:

```js
for(var i = 0; i < 10; ++i) console.log(i)
```

NodeJS will print an error message if the output is truncated:

```
$ cat t.js
for(var i = 0; i < 10; ++i) console.log(i)
$ node t.js  | head -n 1
0
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: write EPIPE
    at Object.exports._errnoException (util.js:856:11)
    at exports._exceptionWithHostPort (util.js:879:20)
    at WriteWrap.afterWrite (net.js:763:14)
```

The process will cleanly exit if you require the module:

```
$ cat t.js
require("exit-on-epipe");
for(var i = 0; i < 10; ++i) console.log(i)
$ node t.js  | head -n 1
0
```

## Installation

With [npm](https://www.npmjs.org/package/exit-on-epipe):

    $ npm install exit-on-epipe

## Usage

For basic scripts, requiring at the top of the source file suffices:

```js
require('exit-on-epipe');
// ... rest of source
```

For more advanced situations (e.g. handing other streams), call the module:

```js
var EOE = require('exit-on-epipe');
EOE(my_stream);             // will exit process on an EPIPE error on my_stream
EOE(my_stream, my_handler); // will call my_handler() instead of process.exit
```

## Interface

The module exports a single function (exposed as the variable `eoepipe`).

`eoepipe(stream, bail)` will attach an error handler to `stream` which will:

- call the `bail` function if the error `.code` or `.errno` is `"EPIPE"`
- defer to the default behavior if there are no other error handlers
- noop if the error is not `EPIPE` and if there are other error handlers

If the `bail` function is not specified, `process.exit` is used.

If the `stream` parameter is not specified, no action will be taken

## Notes

The script will not perform any action if `process` or `process.stdout` are not
available.  It is safe to use in a web page.

## License

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

## Badges

[![Build Status](https://travis-ci.org/SheetJS/node-exit-on-epipe.svg?branch=master)](https://travis-ci.org/SheetJS/node-exit-on-epipe)

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/node-exit-on-epipe?pixel)](https://github.com/SheetJS/node-exit-on-epipe)
