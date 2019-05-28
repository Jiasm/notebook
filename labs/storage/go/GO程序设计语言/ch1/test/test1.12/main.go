package main

import (
	"log"
	"io"
	"strconv"
	"net/http"
	"image"
	"image/color"
	"image/gif"
	"math"
	"math/rand"
)

var palette = []color.Color{color.White, color.Black}
const (
	whiteIndex = 0
	blackIndex = 1
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		querys := r.URL.Query()
		cycles, err := strconv.ParseFloat(querys.Get("cycles"), 64)
		if err != nil {
			cycles = 5
		}
		lissajous(w, cycles)
	})
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func lissajous(out io.Writer, cycles float64) {
	const (
		res    	= 0.001	// 角度分辨率
		size 	 	= 100		// 图像画布包含[-size..+size]
		nframes =	64		// 动画中的帧数
		delay		= 8			// 以10ms为单位的帧间延迟
	)

	freq := rand.Float64() * 3.0 // y振荡器的相对频率
	anim := gif.GIF{LoopCount: nframes}
	phase := 0.0

	for i := 0; i < nframes; i++ {
		rect := image.Rect(0, 0, 2 * size + 1, 2 * size + 1)
		img := image.NewPaletted(rect, palette)

		for t := 0.0; t < cycles * 2 * math.Pi; t += res {
			x := math.Sin(t)
			y := math.Sin(t * freq + phase)
			img.SetColorIndex(size + int(x * size + 0.5), size + int(y * size + 0.5), blackIndex)
		}

		phase += 0.1
		anim.Delay = append(anim.Delay, delay)
		anim.Image = append(anim.Image, img)
	}

	gif.EncodeAll(out, &anim)
}