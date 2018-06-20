## 一些实用的技巧

- [将某个参数设置为必传参数](#将某个参数设置为必传参数)
- [让传入setInterval的函数立即执行](#让传入setinterval的函数立即执行)

### 将某个参数设置为必传参数

在ES6环境下，可以很简单的将一个参数设置为必传的参数：
```javascript
function requireVariable (variable) {
  throw new Error(`variable [${variable}] is required`)
}

function func (name = requireVariable('name')) { }

func() // throw error `variable [name] is required`
```

`ES6`中的函数参数默认值为惰性执行的代码，只有在没有传递该参数时才会执行对应的表达式，所以只要调用函数时没有传入`name`参数，就会触发默认参数的逻辑，并`throw Error`。  

### 让传入setInterval的函数立即执行

如果大家遇到过类似这样的代码，并且想写的更简洁一些（删掉那一行手动的函数调用）：
```javascript
function func() {}

// 触发函数
func()

// 定时每秒执行一次函数
setInterval(func, 1000)
```

我们需要这样的一个工具函数来帮助我们实现需求：
```javascript
function runner (func) {
  return (func(), func)
}

function func() {
  console.log('trigger')
}

setInterval(runner(func), 1000)
```

善用`,`逗号操作符能够很轻易的实现我们所需要的逻辑，一个`,`逗号操作符的意义在于，依次执行`,`逗号左侧的表达式，并返回最后一个表达式的值。
