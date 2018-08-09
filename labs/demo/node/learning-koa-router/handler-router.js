const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化一个Router对象

// 注册一个路由的监听
router.get('/', ctx => {
  ctx.body = 'hi there.'
})

router.post('/', ctx => {
  ctx.body = 'psot here.'
})

app
  .use(router.routes()) // 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑
  .use(router.allowedMethods()) // 添加针对OPTIONS的响应处理，以及一些METHOD不支持的处理

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
