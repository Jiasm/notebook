(() => {
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

        funcs.length ? result.then(data => exec(data).then(resolve)).catch(reject) : result.then(resolve).catch(reject)
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
    data => new Promise((resolve, reject) => resolve(Number(data).toFixed(2))),
    (data, next) => new Promise((resolve, reject) => next(data).then(data => resolve(`${data}%`))),
    data => data + 20
  )(15).then(data => {
    console.log(data)
  })
})()
