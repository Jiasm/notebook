/**
 * 实现一个函数getNum，按如下规则输出第count个数结果
 * 输入： 3 输出： 13
 * 备注： 已知数列规则为[1, 3, 7, 13, 21, 31, 43 ...]， 计数从0开始
 */

function getNum (count) {
  return count ? (~count) ** 2 - count : count + 1
}

console.log(getNum(0)) // 1
console.log(getNum(1)) // 3
console.log(getNum(2)) // 7
console.log(getNum(3)) // 13
console.log(getNum(4)) // 21
console.log(getNum(5)) // 31
console.log(getNum(6)) // 43
console.log(getNum(7)) // 57
// console.log(getNum( N))
