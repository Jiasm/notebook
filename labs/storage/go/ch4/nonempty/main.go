package main

import "fmt"

// 这种方式实际上会修改传入的参数
func nonempty(strings []string) []string {
	i := 0
	for _, s := range strings {
		if s != "" {
			strings[i] = s
			i++
		}
	}

	return strings[:i]
}

// 而这个属于重新创建slice，不会修改传入的参数
func nonempty2(strings []string) []string {
	out := strings[:0]
	for _, s := range strings {
		if s != "" {
			out = append(out, s)
		}
	}

	return out
}

func main() {
	arr := []string{0: "a", 2: "b"}
	fmt.Println(arr, len(arr))
	arrNonempty := nonempty([]string{0: "a", 2: "b"})
	fmt.Println(arrNonempty, len(arrNonempty))
	arrNonempty2 := nonempty2([]string{0: "a", 2: "b"})
	fmt.Println(arrNonempty2, len(arrNonempty2))
}