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
        let context = {}
        function next(handlers, index = 0) {
          handlers[index] &&
            handlers[index].call(context, request, response, () =>
              next(handlers, index + 1)
            )
        }

        next(handlers)
      } else {
        response.end('404')
      }
    }
  }
}

const app = new App()

function beforeRequest(request, response, next) {
  this.requestTime = new Date().valueOf()
  next()
}

// 方案1. 修改原handler处理逻辑，进行耗时的统计，然后end发送数据
app.get('/a', beforeRequest, function(request, response) {
  // 请求耗时的统计
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end('XXX')
})

// 方案2. 将输出数据的逻辑挪到一个后置的中间件中
function afterRequest(request, response, next) {
  // 请求耗时的统计
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end(this.body)
}

app.get(
  '/b',
  beforeRequest,
  function(request, response, next) {
    this.body = 'XXX'

    next() // 不然中间件在这里就终止了
  },
  afterRequest
)

http
  .createServer(app.callback())
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
