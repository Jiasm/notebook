const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const middlewareRouter = new Router()
const routerPage1 = new Router({
  prefix: '/page1'
})

const routerPage2 = new Router({
  prefix: '/page2'
})

middlewareRouter.get('/list/:id', async (ctx, next) => {
  console.log('trigger middleware')
  ctx.body = `hi there.`
  await next()
})

routerPage1.use(middlewareRouter.routes())
routerPage2.use(middlewareRouter.routes())

app.use(middlewareRouter.routes())
app.use(routerPage1.routes())
app.use(routerPage2.routes())

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
