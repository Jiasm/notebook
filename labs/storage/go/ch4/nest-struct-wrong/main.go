package main

import (
  "./wheel"
  "fmt"
)

func main () {
  var w wheel.Wheel

  w.X = 8
  w.Y = 8
  w.Spokes = 10
  w.Radius = 20

  fmt.Printf("%#v\n", w)

  fmt.Printf("%v\n", w.circle.point.Radius)
}
