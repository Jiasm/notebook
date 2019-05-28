package main

type Person struct {
	age int
}

func main() {
	person := Person{age: 18}
	
	println(person.age)
	changeAge(person)
	println(person.age)
	changeAgeWithPoint(&person)
	println(person.age)
}

func changeAge(person Person) {
	person.age = 19
}

func changeAgeWithPoint(person *Person) {
	person.age = 20
}