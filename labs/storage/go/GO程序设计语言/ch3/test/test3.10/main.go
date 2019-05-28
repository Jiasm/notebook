package main

import (
	"fmt"
	"bytes"
)

func main() {
	num1, num2, num3, num4 := "12", "123", "1234", "1234567"
  fmt.Printf("%s: %s\n", num1, comma(num1))
  fmt.Printf("%s: %s\n", num2, comma(num2))
  fmt.Printf("%s: %s\n", num3, comma(num3))
  fmt.Printf("%s: %s\n", num4, comma(num4))
}

func comma(nums string) string {
	var b bytes.Buffer

	for index, num := range nums {
		if index > 0 && len(nums[index:]) % 3 == 0 {
			b.WriteString(",")
		}
		b.WriteString(string(num))
	}

	return b.String()
}