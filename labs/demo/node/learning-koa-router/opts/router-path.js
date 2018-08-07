const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({
  routerPath: '/index'
})

router.all('/index', async (ctx, next) => {
  ctx.body = 'pong!'
})

app.use(router.routes())

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))

// > curl http://127.0.0.1:8888               => pong!
// > curl http://127.0.0.1:8888/index         => pong!
// > curl http://127.0.0.1:8888/whatever/path => pong!
