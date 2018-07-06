# routing-controllers 源码阅读

> 项目地址：[https://github.com/typestack/routing-controllers](https://github.com/typestack/routing-controllers)

*感谢 [@pleerock](https://github.com/pleerock)、[@19majkel94](https://github.com/19majkel94) 及其余参与开发这个项目的人，创造出这样一个惊艳的项目*

## 背景

最近新开了一个Node.js项目（2018-07-01），然后就想着，尝试一下 [TypeScript](https://github.com/microsoft/typescript) 在服务端的应用，所以我们就实施了，在一个纯Server项目中使用了TypeScript（简称为TS）。  
TypeScript官方文档也给出了Node.js版本的示例：[TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)。  
所以接入TS是一件比较轻松的事情，但因为TS属于静态编译类语言，在开发阶段将TS代码编译为Node.js可运行的JS文件。  
在TS中，引用模块首选的是`import`语法，当然了，`require`也是可以用的。  
在TS官方的示例中，找到了我最不愿意看到的一个文件，中心化的接口管理 [app.ts](https://github.com/Microsoft/TypeScript-Node-Starter/blob/master/src/app.ts#L93)。  

之前我们在管理接口，是使用的`fs`，依据的是文件结构来动态导入所有的`router`定义，但是改成了TS以后，如果我们使用`import`语法，就不能够做到动态引入，必须在文件顶部将所有的`router`明确的定义出来。  

所以就变成了一个很尴尬的局面，按照官方示例的这种方式肯定不是我们想要的，因为一个大型项目接口很难估有多少个，全部写在一起很难维护，现在就有两种解决方案：

1. 修改之前的动态加载逻辑，在`require`返回的模块中强行指定为某个TS预先定义的复杂结构类型。
2. 换一种全新的思路，使用装饰器来创建`router`。

因为是新项目，也是TS的尝鲜，所以我们决定使用一个之前从未使用过的方案，也就是通过装饰器的方式来创建管理`router`。  

刚开始的时候，并没有直接去网上搜轮子，而是自己尝试模拟了一下想要的效果，看是否可以实现功能。  
第一天的小Demo确实通过装饰器的方式实现了简单的功能，GET、POST 以及简单的多层路径控制。  
但是，这肯定不能作为一个生产环境所使用的，因为功能过于简陋，所以就在GitHub上搜，看有没有比较成熟一些轮子，结果就找到了 [routing-controllers](https://github.com/typestack/routing-controllers) ：

> Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.
> 在 TypeScript 和 Routing Controllers 框架中使用装饰器（@Decorators）创建基于 Class 的结构化、声明式的精妙结构的 Express/Koa 服务。

## routing-controllers简单的扫盲

该轮子能够让开发者使用大量的装饰器来完成web-server的搭建，因为装饰器的特性，如果语义话跟得上的话，相当于代码自带注释，这个就很开心了。  

简单的例子：  
```javascript
@Controller('/basepath')
export class {
  @GET('/index')
  async index() {
    return 'Hello World'
  }

  @POST('/index')
  async indexPost() {
    return {
      code: 200
    }
  }
}
```

这样就创建了一个GET和一个POST接口的监听。  
使用装饰器可以极大的减少非逻辑代码，包括后续的`router.routes()`、`router.allMethods()`这些的调用也都是轮子帮你完成的。  

在自己写Demo时，我就遇到了一个问题，就是如何让Class中监听的回调生效，因为我的做法其实就是在装饰器中添加一些属性，例如Mthod和path之类的属性，然后在统一实例化所有的Class，取出对应的属性进行`router.get`、`router.post`。  
类似这样的代码：
```javascript
const controllerClasses = [IndexController, AbouotController]

routerClasses.forEach(Controller => {
  let controller = new Controller()
  let router = new Router({
    prefix: controller.basename
  })

  // 获取所有注册了GET、POST的函数
  Object.values(controller).forEach(handlerInfo => {
    // 过滤掉非router函数
    if (!handlerInfo.allowHandler) return

    // 注册对应路径的处理
    router[handlerInfo.method](handlerInfo.path, handlerInfo)
  })
})
```
但是这样就需要提前将所有的Class引入进来，然后遍历所有的有效方法进行router的监听。  

