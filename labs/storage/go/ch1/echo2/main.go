package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""

	// 使用for each来代替之前的for
	// 类似js中的 for (let [_, value] of Object.entries([1, 2]))
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}

	fmt.Println(s)
}
