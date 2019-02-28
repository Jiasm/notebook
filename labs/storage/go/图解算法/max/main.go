package main

import "fmt"

func main () {
    arr := []int{1, 2, 3, 4, 5}

    res := max(arr)

    fmt.Println(res)
}

func max (nums []int) int {
    current := nums[0]

    if len(nums) == 1 { return current }

    res := max(nums[1:])

    if res > current {
        return res
    } else {
        return current
    }
}
