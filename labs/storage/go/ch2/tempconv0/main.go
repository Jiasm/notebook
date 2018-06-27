package main

import "fmt"

type Celsius float64
type Fahrenheit float64

const (
	AbsoluteZeroC Celsius = - 273.15
	FreezingC 	  Celsius = 0
	BoilingC			Celsius = 100
)

func C2F(c Celsius) Fahrenheit {
	return Fahrenheit(c * 9 / 5 + 32)
}

func F2C(f Fahrenheit) Celsius {
	return Celsius((f - 32) * 5 / 9)
}

func main() {
	absoluteZero := C2F(AbsoluteZeroC)
	freezing := C2F(FreezingC)
	boiling := C2F(BoilingC)
	fmt.Printf("%f -> %f\n", absoluteZero, F2C(absoluteZero))
	fmt.Printf("%f -> %f\n", freezing, F2C(freezing))
	fmt.Printf("%f -> %f\n", boiling, F2C(boiling))
}