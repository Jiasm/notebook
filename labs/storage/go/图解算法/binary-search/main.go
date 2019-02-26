package main

import (
    "fmt"
    "time"
    "log"
    "os"
    "strconv"
)

func main() {
    count, err := strconv.Atoi(os.Args[1])

    if err != nil {
        log.Fatal(err)
        return
    }

    item, err := strconv.Atoi(os.Args[2])

    if err != nil {
        log.Fatal(err)
        return
    }


    list := make([]int, count) 

    for k := range list {
        list[k] = k
    }

    res, ok := search(list, item)

    fmt.Println(res, ok)

    resNormal, ok := searchNormal(list, item)
    
    fmt.Println(resNormal, ok)
}

func searchNormal(list []int, item int) (res int, ok bool) {
    defer trace("简单查询")()

    ok = false

    for k, v := range list {
        if v == item {
            res = k
            ok = true
            return
        }
    }

    return
}

func search(list []int, item int) (res int, ok bool) {
    defer trace("二分法")()

    ok = false
    low := 0
    high := len(list) - 1

    for low <= high {
        mid := int((low + high) / 2)
        guess := list[mid]

        if guess == item {
            ok = true
            res = mid 
            return
        } else if guess > item {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }

    return
}

func trace(msg string) func() {
    start := time.Now()

    return func() {
        log.Printf("%s exec (%s)", msg, time.Since(start))
    }
}
