const fs      = require('fs')
const Koa     = require('koa')
const Router  = require('koa-router')

const app     = new Koa()
const router  = new Router()
const file    = './test.log'
const port    = 12306

router.get('/log', ctx => {
  const data = fs.readFileSync(file).toString()
  ctx.body = data
})

app.use(router.routes())
app.listen(port, () => console.log(`Server run as http://127.0.0.1:${port}`))
