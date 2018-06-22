package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	// 使用 strings的Join来代替手动的for each循环
	fmt.Println(strings.Join(os.Args[1:], " "))
}
