package main

import "fmt"

func main() {
	x := "HELLO!"

	for i := range x {
		x := x[i]

		if x != '!' {
			x := x + 'a' - 'A'

			fmt.Printf("%c", x)
		}
	}
}