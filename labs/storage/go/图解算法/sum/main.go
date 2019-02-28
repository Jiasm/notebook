package main

import "fmt"

func main () {
    arr := []int{1, 2, 3, 4}

    total := sum(arr, 0)

    fmt.Println(total)
}

func sum (nums []int, total int) int {
    if len(nums) == 0 { return total }

    current, others := nums[0], nums[1:]

    return sum(others, total + current)
}
