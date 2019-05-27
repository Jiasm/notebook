package main

type Num int

func addition(a, b Num) Num {
    return a + b
}

func (a Num) addition(b Num) Num {
    return a + b
}

func main() {
    var a, b Num

    a = 1
    b = 2

    println(addition(a, b))
    println(a.addition(b))
}
