package main

import (
	"fmt"
)

func main() {
	j, k := 1, 2

	fmt.Printf("j: %d k: %d\n", j, k)

	j, k = k, j

	fmt.Printf("j: %d k: %d\n", j, k)
}