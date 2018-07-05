package main

import (
	"fmt"
	"math"
)

const (
	_ int64 = 1 << (10 * iota)
	KiB
	MiB
	GiB
	TiB
	PiB
	EiB
)

const (
	test = powerf3(1, 3)
)

// const (
// 	_ = math.Pow(float64(iota), float64(1e3))
// 	KB
// 	MB
// 	GB
// 	TB
// 	PB
// 	EB
// )

func powerf3(x float64, n int) float64 {
	ans := 1.0

	for n != 0 {
			ans *= x
			n--
	}
	return ans
}

func main() {
  fmt.Printf("%d\n%d\n%d\n%d\n%d\n%d\n", KiB ,MiB ,GiB ,TiB ,PiB ,EiB)
  // fmt.Printf("%d\n%d\n%d\n%d\n%d\n%d\n", KB ,MB ,GB ,TB ,PB ,EB)
}