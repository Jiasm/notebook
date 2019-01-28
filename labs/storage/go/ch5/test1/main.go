package main

import "fmt"

func main() {
		// 1
		fmt.Println(1)

		// 4
		defer fmt.Println(4)
		
		// 3
		defer fmt.Println(3)

		// 2
		fmt.Println(2)
}