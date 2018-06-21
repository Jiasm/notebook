package main

import (
	"fmt"
	"os"
)

func main() {
	var s, sep string // 变量可以通过声明时手动指定类型，也可以直接赋值，隐式指定类型
	// var s        = 1
	// var s number = 1

	// i = 1 是因为第一个为命令本身的名字
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i]
		sep = " "
	}

	fmt.Println(s)
}
