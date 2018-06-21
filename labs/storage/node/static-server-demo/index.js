const fs = require('fs')
const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

router.get('/', async context => {
  context.body = fs.readFileSync('./index.html').toString()
})

router.get('/style-1.css', async context => {
  context.set('Content-Type', 'text/css')
  context.body = 'p { color: red; }'

  console.log('即使有延迟，依然会等到所有css文件加载完毕后再展示页面')
  return new Promise(resolve => setTimeout(resolve, 5000))
})

router.get('/style-2.css', async context => {
  context.set('Content-Type', 'text/css')
  context.body = 'p { color: green; }'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen('2333', _ => console.log('server run as http://127.0.0.1:2333'))
