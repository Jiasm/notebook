package main

import "fmt"

type Point struct {
  X, Y int
}

type Circle struct {
  Point
  Radius int
}

type Wheel struct {
  Circle
  Spokes int
}

func main () {
  var w Wheel

  w.X = 8
  w.Y = 8
  w.Radius = 5
  w.Spokes = 20

  fmt.Printf("%#v\n", w)
}
