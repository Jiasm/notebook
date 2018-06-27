package tempconv

func C2F(c Celsius) Fahrenheit {
	return Fahrenheit(c * 9 / 5 + 32)
}

func F2C(f Fahrenheit) Celsius {
	return Celsius((f - 32) * 5 / 9)
}

