'use strict'

const http = require('http')

var server = http.createServer((req, res) => {
  setTimeout(() => {
    res.end('123')
  }, 10000)
})

server.listen(12306, () => {
  console.log('run as 12306')
})
