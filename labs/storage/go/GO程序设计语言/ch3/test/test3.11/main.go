package main

import (
	"fmt"
	"bytes"
	"strings"
)

func main() {
	num1, num2, num3, num4 := "12", "123.1234", "1234.2333", "1234567.12"
  fmt.Printf("%s: %s\n", num1, comma(num1))
  fmt.Printf("%s: %s\n", num2, comma(num2))
  fmt.Printf("%s: %s\n", num3, comma(num3))
  fmt.Printf("%s: %s\n", num4, comma(num4))
}

func comma(nums string) string {
	var b bytes.Buffer

	numStr, floatStr := nums, ""
	

	if dotIndex := strings.Index(nums, "."); dotIndex >= 0 {
		numStr = nums[:dotIndex]
		floatStr = nums[dotIndex:]
	}

	for i, num := range numStr {
		if i > 0 && len(numStr[i:]) % 3 == 0 {
			b.WriteString(",")
		}

		b.WriteString(string(num))
	}
	b.WriteString(string(floatStr))

	return b.String()
}