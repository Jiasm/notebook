/**
 *  一个promise+callback通用函数的生成
 */
 
 ;(async () => {
  function build (executor) {
    return (param = {}, ...args) => {
      let { success, error } = param

      let prom = new Promise((resolve, reject) => executor.call(this, resolve, reject, param, ...args))

      if (!success) return prom

      prom.then(success).catch(error)
    }
  }

  let func = build(resolve => setTimeout(() => resolve(123), 1000))

  let res = await func()
  console.log('await:', res)

  func({
    success (res) {
      console.log('callback:', res)
    }
  })
})()
