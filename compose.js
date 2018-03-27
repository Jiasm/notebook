/**
 * 将右侧函数的返回值作为参数传入左侧函数中
 * @param  {Array} funcs 要调用的函数序列
 */
function compose (...funcs) {
  // type check
  if (!funcs.length) throw new Error('compose required greater than 1 arguments')
  if (funcs.some(_ => typeof _ !== 'function')) throw new Error('arguments must be function')

  // return func
  return function exec (arg) {
    let result = funcs.pop()(arg)

    return funcs.length ? exec(result) : result
  }
}

/**
 * 将左侧函数的返回值作为参数传入右侧函数
 * compose的反转
 * @param  {Array} funcs 要调用的函数序列
 */
function composeReverse (...funcs) {
  return compose(...funcs.reverse())
}

console.log(compose(arg => `${arg}%`, arg => arg.toFixed(2), arg => arg + 10)(5)) // 15.00%
console.log(compose(arg => arg.toFixed(2), arg => arg + 10)(5)) // 15.00
console.log(compose(arg => arg + 10)(5)) // 15

console.log(composeReverse(arg => arg + 10)(5)) // 15
console.log(composeReverse(arg => arg + 10, arg => arg.toFixed(2))(5)) // 15.00
console.log(composeReverse(arg => arg + 10, arg => arg.toFixed(2), arg => `${arg}%`)(5)) // 15.00%
