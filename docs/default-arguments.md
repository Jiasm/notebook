# 如何在ES5与ES6环境下处理函数默认参数

> 函数默认值是一个很提高鲁棒性的东西（就是让程序更健壮）
> MDN关于函数默认参数的描述：函数默认参数允许在没有值或`undefined`被传入时使用默认形参。

## ES5

### 使用逻辑或`||`来实现

众所周知，在ES5版本中，并没有提供的直接方法供我们我们处理函数默认值  
所以只能够自己去增强函数的功能，一般会这么来做：
```javascript
function doSomething (name, age) {
  name = name || 'default name'
  age  = age  || 18

  console.log(name, age)
}
```

我们将函数的两个参数`name`与`age`进行默认值的处理，如果没有则使用默认值。
在执行一下函数后，好像并没有什么不对：
```javascript
doSomething()       // default name, 18
doSomething('Niko') // Niko        , 18
doSomething(, 12)   // default name, 12
```

然而当我们执行这样的代码时，就会获得一些超出预期的结果：
```javascript
doSomething('Niko', 0) // Niko, 18
```
*能够发现，对于参数`0`，我们上边的默认参数实现方法是有问题的*

就像下边的四个表达式，都会输出`wrong`，这很显然不能够满足上边MDN关于函数默认参数的定义：
```javascript
console.log(0         || 'wrong')
console.log(''        || 'wrong')
console.log(null      || 'wrong')
console.log(false     || 'wrong')
```

### 正确的姿势

所以，在`ES5`中正确的默认值处理应该是这样：
```javascript
function doSomething (name, age) {
  if (name === undefined) {
    name = 'default name'
  }

  if (age === undefined) {
    age = 18
  }

  console.log(name, age)
}
```

#### 使用三元运算符简化操作

或者我们简写成三元运算符形式的：

```javascript
function doSomething (name, age) {
  name = name === undefined ? 'default name' : name
  age  = age  === undefined ? 18             : age

  console.log(name, age)
}
```

#### 使用函数进行封装

但是如果我们每写一个函数，都要重复的去做这些操作  
未免太麻烦了，所以，我们对这个逻辑进行一个简单的封装：

```javascript
function defaultValue (val, defaultVal) {
  return val === undefined ? defaultVal : val
}

function doSomething (name, age) {
  name = defaultValue(name, 'default name')
  age  = defaultValue(age , 18)

  console.log(name, age)
}
```
这样就很简洁的在`ES5`实现了函数默认参数的逻辑  

##### one momre things

关于上边的`defaultValue`函数实现方法，我们在合理的使用弱类型语言的优势后  
可以使用这种方式来省去三元运算符的操作：
```javascript
function defaultValue () {
  return arguments[+(arguments[0] === undefined)]
}
```

我们知道，`arguments`表示函数所有的实参  
我们使用`arguments[0]`获取第一个实参，然后与`undefined`进行全等比较  
在外层将表达式的结果转换为`Number`，然后将这个值作为下标获取`arguments`中对应的参数。  
因为是由`Boolean`值转变而来，所以只会存在`0`、`1`两种选项。  
也就实现了上边三元运算符的功能。  

## ES6

ES6版本的函数默认值基本上就是我们上边实现的那种套路了
但是因为是原生的，所以会有相应的新语法，能够更简洁的使用：
```javascript
function doSomething (name = 'default name', age = 18) {
  console.log(name, age)
}
```

`ES6`中提供了新的语法，可以让我们在函数声明参数后边直接写`= [defaultValue]`的这种形式来设置某个参数的默认值。  
直接使用这种方式，省去了在函数内部进行默认值的检查，能够让函数专注的做它应该做的事情。  

### 如何针对某些必填参数抛出异常

`ES6`这种新语法能够让我们很好的针对某个必填参数进行错误提醒：  
```javascript
function requireParams () {
  throw new Error('required params')
}

function doSomething (name = requireParams(), age = 18) {
  // do something
}
```

如果`name`参数为`undefined`，就会触发默认值规则  
然后调用`requireParams`函数，而我们在函数中直接`throw`了一个`Error`

### 复杂结构参数的默认值处理

上边的处理都是针对简单的基本类型数据进行处理的，但如果我们有如下的一个函数：
```javascript
function init ({id, value}) {}

init({
  id: 'tagId',
  value: 1
})
```

如果在`ES5`环境下，针对这种参数的默认值处理将会变得无比复杂  
首先要判断这一个参数是否存在，然后在判断参数中的所有`key`是否存在  
而在`ES6`中，可以这样来做：  
```javascript
function init ({
  id    = 'defaultId',
  value = 1
} = {}) {
  console.log(id, value)
}

init()
```

首先在解构函数的后边添加默认值`= {}`，然后针对每一项参数添加默认值，很简洁的就实现了我们的需求。

> ES5版本的polyfill代码在仓库中的位置：[defaultValue](https://github.com/Jiasm/notebook/blob/master/javascript/es5-default-value-polyfill.js)

## 参考资料

1. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
