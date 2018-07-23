package main

import "fmt"

func main() {
  fmt.Println(equal(map[string]int{
		"Niko": 18,
	}, map[string]int{
		"Niko": 19,
	}))

  fmt.Println(equal(map[string]int{
		"Niko": 18,
	}, map[string]int{
		"Romman": 18,
	}))

  fmt.Println(equal(map[string]int{
		"Niko": 18,
	}, map[string]int{
		"Niko": 18,
	}))
}

func equal(x, y map[string]int) bool {
	if len(x) != len(y) {
		return false
	}

	for k, xv := range x {
		if yx, ok := y[k]; !ok || yx != xv {
			return false // 不存在该key，或者该key对应的值不想等
		}
	}

	return true
}