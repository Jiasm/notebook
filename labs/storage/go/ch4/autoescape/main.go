package main

import (
	"html/template"
	"os"
	"log"
)

func main() {
		const temp1 = `<p>A: {{.A}}</p><p>B: {{.B}}</p>`

		t := template.Must(template.New("escape").Parse(temp1))

		var data struct {
				A string				// 普通纯文本
				B template.HTML	// 可以被转换为HTML的字符串
		}

		data.A = "<b>Hello!</b>"
		data.B = "<b>Hello!</b>"

		if err := t.Execute(os.Stdout, data); err != nil {
			log.Fatal(err)
		}
}