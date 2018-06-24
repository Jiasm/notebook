package main

import (
	"fmt"
	"os"
	counter "./counter"
)

func main() {
	counts := make(map[string]int)
	files := os.Args[1:]

	if len(files) == 0 {
		counter.CountLines(os.Stdin, counts)
	} else {
		for _, file := range files {
			f, err := os.Open(file)

			if err != nil {
				fmt.Fprintf(os.Stderr, "count line: %v\n", err)
				continue
			}

			counter.CountLines(f, counts)
			f.Close()
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("Count: %d\tLine: %s\n", n, line)
		}
	}
}