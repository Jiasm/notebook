let spawn = require('child_process').spawn

require('http').createServer((req, res) => {
  let child = spawn('tail', ['-f', 'currying.js'])

  child.stdout.pipe(res)

  res.on('end', child.kill)
}).listen(4000)
