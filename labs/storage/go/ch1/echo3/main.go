package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	// 使用 strings的Join来代替手动的for each循环
	// String.prototype.join.call(os.slice(1), ' ')
	fmt.Println(strings.Join(os.Args[1:], " "))
}
