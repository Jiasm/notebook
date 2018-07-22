const getUserSession = (_ => {
  let session3rd = null
  let requestQueue = []
  let flag = false
  return _ =>
    new Promise((resolve, reject) => {
      // 判断是否已经有值
      if (session3rd === null) {
        requestQueue.push(resolve) // 暂存resolve，等到拿到session3rd后再进行操作
        // 避免发送多次请求
        if (!flag) {
          flag = true

          request({
            url: '3rd' // 获取session3rd的地址
          }).then(data => {
            session3rd = data.session3rd

            // 循环将队列中的所有回调触发
            requestQueue.forEach(stack => stack(session3rd))

            // 释放内存
            requestQueue.length = 0
          })
        }
      } else {
        resolve(session3rd)
      }
    })
})()

function requestTools(url) {
  return new Promise((resolve, reject) => {
    getUserSession().then(session3rd => {
      resolve(
        request({
          url,
          session3rd
        })
      )
    })
  })
}

// test scope
function request({ url, session3rd }) {
  return new Promise((resolve, reject) => {
    if (url === '3rd') {
      console.log('发起请求获取session3rd')
      setTimeout(_ => resolve({ session3rd: '123' }), 2000) // 模拟延迟
    } else {
      resolve(`${url} + ${session3rd}`)
    }
  })
}

requestTools('url1').then(console.log)
requestTools('url2').then(console.log)
// test scope end
