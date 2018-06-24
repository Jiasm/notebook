package main

import (
	"fmt"
	"bufio"
	"os"
)

func main() {
	counts := make(map[string]int)
	// 创建一个key是string类型，value是int类型的数组（或者可以称为对象）。
	// typescript: 
	//   let counts: { [k: string]: number } = {}
  // flowtype:
	//   let counts: { [string]: number } = {}
	input := bufio.NewScanner(os.Stdin)

	// go中没有while么？？真省事儿
	for input.Scan() {
		counts[input.Text()]++
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("Count: %d\t Line: %s\n", n, line)
		}
	}
}

// 可以通过这个简易的命令来测试代码
// echo '1\n2\n2' | ./counter-line