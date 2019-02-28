package main

import "fmt"

func main () {
    arr := []int{1, 2, 3, 4}

    total := sum(arr)

    fmt.Println(total)
}

func sum (nums []int) int {
    current := nums[0]
    if len(nums) == 1 { return current }

    return current + sum(nums[1:])
}
