package main

import "fmt"

func main () {
    arr := []int{5, 8, 1, 4, 9, 2}

    res := quicksort(arr)

    fmt.Println(res)
}

func quicksort (arr []int) []int {
    if len(arr) == 1 { return arr }

    pivot := arr[0]
    var less []int
    var greater []int

    for _, item := range arr[1:] {
        if item >= pivot {
            less = append(less, item) 
        } else {
            greater = append(greater, item) 
        }
    }

    var res []int

    if len(less) > 0 {
        res = append(res, quicksort(less)...)
    }

    res = append(res, pivot)

    if len(greater) >0 {
        res = append(res, quicksort(greater)...)
    }

    return res
}
