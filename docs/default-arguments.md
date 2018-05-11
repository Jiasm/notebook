# ES5与ES6两者处理函数默认值的区别

## ES5

在ES5版本中，因为没有提供的直接方法供我们我们处理函数默认值，所以只能够自己去增强函数的功能，一般会这么来做：
```javascript
function doSomething (name, age) {
  name = name || 'default name'
  age  = age  || 18

  console.log(name, age)
}
```

我们将函数的两个参数`name`与`age`进行默认值的处理，如果没有则使用默认值。
第一眼看上去好像并没有什么不对。
然而，这五种的`console`都会输出`wrong`，这就很尴尬了：
```javascript
console.log(0         || 'wrong')
console.log(''        || 'wrong')
console.log(null      || 'wrong')
console.log(false     || 'wrong')
console.log(undefined || 'wrong')
```

所以，在`ES5`中正确的默认值处理应该是这样：
```javascript
function doSomething (name, age) {
  name = name === undefined ? 'default name' : name
  age  = age  === undefined ? 18             : age

  console.log(name, age)
}

// 但是在每处都要这么写，太麻烦了
// 我们来对这个操作进行一个简易的封装
function defaultValue () {
  return arguments[+(arguments[0] === undefined)]
}

function doSomething (name, age) {
  name = defaultValue(name, 'default name')
  age  = defaultValue(age , 18)

  console.log(name, age)
}
```
*这样就实现了ES5版本的默认参数*

## ES6

ES6版本的函数默认值基本上就是我们上边实现的那种套路了
但是因为是原生的，所以会有相应的新语法，能够更简洁的使用：
```javascript
function doSomething (name = 'default name', age = 18) {
  console.log(name, age)
}
```

> 实际代码在仓库中的位置：[defaultValue](../javascript/default-arguments.js)
