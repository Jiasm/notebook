const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router() // 实例化一个Router对象

router.register('/test1', ['GET'], _ => {}, {
  name: 'module'
})

router.register('/test2', ['GET'], _ => {}, {
  name: 'module'
})

console.log(router.url('module') === '/test1')

try {
  router.register('/test2', ['GET'], null, {
    name: 'error-module'
  })
} catch (e) {
  console.error(e)
}
console.log(Router.route)

app
  .use(router.routes()) // 将该Router对象的中间件注册到Koa实例上，后续请求的主要处理逻辑
  .use(router.allowedMethods()) // 添加针对OPTIONS的响应处理，一些预检请求会先触发 OPTIONS 然后才是真正的请求

app.listen(8888, _ => console.log('server run as http://127.0.0.1:8888'))
