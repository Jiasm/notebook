## 程序结构

### 名称

在 GO 中的命名仅需要遵守一个简单的规则：名称开头是一个字母（Unicode 中的字符即可） or 下划线  
数字不能作为开头来使用，以及要避开将一些关键字作为变量名。

### 短变量声明

短变量声明的语法为：
会自动添加变量的类型

```go
age := 18
name := "Niko"
```

函数可以返回多个值，也可以使用短变量的方式来接收：

```go
file, err := os.Open("XXX")
```

短变量声明只能应用于函数内部。  
短变量声明不要求前边的变量都是不存在的，如果是之前存在的，则会重新赋值。  
但是要保证每次短变量声明至少创建一个新的变量，否则会编译失败。

例如：

```go
a, b := XXX // success
a, c := XXX // success
a, c := XXX // failed
```

### 指针

变量是存储值的地方。  
指针的值是变量的地址。指向了某个变量的值具体存储的位置。  
**不是所有的值都有地址（1、true、nil），但是所有的变量都有。**  
GO 中的函数参数是按值传递的，也就是说，如果我们在一个函数中要修改某个参数的值，其实是做不到的。  
所以我们就需要用到指针，在函数中传递某个变量对应的地址，这样我们就可以无需知道实际变量是什么，而去直接修改这个变量的值。

```go
x := 1          // int
p := &x         // int的指针，指向了存储1的地址
fmt.Println(*p) // 1
*p = 2          // 修改了该指针对应地址的值为2，也就是说，x的值也会跟着改变
fmt.Println(x)  // 2
```

[指针修改变量的值](/labs/storage/go/ch2/point-simaple/main.go)  
不同于 JavaScript 的按值传递 JS 在传递一些非基本类型时，所传的值其实就是地址，所以在 GO 中，一个 struct，接近 JS 中 object 结构的值，依旧无法直接修改其对应的值，必须要用传递指针的方式才可以修改：  
[指针修改 Struct 变量的值](/labs/storage/go/ch2/point-simaple/main.go)

### 可赋值性

在 GO 中赋值需要保证两边的类型一致，当然也有例外，比如 nil 可以赋值给任意接口变量或引用类型。  
使用`==`、`!=`进行判断时也需要保证两侧的类型一致，这也就是为什么在一些函数调用时会判断`err != nil`。  
因为 int、string 之类的有自己的零值，所以 nil 不能用于对其的判断。

### 类型声明

我们可以通过`type <TYPE_NAME> <REAL_TYPE>`的方式来声明一个特殊的类型。  
一般类型都会在包级别的代码声明，如果是大写开头的类型，则认为是导出的，其他的包也可以访问到这个类型。  

使用`<TYPE_NAME>(XXX)`即可完成强制的类型转换，原始类型也可以这么用。  
例如`int(1)`之类的，如果两个类型具有相同的底层类型、或者二者都是指向相同底层类型变量的未命名指针类型。  
*如果值对于要转换的类型来说是可赋值的，那么类型转换也是生效的，但是通常不这么做*

```go
type Age int
```

即使两个类型的原始类型是一致的，也没有办法直接使用算术运算符进行比较或者操作。  

```go
type Age int
type Gender int

var (
	age Age = 1
	gender Gender = 2
)

age + gender
// invalid operation: age + gender (mismatched types Age and Gender)

age + Age(gender)       // 将两者类型转为一致即可
int(age) + int(gender)  // 全部转换为int
age + 1                 // 直接使用原始值也是可以的，因为会自动转换为age所对应的类型
```

### 包和文件

相同目录下多个文件可以使用同一个包名，在引入该包时就会引入所有的`.go`文件内容了。  
> pkg/types.go

```go
package info

type Age int
type Gender int

const (
  age Age = 18
  gender Gender = 1
)
```

> pkg/methods.go

```go
package info

func SHowInfo () {
  fmt.Printf("Age: %d Gender: %d", Age, Gender)
}
```

### 作用域

每个函数、变量都有作用域。  
`{}`被认为是一个语法块，如果在块中声明变量，则变量的作用域就被固定在了这个块中。  
> `XXX := XXX`是声明的缩写，而`XXX = XXX`则是简单的赋值，不会创建新的变量

在一个包中（不在任何语法块中）声明的变量作用域为包。所有该包内的程序都可以引用到他。  
`import XXX`是文件级别的，即使相同包，不同文件，文件a引用了，文件b也需要引用才可以使用。  