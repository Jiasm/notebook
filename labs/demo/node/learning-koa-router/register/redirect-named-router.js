const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化一个Router对象

router.register(
  '/list/:id',
  ['GET'],
  ctx => {
    ctx.body = `Hi ${ctx.params.id}, query: ${ctx.querystring}`
  },
  {
    name: 'list'
  }
)

router.register('/', ['GET'], ctx => {
  // /list/1?name=Niko
  ctx.redirect(
    router.url(
      'list',
      {
        id: 1
      },
      {
        query: {
          name: 'Niko'
        }
      }
    )
  )
})

app
  .use(router.routes()) // 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑
  .use(router.allowedMethods()) // 添加针对OPTIONS的响应处理，一些预检请求会先触发 OPTIONS 然后才是真正的请求

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))

// curl -L http://127.0.0.1:8888 => Hi 1, query: name=Niko
