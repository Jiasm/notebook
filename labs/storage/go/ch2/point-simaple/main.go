package main

func main() {
	age := 18

	println(age)
	changeAge(age)
	println(age)
	changeAgeWithPoint(&age)
	println(age)
}

func changeAge(age int) {
	age = 19 // nothing to change
}

func changeAgeWithPoint(age *int) {
	*age = 20 // changed
}