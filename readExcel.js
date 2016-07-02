'use strict';

var fs = require('fs');
var xlsx = require("node-xlsx");

var buffer = xlsx.parse(fs.readFileSync(`${__dirname}/file2.xlsx`));
console.log(buffer);
