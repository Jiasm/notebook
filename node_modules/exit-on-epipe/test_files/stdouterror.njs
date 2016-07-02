#!/usr/bin/env node
/* exit-on-epipe.js (C) 2015 SheetJS -- http://sheetjs.com */
/* usage: node stdouterr.njs [multi|multi2] [test]
   if test is specified, require the exit-to-epipe module
   if multi is specified, attach an error handler that counts invocations
   if multi2 is specified, remove the error handler and fake an EPIPE error
*/
var argv = process.argv.slice(2);

var i = 0;
var noop = function(){console.log(i++)};
if(argv[0] == "test" || argv[1] == "test") require("../");

if(argv[0] == "multi" || argv[0] == "multi2") process.stdout.on("error", noop);
process.stdout.emit('error', new Error("WTF"));
if(argv[0] !== "multi2") process.exit();

process.stdout.removeListener('error', noop);
var x = new Error("SIGPIPE"); x.errno = "EPIPE";
process.stdout.emit('error', x);