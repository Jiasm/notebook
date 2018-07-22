const http = require('http')

const serverHandler = (request, response) => {
  // default
  let responseData = '404'

  if (request.url === '/') {
    if (request.method === 'GET') {
      responseData = 'Hello World'
    } else if (request.method === 'POST') {
      responseData = 'Hello World With POST'
    }
  } else if (request.url === '/sub') {
    responseData = 'sub page'
  }

  response.end(responseData) // 返回数据
}

http
  .createServer(serverHandler)
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
