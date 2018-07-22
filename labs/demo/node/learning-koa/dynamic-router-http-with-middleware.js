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

function generatorId(request, response, next) {
  this.id = 123
  next()
}

app.get('/', generatorId, function(request, response) {
  response.end('Hello World ' + this.id)
})

app.post('/', generatorId, function(request, response) {
  response.end('Hello World With POST ' + this.id)
})

app.get('/sub', function(request, response) {
  response.end('sub page')
})

http
  .createServer(app.callback())
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
