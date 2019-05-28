package main

import "fmt"

type User struct {
    name string
    age  int
    idcard string
}

type Extra struct {
    idcard string
}

type UserInfo struct {
    User
    Extra
}

func (u User) OutPut() {
    fmt.Printf("name: %s, age: %d.\n", u.name, u.age)
}

func (e Extra) OutPut() {
    fmt.Printf("idcard: %s.\n", e.idcard)
}

func (u UserInfo) OutPut() {
    fmt.Printf("name: %s, age: %d, idcard: %s.\n", u.name, u.age, u.Extra.idcard)
}

func main() {
    userInfo := UserInfo{
        User{
            name: "Niko",
            age: 18,
            idcard: "987654321",
        },
        Extra{
            idcard: "123456789",
        },
    }
    userInfo.OutPut()
    userInfo.User.OutPut()
    userInfo.Extra.OutPut()
    fmt.Println(userInfo)
}
