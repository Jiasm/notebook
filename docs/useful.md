## 一些实用的技巧

### 如何将某个参数设置为必传参数

在ES6环境下，可以很简单的将一个参数设置为必传的参数：
```javascript
function requireVariable (variable) {
  throw new Error(`variable [${variable}] is required`)
}

function func (name = requireVariable('name')) { }

func() // throw error `variable [name] is required`
```
