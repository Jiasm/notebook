package wheel

type point struct {
  X, Y int
}

type circle struct {
  point
  Radius int
}

type Wheel struct {
  circle
  Spokes int
}

