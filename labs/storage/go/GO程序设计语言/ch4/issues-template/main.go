package main

import (
    "time"
    "log"
		"os"
		"text/template"

    "../github"
)

const temp1 = `{{.TotalCount}} issues:
{{range .Items}}----------------
Number: {{.Number}}
User:   {{.User.Login}}
Title:  {{.Title | printf "%.64s"}}
Age:    {{.CreatedAt | daysAgo}} days
{{end}}`

var report = template.Must(template.New("issuelist").
	Funcs(template.FuncMap{"daysAgo": daysAgo}).
	Parse(temp1))

func main() {
    result, err := github.SearchIssues(os.Args[1:])
    if err != nil {
        log.Fatal(err)
    }
   if err := report.Execute(os.Stdout, result); err != nil {
				log.Fatal(err)
	 }
}

func daysAgo(t time.Time) int {
		return int(time.Since(t).Hours() / 24)
}
