package main

import (
	"os"
	"fmt"
)

func main() {
	fmt.Printf("You command is: [%s]\n", os.Args[0])
}