package main

import (
	"sort"
	"fmt"
	"bytes"
)

func main() {
	s11, s12 := "123", "321"
	s21, s22 := "1234", "12345"
	
	fmt.Printf("check %s -> %s: %v\n", s11, s12, check([]byte(s11), []byte(s12)))
	fmt.Printf("check %s -> %s: %v\n", s21, s22, check([]byte(s21), []byte(s22)))
}

func check(a, b []byte) bool {
	sort.Slice(a, func(i, j int) bool {
		return a[i] > a[j]
	})
	sort.Slice(b, func(i, j int) bool {
		return b[i] > b[j]
	})
  return bytes.Compare(a, b) == 0
}