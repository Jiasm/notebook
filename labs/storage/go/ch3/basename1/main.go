package main

import "fmt"

func main() {
	path1, path2, path3 := "a/b/c.go", "c.d.go", "abc"
	fmt.Printf("path: %s -> %s\n", path1, basename(path1))
	fmt.Printf("path: %s -> %s\n", path2, basename(path2))
	fmt.Printf("path: %s -> %s\n", path3, basename(path3))
}

func basename(s string) string {
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '/' {
			s = s[i + 1:]
			break
		}
	}

	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '.' {
			s = s[:i]
			break
		}
	}

	return s
}