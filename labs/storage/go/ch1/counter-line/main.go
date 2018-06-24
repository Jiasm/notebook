package main

import (
	"fmt"
	"bufio"
	"os"
)

func main() {
	counts := make(map[string]int)
	input := bufio.NewScanner(os.Stdin)
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