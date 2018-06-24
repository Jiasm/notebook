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
		// 强类型的好处就在于此，因为设定了类型为int，则就会默认认为这里会有一个0存在
		// 要是在js中，这里直接undefined了
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("Count: %d\t Line: %s\n", n, line)
		}
	}
}

// 可以通过这个简易的命令来测试代码
// echo '1\n2\n2' | ./counter-line