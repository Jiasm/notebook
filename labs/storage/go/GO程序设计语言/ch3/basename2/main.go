package main

import (
	"strings"
	"fmt"
)

func main() {
	path1, path2, path3 := "a/b/c.go", "c.d.go", "abc"
	fmt.Printf("path: %s -> %s\n", path1, basename(path1))
	fmt.Printf("path: %s -> %s\n", path2, basename(path2))
	fmt.Printf("path: %s -> %s\n", path3, basename(path3))
}

func basename(s string) string {
	slash := strings.LastIndex(s, "/") // 如果没有匹配到，则会返回-1

	s = s[slash + 1:] // -1 + 1 等于0，则表示从头部开始截取，没有什么改变

	if dot := strings.LastIndex(s, "."); dot >= 0 { // 如果能获取到最后一个.的位置，舍弃后边的所有字符
		s = s[:dot]
	}

	return s
}