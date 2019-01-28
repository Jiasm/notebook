### 异常处理

GO 中惯用的风格是，错误处理在前，正确逻辑在后。  
并且不是`if-else`的形式，而是使用`if`处理异常，并在之后执行正确代码。

```go
data, err := func1()

if err != nil {
  // do something
}

// do something right
```

### 函数值

__函数只能重新赋值给函数签名，返回值相同的函数。__  

```go
func func1(a int) int { return a }
func func2(a int) int { return a }
func func3(a int) int, int { return a, a }

funcTemp := func1
funcTemp := func2

// throw error
funcTemp := func3
```

__声明的函数初始值为`nil`，针对`nil`进行函数调用会触发`panic`异常。__  
__所以在使用函数时应当判断函数是否为`nil`__

```go
var f func(int) int

if f != nil {
  f(1)
}
```

__函数值不可比较，不可用于`Map`的`key`。__  