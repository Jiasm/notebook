package main

import (
	"./tempconv"
	"fmt"
)

func main() {
	fmt.Printf("Brrrr! %v -> %v\n", tempconv.AbsoluteZeroC, tempconv.C2F(tempconv.AbsoluteZeroC))
	fmt.Printf("Hot! %v -> %v\n", tempconv.BoilingC, tempconv.C2F(tempconv.BoilingC))
}