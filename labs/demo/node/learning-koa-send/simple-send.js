const fs      = require('fs')
const path    = require('path')
const Koa     = require('koa')
const Router  = require('koa-router')
const send    = require('koa-send')

const app     = new Koa()
const router  = new Router()
const port    = 12306

router.get('/file', async ctx => {
  await send(ctx, ctx.query.path, {
    root: path.join(__dirname, '/public')
  })
})

router.get('/index', async ctx => {
  await send(ctx, './public/index.log')
})

router.get('/surprises', async ctx => {
  await send(ctx, '/', {
    root: './public',
    index: 'index'
  })
})

router.get('/test', async ctx => {
  ctx.res.writeHead(200, {'Content-Type': 'application/json'})
  ctx.res.writeHead(200, {'Content-Type': 'text/plain'})

  ctx.body = 'ping'
})

app.use(router.routes())
app.listen(port, () => console.log(`Server run as http://127.0.0.1:${port}`))
