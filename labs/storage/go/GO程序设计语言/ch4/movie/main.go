package main

import (
  "log"
  "fmt"
  "encoding/json"
)

type Movie struct {
  Title  string
  Year   int      `json:"released"`
  Color  bool     `json:"color,omitempty"`
  Actors []string
}

var movies = []Movie{
  { Title: "Casablanca", Year: 1942, Color: false, Actors: []string{ "Humphrey Bogart", "Ingrid Bergman" } },
  { Title: "Cool Hand Luke", Year: 1967, Color: true, Actors: []string{ "Paul Newman" } },
  { Title: "Bullitt", Year: 1968, Color: true, Actors: []string{ "Steve McQueen", "Jacqueline Bisset" } },
}

func main () {
  data, err := json.Marshal(movies)

  if err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
  }

  fmt.Printf("%s\n", data)

  if dataFormatted, err := json.MarshalIndent(movies, "", "  "); err != nil {
    log.Fatalf("JSON marshaling failed: %s", err)
  } else {
    fmt.Printf("%s\n", dataFormatted)
  }
}
