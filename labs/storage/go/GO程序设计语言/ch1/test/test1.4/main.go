package main

import (
	"fmt"
	"os"
	counter "./counter"
)

func main() {
	counts := map[string]map[string]int{}
	files := os.Args[1:]

	for _, file := range files {
		f, err := os.Open(file)

		if err != nil {
			fmt.Fprintf(os.Stderr, "count line: %v\n", err)
			continue
		}

		counts[file] = make(map[string]int)

		counter.CountLines(f, counts[file])
		f.Close()
	}

	for fileName, countList := range counts {
		if countList != nil {
			for line, n := range countList {
				if n > 1 {
					fmt.Printf("File: %s\t Count: %d\tLine: %s\n", fileName, n, line)
				}
			}
		}
	}
}