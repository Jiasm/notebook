#!/usr/bin/env node
/* exit-on-epipe.js (C) 2015 SheetJS -- http://sheetjs.com */
/* usage: node seq.njs <last> [test]
   print sequences of numbers
   if test is specified, require the exit-to-epipe module
*/
var argv = process.argv.slice(2);

if(argv[1] == "test") require("../");

var len = +argv[0];
if(len != len) throw new Error("length |" + argv[0] + "| is invalid");
len = len || 10;
for(var i = 0; i < len; ++i) console.log(i);
