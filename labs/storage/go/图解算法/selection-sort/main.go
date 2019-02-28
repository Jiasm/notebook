package main

import (
    "fmt"
)

func main () {
    arr := []int{5, 3, 6, 2, 10}

    newArr := make([]int, len(arr))

    for index := range arr {
        smallest := findSmallest(arr)
        newArr[index] = arr[smallest]
        arr = append(arr[:smallest], arr[smallest + 1:]...)
    }

    fmt.Println(newArr)
}

func findSmallest (arr []int) (smallestIndex int) {
    smallestIndex = 0
    smallest := arr[smallestIndex]

    for index, item := range arr[1:] {
        if item < smallest {
            smallestIndex = index + 1
            smallest = item
        }
    }
    
    return
}
