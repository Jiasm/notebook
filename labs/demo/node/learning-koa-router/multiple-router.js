const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router1 = new Router()
const router2 = new Router()

router1.post('/', _ => {})

router1.get('/', async (ctx, next) => {
  ctx.redirectBody = 'hi'
  console.log(`trigger router1, matched length: ${ctx.matched.length}`)
  await next()
})

router2.get('/', async (ctx, next) => {
  ctx.redirectBody = 'hi'
  console.log(`trigger router2, matched length: ${ctx.matched.length}`)
  await next()
})

app.use(router1.routes())
app.use(router2.routes())

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
