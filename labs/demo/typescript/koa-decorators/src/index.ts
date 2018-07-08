import Koa, { Context } from 'koa'
import Router from 'koa-router'
import compose from 'koa-compose'
import bodyParse from 'koa-bodyparser'
import './controllers/index'
import './controllers/detail'
import { routerList, controllerList, paramList, parseList } from './decorators'

const routers: any[] = []

// 遍历所有添加了装饰器的Class，并创建对应的Router对象
routerList.forEach(item => {
  let { basename, constrcutor } = item
  let router = new Router({
    prefix: basename
  })

  controllerList
    .filter(i => i.target === constrcutor.prototype)
    .forEach(
      (controller: {
        type: 'get' | 'post',
        path: string,
        method: string,
        controller: Function
      }) => {
        router[controller.type](controller.path, async (ctx: any, next) => {
          let args: any[] = []
          // 获取当前函数对应的参数获取
          paramList
            .filter(
              (param: any) =>
                param.target === constrcutor.prototype &&
                param.method === controller.method
            )
            .map((param: any) => {
              let { index, key } = param
              switch (param.position) {
                case 'body':
                  args[index] = ctx.request.body[key]
                  break
                case 'header':
                  args[index] = ctx.headers[key]
                  break
                case 'cookie':
                  args[index] = ctx.cookies.get(key)
                  break
                case 'query':
                  args[index] = ctx.query[key]
                  break
              }
            })

          // 获取当前函数对应的参数格式化
          parseList
            .filter(
              (parse: any) =>
                parse.target === constrcutor.prototype &&
                parse.method === controller.method
            )
            .map((parse: any) => {
              let { index } = parse
              switch (parse.type) {
                case 'number':
                  args[index] = Number(args[index])
                  break
                case 'string':
                  args[index] = String(args[index])
                  break
                case 'boolean':
                  args[index] = String(args[index]) === 'true'
                  break
              }
            })

          // 调用实际的函数，处理业务逻辑
          let results = controller.controller(...args)

          ctx.body = results
        })
      }
    )

  routers.push(router.routes())
})

const app = new Koa()

app.use(bodyParse())
app.use(compose(routers))

app.listen(12306, () => console.log('server run as http://127.0.0.1:12306'))
