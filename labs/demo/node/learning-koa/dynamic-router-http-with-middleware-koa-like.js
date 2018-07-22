const http = require('http')

class App {
  constructor() {
    this.handlers = {}

    this.get = this.route.bind(this, 'GET')
    this.post = this.route.bind(this, 'POST')
  }

  route(method, path, ...handler) {
    let pathInfo = (this.handlers[path] = this.handlers[path] || {})

    // register handler
    pathInfo[method] = handler
  }

  callback() {
    return (request, response) => {
      let { url: path, method } = request

      let handlers = this.handlers[path] && this.handlers[path][method]

      if (handlers) {
        let context = { url: request.url }
        function next(handlers, index = 0) {
          return new Promise((resolve, reject) => {
            if (!handlers[index]) return resolve()

            // 每次调用中间件时就监听then，并将当前Promise的resolve与reject处理传入Promise的回调中
            // 也就是说，只有当第二个中间件的resolve被调用时，第一个中间件的then回调才会执行
            // 这样就实现了一个洋葱模型
            handlers[index](context, () => next(handlers, index + 1)).then(
              resolve,
              reject
            )
          })
        }

        next(handlers).then(_ => {
          // 结束请求
          response.end(context.body || '404')
        })
      } else {
        response.end('404')
      }
    }
  }
}

const app = new App()

async function log(ctx, next) {
  let requestTime = new Date().valueOf()
  await next()
  // 请求耗时的统计
  console.log(`${ctx.url} duration: ${new Date().valueOf() - requestTime}`)
}

// 方案1. 修改原handler处理逻辑，进行耗时的统计，然后end发送数据
app.get('/', log, async ctx => {
  ctx.body = 'XXX'
})

http
  .createServer(app.callback())
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
