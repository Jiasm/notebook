/**
 * 将右侧函数的返回值作为参数传入左侧函数中
 * 支持Promise版本
 * @param  {Array} funcs 要调用的函数序列
 */
function compose (...funcs) {
  // type check
  if (!funcs.length) throw new Error('compose required greater than 1 arguments')
  if (funcs.some(_ => typeof _ !== 'function' && !isPromise(_))) throw new Error('arguments must be function or promise')

  // return func
  return function exec (arg) {
    return new Promise((resolve, reject) => {
      let func = funcs.pop()

      let result = promiseify(func(arg, arg => exec(arg)))

      result.then(data => funcs.length ? exec(data).then(resolve).catch(reject) : resolve(data)).catch(reject)
    })
    // return funcs.length ? exec(result) : result
  }
}

function promiseify (result) {
  if (isPromise(result)) return result
  if (['string', 'number', 'regexp', 'object'].includes(typeof result)) return Promise.resolve(result)
}

function isPromise (func) {
  return func instanceof Promise
}

compose(
  data => new Promise((resolve, reject) => resolve(data + 2.5)),
  data => new Promise((resolve, reject) => resolve(data + 2.5)),
  async function c (data, next) {
    data += 10
    let result = await next(data) // 我们想要在某个函数中优先执行后续的代码

    result -= 5

    return result
  },
  async function c (data, next) {
    let result = await next(data) // 我们想要在某个函数中优先执行后续的代码
    result = result / 100
    return `${result}%`
  },
  function d (data) { return data + 20 }
)(15).then(console.log)
