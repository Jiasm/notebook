const http = require('http')

const serverHandler = (request, response) => {
  response.end('Hello World') // 返回数据
}

http
  .createServer(serverHandler)
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
