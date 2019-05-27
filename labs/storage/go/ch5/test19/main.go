package main

import "fmt"

func main() {
    variable := getVal()

    fmt.Println(variable)
}

func getVal() (result int) {
    type knownError struct{}

    defer func() {
        switch res := recover(); res {
            case knownError{}: result = 1
            default: result = 2
        }
    }()

    panic(knownError{})
}
