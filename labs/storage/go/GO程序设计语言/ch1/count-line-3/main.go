package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

func main() {
	counts := make(map[string]int)

	for _, filename := range os.Args[1:] {
		data, err := ioutil.ReadFile(filename)
		// let data = fs.readFileSync(filename)

		if err != nil {
			fmt.Fprintf(os.Stderr, "count-line-3: %v\n", err)
			continue
		}

		for _, line := range strings.Split(string(data), "\n") {
		// for (let line of data.toString().split('\n'))
		counts[line]++
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("Count: %d\tLine: %s\n", n, line)
		}
	}
}