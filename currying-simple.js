/**
 * 柯里化的一种实现方式
 */

function currying (val, last = 0) {
  val = +val + +last
  return Object.assign(currying.bind(this, val), {
    valueOf () {
      return val
    },
    toString () {
      return val
    },
    toLocaleString () {
      return val
    }
  })
}
var a = currying(1)(2)

// 因为console.log实现的问题。。所以必须在前边添加一个+来确保能够得到正确的输出
console.log(+a, +a(4), +a(5))
