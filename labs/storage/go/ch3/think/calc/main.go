package main

import "fmt"

func main() {
	var x uint8 = 1 << 1 | 1 << 5
	var y uint8 = 1 << 1 | 1 << 2

	fmt.Printf("%08b\n", x)
	fmt.Printf("%08b\n", y)
	
	fmt.Printf("%08b\n", x & y) // 交集，两者相同的值
	fmt.Printf("%08b\n", x | y) // 并集，两者重叠后的所有值
	fmt.Printf("%08b\n", x ^ y) // 对称差 交集的相反集合，属于x，属于y，但是不共同属于x或者y
	fmt.Printf("%08b\n", x &^ y) // 差集，属于x 但是不属于 y的所有集合
	fmt.Printf("%08b\n", x &^ y) // 差集，属于x 但是不属于 y的所有集合
}