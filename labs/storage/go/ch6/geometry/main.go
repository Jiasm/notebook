package main

import "math"

type Point struct{ X, Y float64 }

// 普通的函数
func Distance(p, q Point) float64 {
    return math.Hypot(q.X - p.X, q.Y - p.Y)
}

func (p Point) Distance(q Point) float64 {
    return math.Hypot(q.X - p.X, q.Y - p.Y)
}

func main() {
    println(Distance(Point{ 1, 1 }, Point{ 2, 2 }))
    println(Point{ 1, 1}.Distance(Point{ 2, 2 }))
}
