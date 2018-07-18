package main

import "fmt"

func reverse(arr *[]int) {
	
	for len, index := len(*arr) - 1, 0; index < len; index, len = index + 1, len - 1 {
		(*arr)[index], (*arr)[len] = (*arr)[len], (*arr)[index]
	}
}

func main() {
	arr := []int{1, 2, 3, 4}
	
	reverse(&arr)

	fmt.Println(arr)
}