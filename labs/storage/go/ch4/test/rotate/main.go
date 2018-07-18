package main

import "fmt"

func rotate(arr []int) []int {
	len := len(arr)

	for index := range arr {
		arr = append(arr, arr[len - 1 - index])
	}

	return arr[len:]
}

func main() {
	arr := []int{1, 2, 3, 4}

	fmt.Println(arr)
	fmt.Println(rotate(arr))
}