package main

import (
	"os"
	"fmt"
	"strings"
)

func main() {
	commands := []string{}
	
	for index, command := range os.Args[1:] {
		commands = append(commands, strings.Join([]string{fmt.Sprintf("%v", index + 1), command}, "\t"))
	}

	fmt.Printf("Command List:\n%s\n", strings.Join(commands, "\n"))
}