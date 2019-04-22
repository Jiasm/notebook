package main

import "fmt"

func main() {
	teacherAge := 1
	studentAge := 1

	min := 8
	max := 50
	count := 1

	for teacherAge = min; teacherAge <= max; teacherAge++ {
		for studentAge = min; studentAge <= max; studentAge++ {
			if studentAge - (teacherAge - studentAge) == min && teacherAge + (teacherAge - studentAge) == max {
				fmt.Println(teacherAge, studentAge)
			}
			count++
		}
	}
} 