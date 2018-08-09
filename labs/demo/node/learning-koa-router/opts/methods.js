const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
// 修改处1
const methods = ['GET', 'POST']
const router = new Router({
  methods
})

// 修改处2
router.all('/', async (ctx, next) => {
  // 理想情况下，这些判断应该交由中间件来完成
  if (!~methods.indexOf(ctx.method)) {
    return await next()
  }

  ctx.body = 'pong!'
})

app
  .use(router.routes()) // 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑
  .use(router.allowedMethods()) // 添加针对OPTIONS的响应处理，以及一些METHOD不支持的处理

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))

// > curl -X GET    http://127.0.0.1:8888/index  => pong!
// > curl -X POST   http://127.0.0.1:8888/index  => pong!
// > curl -X DELETE http://127.0.0.1:8888/index  => Not Implemented
// > curl -X PUT    http://127.0.0.1:8888/index  => Not Implemented
