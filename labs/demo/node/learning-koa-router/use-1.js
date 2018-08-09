const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.redirectBody = 'hi'
  console.log('trigger handler')
  await next()
})

router.use('/list', ctx => {
  console.log('trigger middleware')
  ctx.body = ctx.redirectBody
})

app.use(router.routes())

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
