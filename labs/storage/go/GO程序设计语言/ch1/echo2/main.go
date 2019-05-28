package main

import (
	"fmt"
	"os"
)

func main() {
	s, sep := "", ""

	// 使用for each来代替之前的for
	for _, arg := range os.Args[1:] {
		s += sep + arg
		sep = " "
	}
	// for (let [_, arg] of Object.entries([1, 2])) {
	//   s += sep + arg
	//   sep = ' '
	// }

	fmt.Println(s)
}
