---
uuid: c48876f0-8d83-11e8-8291-41f8b0341cf6
title: 'koa源码阅读[0]'
date: 2018-07-22 15:49:31
tags:
  - javascript
  - koajs
  - 源码阅读
---

Node.js也是写了两三年的时间了，刚开始学习`Node`的时候，`hello world`就是创建一个`HttpServer`，后来在工作中也是经历过`Express`、`Koa1.x`、`Koa2.x`以及最近还在研究的结合着`TypeScript`的`routing-controllers`（驱动依然是`Express`与`Koa`）。    
用的比较多的还是`Koa`版本，也是对它的洋葱模型比较感兴趣，所以最近抽出时间来阅读其源码，正好近期可能会对一个`Express`项目进行重构，将其重构为`koa2.x`版本的，所以，阅读其源码对于重构也是一种有效的帮助。  

<!-- more -->

# Koa是怎么来的

首先需要确定，Koa是什么。  
任何一个框架的出现都是为了解决问题，而Koa则是为了更方便的构建http服务而出现的。  
可以简单的理解为一个HTTP服务的中间件框架。  

## 使用http模块创建http服务

相信大家在学习Node时，应该都写过类似这样的代码：
```javascript
const http = require('http')

const serverHandler = (request, response) => {
  response.end('Hello World') // 返回数据
}

http
  .createServer(serverHandler)
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
```

一个最简单的示例，脚本运行后访问`http://127.0.0.1:8888`即可看到一个`Hello World`的字符串。  
但是这仅仅是一个简单的示例，因为我们不管访问什么地址（甚至修改请求的Method），都总是会获取到这个字符串：
```bash
> curl http://127.0.0.1:8888
> curl http://127.0.0.1:8888/sub
> curl -X POST http://127.0.0.1:8888
```

所以我们可能会在回调中添加逻辑，根据路径、Method来返回给用户对应的数据：
```javascript
const serverHandler = (request, response) => {
  // default
  let responseData = '404'

  if (request.url === '/') {
    if (request.method === 'GET') {
      responseData = 'Hello World'
    } else if (request.method === 'POST') {
      responseData = 'Hello World With POST'
    }
  } else if (request.url === '/sub') {
    responseData = 'sub page'
  }

  response.end(responseData) // 返回数据
}
```

## 类似Express的实现

但是这样的写法还会带来另一个问题，如果是一个很大的项目，存在N多的接口。  
如果都写在这一个`handler`里边去，未免太过难以维护。  
示例只是简单的针对一个变量进行赋值，但是真实的项目不会有这么简单的逻辑存在的。  
所以，我们针对`handler`进行一次抽象，让我们能够方便的管理路径：

```javascript
class App {
  constructor() {
    this.handlers = {}

    this.get = this.route.bind(this, 'GET')
    this.post = this.route.bind(this, 'POST')
  }

  route(method, path, handler) {
    let pathInfo = (this.handlers[path] = this.handlers[path] || {})

    // register handler
    pathInfo[method] = handler
  }

  callback() {
    return (request, response) => {
      let { url: path, method } = request

      this.handlers[path] && this.handlers[path][method]
        ? this.handlers[path][method](request, response)
        : response.end('404')
    }
  }
}
```

然后通过实例化一个Router对象进行注册对应的路径，最后启动服务：
```javascript
const app = new App()

app.get('/', function (request, response) {
  response.end('Hello World')
})

app.post('/', function (request, response) {
  response.end('Hello World With POST')
})

app.get('/sub', function (request, response) {
  response.end('sub page')
})

http
  .createServer(app.callback())
  .listen(8888, _ => console.log('Server run as http://127.0.0.1:8888'))
```

### Express中的中间件

这样，就实现了一个代码比较整洁的`HttpServer`，但功能上依旧是很简陋的。  
如果我们现在有一个需求，要在部分请求的前边添加一些参数的生成，比如一个请求的唯一ID。  
将代码重复编写在我们的`handler`中肯定是不可取的。  
所以我们要针对`route`的处理进行优化，使其支持传入多个`handler`：
```javascript
route(method, path, ...handler) {
  let pathInfo = (this.handlers[path] = this.handlers[path] || {})

  // register handler
  pathInfo[method] = handler
}

callback() {
  return (request, response) => {
    let { url: path, method } = request

    let handlers = this.handlers[path] && this.handlers[path][method]

    if (handlers) {
      let context = {}
      function next(handlers, index = 0) {
        handlers[index] &&
          handlers[index].call(context, request, response, () =>
            next(handlers, index + 1)
          )
      }

      next(handlers)
    } else {
      response.end('404')
    }
  }
}
```

然后针对上边的路径监听添加其他的handler：
```javascript
function generatorId(request, response, next) {
  this.id = 123
  next()
}

app.get('/', generatorId, function(request, response) {
  response.end(`Hello World ${this.id}`)
})
```

这样在访问接口时，就可以看到`Hello World 123`的字样了。  
这个就可以简单的认为是在`Express`中实现的 **中间件**。  
中间件是`Express`、`Koa`的核心所在，一切依赖都通过中间件来进行加载。  

## 更灵活的中间件方案-洋葱模型

上述方案的确可以让人很方便的使用一些中间件，在流程控制中调用`next()`来进入下一个环节，整个流程变得很清晰。  
但是依然存在一些局限性。  
例如如果我们需要进行一些接口的耗时统计，在`Express`有这么几种可以实现的方案：
```javascript
function beforeRequest(request, response, next) {
  this.requestTime = new Date().valueOf()

  next()
}

// 方案1. 修改原handler处理逻辑，进行耗时的统计，然后end发送数据
app.get('/a', beforeRequest, function(request, response) {
  // 请求耗时的统计
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end('XXX')
})

// 方案2. 将输出数据的逻辑挪到一个后置的中间件中
function afterRequest(request, response, next) {
  // 请求耗时的统计
  console.log(
    `${request.url} duration: ${new Date().valueOf() - this.requestTime}`
  )

  response.end(this.body)
}

app.get(
  '/b',
  beforeRequest,
  function(request, response, next) {
    this.body = 'XXX'

    next() // 记得调用，不然中间件在这里就终止了
  },
  afterRequest
)
```

无论是哪一种方案，对于原有代码都是一种破坏性的修改，这是不可取的。  
因为`Express`采用了`response.end()`的方式来向接口请求方返回数据，调用后即会终止后续代码的执行。  
而且因为当时没有一个很好的方案去等待某个中间件中的异步函数的执行。  
```javascript
function a(_, _, next) {
  console.log('before a')
  let results = next()
  console.log('after a')
}

function b(_, _, next) {
  console.log('before b')
  setTimeout(_ => {
    this.body = 123456
    next()
  }, 1000)
}

function c(_, response) {
  console.log('before c')
  response.end(this.body)
}

app.get('/', a, b, c)
```

就像上述的示例，实际上log的输出顺序为：
```bash
before a
before b
after a
before c
```

这显然不符合我们的预期，所以在`Express`中获取`next()`的返回值是没有意义的。  

所以就有了`Koa`带来的洋葱模型，在`Koa1.x`出现的时间，正好赶上了Node支持了新的语法，`Generator`函数及`Promise`的定义。  
所以才有了`co`这样令人惊叹的库，而当我们的中间件使用了`Promise`以后，前一个中间件就可以很轻易的在后续代码执行完毕后再处理自己的事情。  
但是，`Generator`本身的作用并不是用来帮助我们更轻松的使用`Promise`来做异步流程的控制。  
所以，随着Node7.6版本的发出，支持了`async`、`await`语法，社区也推出了`Koa2.x`，使用`async`语法替换之前的`co`+`Generator`。  

`Koa`也将`co`从依赖中移除（2.x版本使用[koa-convert](https://github.com/koajs/convert)将`Generator`函数转换为`promise`，在3.x版本中将直接不支持`Generator`）  
*ref: [remove generator supports](https://github.com/koajs/koa/blob/162a5b3e78bf0838cee67119804f066d6e38bf02/lib/application.js#L108)*  

*由于在功能、使用上`Koa`的两个版本之间并没有什么区别，最多就是一些语法的调整，所以会直接跳过一些`Koa1.x`相关的东西，直奔主题。*  

在`Koa`中，可以使用如下的方式来定义中间件并使用：
```javascript
async function log(ctx, next) {
  let requestTime = new Date().valueOf()
  await next()
  
  console.log(`${ctx.url} duration: ${new Date().valueOf() - requestTime}`)
}

router.get('/', log, ctx => {
  // do something...
})
```

因为一些语法糖的存在，遮盖了代码实际运行的过程，所以，我们使用`Promise`来还原一下上述代码：
```javascript
function log() {
  return new Promise((resolve, reject) => {
    let requestTime = new Date().valueOf()
    next().then(_ => {
      console.log(`${ctx.url} duration: ${new Date().valueOf() - requestTime}`)
    }).then(resolve)
  })
}
```

大致代码是这样的，也就是说，调用`next`会给我们返回一个`Promise`对象，而`Promise`何时会`resolve`就是`Koa`内部做的处理。  
可以简单的实现一下（关于上边实现的App类，仅仅需要修改`callback`即可）：
```javascript
callback() {
  return (request, response) => {
    let { url: path, method } = request

    let handlers = this.handlers[path] && this.handlers[path][method]

    if (handlers) {
      let context = { url: request.url }
      function next(handlers, index = 0) {
        return new Promise((resolve, reject) => {
          if (!handlers[index]) return resolve()

          handlers[index](context, () => next(handlers, index + 1)).then(
            resolve,
            reject
          )
        })
      }

      next(handlers).then(_ => {
        // 结束请求
        response.end(context.body || '404')
      })
    } else {
      response.end('404')
    }
  }
}
```
每次调用中间件时就监听`then`，并将当前`Promise`的`resolve`与`reject`处理传入`Promise`的回调中。  
也就是说，只有当第二个中间件的`resolve`被调用时，第一个中间件的`then`回调才会执行。  
这样就实现了一个洋葱模型。  

就像我们的`log`中间件执行的流程：
1. 获取当前的时间戳`requestTime`
2. 调用`next()`执行后续的中间件，并监听其回调
3. 第二个中间件里边可能会调用第三个、第四个、第五个，但这都不是`log`所关心的，`log`只关心第二个中间件何时`resolve`，而第二个中间件的`resolve`则依赖他后边的中间件的`resolve`。
4. 等到第二个中间件`resolve`，这就意味着后续没有其他的中间件在执行了（全都`resolve`了），此时`log`才会继续后续代码的执行

所以就像洋葱一样一层一层的包裹，最外层是最大的，是最先执行的，也是最后执行的。（在一个完整的请求中，`next`之前最先执行，`next`之后最后执行）。
![](https://camo.githubusercontent.com/d80cf3b511ef4898bcde9a464de491fa15a50d06/68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67)

## 小记

打算最近抽时间将`Koa`相关的源码翻看一波。  
应该会拆分为几段来，不一篇全写了，上次写了个装饰器的，太长，看得自己都困了。  
先占几个坑：  
- **核心模块 koa与koa-compose**
- **热门中间件 koa-router与koa-views**
- **杂七杂八的轮子 koa-bodyparser/multer/better-body/static**

[示例代码仓库地址](https://github.com/Jiasm/notebook/tree/master/labs/demo/node/learning-koa)  
[源码阅读仓库地址](https://github.com/Jiasm/notebook/blob/master/notes/koa%20%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB/readme.md)
