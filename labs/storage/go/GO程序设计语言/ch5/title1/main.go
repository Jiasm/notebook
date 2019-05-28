package main

import (
    "fmt"
    "os"
    "strings"
    "net/http"
    "golang.org/x/net/html"
)

func title(url string) error {
    resp, err := http.Get(url)

    if err != nil {
        return err
    }

    // 检查 Content-Type 是 HTML（如 "text/html; chatset=utf-8"i)
    ct := resp.Header.Get("Content-Type")
    if ct != "text/html" && !strings.HasPrefix(ct, "text/html;") {
        resp.Body.Close()
        return fmt.Errorf("%s has type %s, not text/html", url, ct)
    }

    doc, err := html.Parse(resp.Body)
    resp.Body.Close()
    if err != nil {
        return fmt.Errorf("parsing %s as HTML: %v", url, err)
    }

    visitNode := func(n *html.Node) {
        if n.Type == html.ElementNode && n.Data == "title" && n.FirstChild != nil {
            fmt.Println(n.FirstChild.Data)
        }
    }
    forEachNode(doc, visitNode, nil)
    return nil
}

func forEachNode(n *html.Node, pre, post func(n *html.Node)) {
    if pre != nil {
        pre(n)
    }

    for c := n.FirstChild; c != nil; c = c.NextSibling {
        forEachNode(c, pre, post)
    }   

    if post != nil {
        post(n)
    }
}

func main() {
    url := os.Args[1]

    err := title(url)

    if err != nil {
        fmt.Println(err)
    }
}
