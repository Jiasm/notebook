const http = require('http')

class App {
  constructor() {
    this.handlers = {}

    this.get = this.route.bind(this, 'GET')
    this.post = this.route.bind(this, 'POST')
  }

  route(method, path, handler) {
    let pathInfo = (this.handlers[path] = this.handlers[path] || {})

    // register handler
    pathInfo[method] = handler
  }

  callback() {
    return (request, response) => {
      let { url: path, method } = request

      this.handlers[path] && this.handlers[path][method]
        ? this.handlers[path][method](request, response)
        : response.end('404')
    }
  }
}

const app = new App()

app.get('/', function(request, response) {
  response.end('Hello World')
})

app.post('/', function(request, response) {
  response.end('Hello World With POST')
})

app.get('/sub', function(request, response) {
  response.end('sub page')
})

http
  .createServer(app.callback())
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
