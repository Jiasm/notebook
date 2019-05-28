package main

import (
	"fmt"
	"os"
)

const str = `Hello
world.`

func main() {
	fmt.Fprintf(os.Stdout, str)
}