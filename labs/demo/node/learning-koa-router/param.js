const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化一个Router对象

router.register('/list/:id', ['GET'], (ctx, next) => {
  ctx.body = `hello: ${ctx.name}`
})

router.param('id', (param, ctx, next) => {
  console.log(`got id: ${param}`)
  ctx.name = 'Niko'
  next()
})

router.param('id', (param, ctx, next) => {
  console.log('param2')
  next()
})

app.use(router.routes()) // 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
