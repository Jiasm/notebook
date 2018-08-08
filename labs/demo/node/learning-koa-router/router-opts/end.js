const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化一个Router对象

// 注册一个路由的监听
router.register(
  '/index',
  ['GET'],
  ctx => {
    console.log('join', `[${ctx.path}]`)
    ctx.body = 'hello'
  },
  {
    strict: true,
    end: false
  }
)

app.use(router.routes())

app.listen(8888, _ => console.log(`server run as http://127.0.0.1:8888`))
