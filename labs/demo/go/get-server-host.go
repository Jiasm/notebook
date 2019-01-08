// 将工作目录下所有的服务器IP提取，并汇总写入至文件

package main

import (
    "fmt"
    "os"
    "path"
    "io/ioutil"
    "regexp"
    "strings"
)

const rootPath = "<your workspace path>"

func main() {
    var hostStorage []string
    repos, err := ioutil.ReadDir(rootPath)

    if err != nil {
        fmt.Println(err)
        return
    }

    for _, repo := range repos {
        repoPath := path.Join(rootPath, repo.Name())
        fi, err := os.Stat(repoPath)

        if err != nil {
            fmt.Println(err)
            return
        }

        mode := fi.Mode()

        // is repo
        if mode.IsDir() {
            shipitFilePath := path.Join(repoPath, "file to storage host")

            hostStorage = append(hostStorage, getHosts(shipitFilePath)...)
        }
    }

    hostStorage = distinct(hostStorage)

    // fmt.Println(hostStorage)
    writeToFile(hostStorage)
}

// find file and get host
func getHosts(filePath string) (hosts []string) {
    r, _ := regexp.Compile("[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}")
    if _, err := os.Stat(filePath); !os.IsNotExist(err) {
        content, err := ioutil.ReadFile(filePath)

        if err != nil {
            fmt.Println(err)
            return
        }

        hosts = r.FindAllString(string(content[:]), -1)
        return
    }

    return
}

// unique
func distinct(hosts []string) []string {
    keys := make(map[string]bool)
    list := []string{}

    for _, host := range hosts {
        if _, value := keys[host]; !value {
            keys[host] = true
            list = append(list, host)
        }
    }

    return list
}

// write host to file
func writeToFile(hosts []string) {
    ioutil.WriteFile("./servers.txt", []byte(strings.Join(hosts[:], "\n")), 0777)
}