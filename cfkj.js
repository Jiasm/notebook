'use strict'

console.log(new Array(9).fill(0).map((_, index) => new Array(index + 1).fill(0).map((_, i) => `${index + 1} * ${i + 1} = ${(index + 1) * (i + 1)}`).join('\t')).join('\n'))
