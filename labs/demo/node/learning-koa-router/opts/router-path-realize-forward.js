const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 老版本的登录逻辑处理
router.post('/login', ctx => {
  ctx.body = 'old login logic!'
})

// 新版本的登录处理逻辑
router.post('/login-v2', ctx => {
  ctx.body = 'new login logic!'
})

app.use((ctx, next) => {
  if (ctx.path === '/login') {
    // 匹配到旧版请求，转发到新版
    ctx.routerPath = '/login-v2' // 手动改变routerPath
  }
  next()
})
app.use(router.routes())

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))

// > curl -X POST http://127.0.0.1:8888/login => new login logic!
