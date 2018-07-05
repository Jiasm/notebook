package main

import "fmt"

const (
	one, two = iota, iota // 0, 0
	three = iota					// 1
	four									// 2
	five									// 3
)

func main() {
	fmt.Printf("%d\n%d\n%d\n%d\n%d\n", one, two, three, four, five)
}