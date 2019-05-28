package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"unicode"
	"unicode/utf8"
)

func main() {
	counts := make(map[rune]int) // Unicode 字符数量
	var utflen [utf8.UTFMax]int  // UTF-8编码的长度
	invalid := 0

	in := bufio.NewReader(os.Stdin)

	for {
		r, n, err := in.ReadRune() // 返回 rune、nbtyes、error

		if err == io.EOF {
			break
		}

		if err == io.EOF {
			fmt.Fprintf(os.Stderr, "charcount: %v\n", err)
			os.Exit(1)
		}

		if r == unicode.ReplacementChar && n == 1 {
			invalid++
			continue
		}

		counts[r]++
		utflen[n]++
	}

	fmt.Printf("rune\tcount\n")

	for i, n := range counts {
		if i > 0 {
			fmt.Printf("%q\t%d\n", i, n)
		}
	}

	fmt.Print("\nlen\tcount\n")

	for i, n := range utflen {
		if i > 0 {
			fmt.Printf("%d\t%d\n", i, n)
		}
	}

	if invalid > 0 {
		fmt.Printf("\n%d invalid UTF-8 characters\n", invalid)
	}
}