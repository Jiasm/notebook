package main

import (
    "os"
    "fmt"
    "strconv"
)

func main() {
    num, err := strconv.Atoi(os.Args[1])

    if err != nil {
        fmt.Println(err)
        os.Exit(2)
    }

    fmt.Println(calc(num, 0))
}

func calc(num, count int) int {
    if num == 1 || num == 0 {
        return count
    } else {
        return calc(int(num / 2), count + 1)
    }
}
