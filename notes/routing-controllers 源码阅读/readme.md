# routing-controllers 源码阅读

> 项目地址：[https://github.com/typestack/routing-controllers](https://github.com/typestack/routing-controllers)

*感谢 [@pleerock](https://github.com/pleerock)、[@19majkel94](https://github.com/19majkel94) 及其余参与开发这个项目的人，创造出这样一个惊艳的项目*

## 背景

最近新开了一个Node.js项目（2018-07-01），然后就想着，尝试一下 [TypeScript](https://github.com/microsoft/typescript) 在服务端的应用，所以我们就实施了，在一个纯Server项目中使用了TypeScript（简称为TS）。  

TypeScript官方文档也给出了Node.js版本的示例：[TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)。  
所以接入TS是一件比较轻松的事情，但因为TS属于静态编译类语言，在开发阶段将TS代码编译为Node.js可运行的JS文件。  
在TS中，引用模块首选的是`import`语法，当然了，`require`也是可以用的。  
在TS官方的示例中，找到了我最不愿意看到的一个文件，中心化的接口管理 [app.ts](https://github.com/Microsoft/TypeScript-Node-Starter/blob/master/src/app.ts#L93)。  

之前我们在管理接口，是使用的`fs`依据文件结构来动态导入所有的`router`定义，但是改成了TS以后，如果我们使用`import`语法，就不能够做到动态引入，必须在文件顶部将所有的`router`明确的定义出来。  

按照官方示例的这种方式肯定不是我们想要的，因为一个大型项目接口很难估有多少个，全部写在一起很难维护。  

因为是新项目，也是TS的尝鲜，所以我们决定使用一个之前从未使用过的方案，也就是通过装饰器的方式来创建管理`router`。  

所以就在GitHub中搜看有没有成熟的轮子，结果就找到了 [routing-controllers](https://github.com/typestack/routing-controllers) ：  

> Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.  
> 在 TypeScript 和 Routing Controllers 框架中使用装饰器（@Decorators）创建基于 Class 的结构化、声明式的精妙结构的 Express/Koa 服务。

## 理解装饰器

对装饰器的理解是阅读此源码的基础，TS中的装饰器使用`@`作为开头，后边跟随一个函数的引用。  
可以放置在 Class、函数( Class 中的函数)、访问器、属性以及函数参数中。  
一个装饰器简单的示例：  
```javascript
@ClassHandler
class Demo {

}

function ClassHandler(constructor) {
  console.log(constructor, constructor === Demo)
}
```

## routing-controllers简单的扫盲

该轮子能够让开发者使用大量的装饰器来完成web-server的搭建，因为装饰器的特性，如果语义话跟得上的话，相当于代码自带注释，这个就很开心了。  

简单的例子：  
```javascript
// IndexController.ts
import {Controller, Get, Post} from 'routing-controllers'

@Controller('/basepath')
export default class {
  @Get('/index')
  async index() {
    return 'Hello World'
  }

  @Post('/index')
  async indexPost() {
    return {
      code: 200
    }
  }
}
```

这样就创建了一个 GET 和一个 POST 接口的监听。  

然后是启动 Server 的代码：
```javascript
// app.ts

import 'reflect-metadata'
import {createExpressServer} from 'routing-controllers'
import IndexController from './IndexController'

const app = createExpressServer({
  controllers: [IndexController]
})

app.listen(3000) // done
```

可以看到使用装饰器可以极大的减少非逻辑代码，之前的`rotuer.get/post`包括后续的`router.routes()`、`router.allMethods()`这些的调用都是轮子来完成的。  
