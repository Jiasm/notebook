function func_es5 (callback) {
  callback = callback || defaultFunction

  return callback
}

function func_es6 (callback = defaultFunction) {
  return callback
}

function defaultFunction () {}

// test es5

console.log('func_es5()      ', typeof func_es5())
console.log('func_es5(0)     ', typeof func_es5(0))
console.log('func_es5(false) ', typeof func_es5(false))
console.log('func_es5(\'\')  ', typeof func_es5(''))
console.log('func_es5(null)  ', typeof func_es5(null))

// test es6

console.log('func_es6()      ', typeof func_es6())
console.log('func_es6(0)     ', typeof func_es6(0))
console.log('func_es6(false) ', typeof func_es6(false))
console.log('func_es6(\'\')  ', typeof func_es6(''))
console.log('func_es6(null)  ', typeof func_es6(null))
