## 入门

首先是所有语言都会有的，开篇`Hello World`。

一个简单的 GO 语言示例：

```go
package main

func main() {
  println("Hello World.")
}
```

`GO`提供了两种方式来执行，可以直接通过`go run`命令来执行一个`.go`文件，  
也可以通过`go build`将`.go`文件编译为一个可执行的二进制文件直接执行。

```bash
> go run helloworld.go

> go build helloworld.go
> ./heloworld
```

每个 GO 文件都需要在开头通过`package XXX`来声明这个文件属于哪个包。  
`main`是比较特殊的一个标识，是可以单独执行的一个文件。

在`package`后，就要定义这个文件中所引用的一些其他的包了，在上述的`helloworld`示例中没有引用任何包，下边展示一下引用一些包的写法：

```go
package main

import (
  "fmt"
)

func main() {
  fmt.Println("helloworld")
}
```

以及在`main`包里边会默认执行的`main`函数，该函数执行后，我们就可以在控制台看到一行`helloworld`的输出了。

使用`os`包接收输入值，可以用于管道中，类似`echo '1\n1\n2' | go run XXX`这样的操作。  
可以作为一些小脚本工具来使用。
[一个统计重复行数的程序](/labs/storage/go/ch1/counter-line/main.go)

小小的尝试了一下创建一个自定义的包然后引入，有这么几点需要注意的：

1.  如果需要用到包中的方法，可以在`import`前指定别名
2.  `import`的路径为你要引用的包的上层文件夹，所以一定不能跟入口文件在同一层
3.  被引用的包中导出的函数首字母一定要大写

[简单的针对多文件进行统计的例子](/labs/storage/go/ch1/counter-line-2/main.go)

GOLANG 相对于其他的语言，例如 JS 之类的，在 Switch 上有一点儿特别棒。  
所有的 case 相当于默认添加了 break，如果需要执行后续的 case，则需要手动调用 fallthrough。  
本身 break 的场景就会多，将 break 作为默认配置，能节省不少的代码。

`*`和`&`，对于一个`struct`的取值来讲，是否是指针则没有什么区别，但是在设置值的时候，只有是指针的情况下才会作为引用传递，进而影响到外层的 struct 的实际值。
