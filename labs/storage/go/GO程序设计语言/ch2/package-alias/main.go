package main

import (
	"fmt"
	aliasPkg "./pkg"
)

func main() {
	age, gender := aliasPkg.GetInfo()

	fmt.Printf("Age: %d, Gender: %d\n", age, gender)
}