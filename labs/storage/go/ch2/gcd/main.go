package main

func main() {
	x, y := 10, 20

	println(gcd(x, y))
}

func gcd(x, y int) int {
	for y != 0 {
		x, y = y, x % y
	}

	return x
}