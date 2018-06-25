package main

type Person struct {
	name string
	age int
}

func main() {
	p1 := Person{name: "Niko", age: 18}

	println(getValue(p1))
	setValue(p1) // nothing happend
	println(getValue(p1))

	p2 := Person{name: "Niko", age: 18}

	println(getValueWithPointer(&p2))
	setValueWithPointer(&p2) // nothing happend
	println(getValueWithPointer(&p2))
}

func getValue(p Person) string {
	return p.name
}

func setValue(p Person) {
	p.name = "Bellic"
}

func getValueWithPointer(p *Person) string {
	return p.name
}

func setValueWithPointer(p *Person) {
	p.name = "Bellic"
}