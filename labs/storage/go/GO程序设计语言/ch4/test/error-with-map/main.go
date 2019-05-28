package main

import "fmt"

func main() {
	var maps map[string]int

	fmt.Println(maps == nil)    // true
	fmt.Println(len(maps) == 0) // true

	// 但是如果针对一个零值map来进行赋值操作会宕机
	maps = make(map[string]int) // 必须要先初始化
	maps["Niko"] = 18 // Error
}