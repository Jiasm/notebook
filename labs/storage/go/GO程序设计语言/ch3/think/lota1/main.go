package main

import "fmt"

const (
	one = iota
	two = iota
	three = 0
	four = iota
	five
)

func main() {
	fmt.Printf("%d\n%d\n%d\n%d\n%d\n", one, two, three, four, five)
}