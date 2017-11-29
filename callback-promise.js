/**
 *  一个promise+callback通用函数的生成
 */
 
 ;(async () => {
  function build (func) {
    return ({success, error} = {}) => {
      let pro = new Promise(func)

      if (!success) return pro

      pro.then(success).catch(error)
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
