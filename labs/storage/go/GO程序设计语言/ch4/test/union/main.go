package main

import "fmt"

func union(arr []string) []string {
	var tag string
	var cursor int
	for _, str := range arr {
		if tag != str {
			tag = str
			arr[cursor] = str
			cursor++
		}
	}

	return arr[:cursor]
}

func main() {
	arr := []string{"a", "a", "a", "b", "b", "c"}
	fmt.Println(union(arr))
}