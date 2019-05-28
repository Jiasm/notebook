package popcount1

var pc [256]byte

func init() {
	for i := range pc {
		pc[i] = pc[i / 2] + byte(i & 1)
	}
}

func PopCount(x uint64) int {
	var results byte

	var i uint64 
	for i = 1; i < 10; i++ {
		results += pc[byte(x>>(i * 2))]
	}

	return int(results)
}