'use strict'

/**
 * 0. 将传入的参数转换为一个数组
 * 1. 取出数组中的 最后两位...最后三位...最后四位——以此类推，并将该范围内的数字倒序排列，直到找到比原数字在这个区间内大的数字，如果到最后都没找到，旧返回-1
 * 2. 取出该范围在原字符串中的下标对应的值（cursor）取出
 * 3. 取出原数字在该下标前的数字（before）
 * 4. 取出原数字在该下标后的数字（after），组成一个数组，并按照正序排列
 * 5. 取出after中大于下标值的数字中的最小的一个（newCursor）
 * 6. 将after和cursor合并，并按照正序排列（after）
 * 7. 将before、newCursor、after合并为数组并转换为数字
 */

function nextBigger (number) {
  if (!/^\d+$/.test(number)) throw Error('arguments 0 is should be a number')

  number = String(number).split('')

  let numberLength = number.length
  for (let index = numberLength - 2; index >= 0; index--) {
    let range = numberLength - index
    let oldNumber = number.slice(index, index + range)
    let newNumber = sortByDESC(Array.from(oldNumber))

    if (oldNumber.join('') < newNumber.join('')) {
      let cursor = number.slice(index, index + 1)
      let before = number.slice(0, index)
      let after = sortByASC(number.slice(index + 1))
      let newCursor

      [newCursor, ...after] = after.filter(item => item >= cursor)
      after = sortByASC(after.concat(cursor))

      return Number([].concat(before, newCursor, after).join(''))
    }
  }
  return -1
}

function sortByASC (numbers) {
  return numbers.sort((a, b) => a - b)
}

function sortByDESC (numbers) {
  return numbers.sort((a, b) => b - a)
}

console.log(`nextBigger(12) => ${nextBigger(12)}`)
console.log(`nextBigger(513) => ${nextBigger(513)}`)
console.log(`nextBigger(2017) => ${nextBigger(2017)}`)
console.log(`nextBigger(2077) => ${nextBigger(2077)}`)
console.log(`nextBigger(2887) => ${nextBigger(2887)}`)
console.log(`nextBigger(8999) => ${nextBigger(8999)}`)
console.log(`nextBigger(9) => ${nextBigger(9)}`)
console.log(`nextBigger(111) => ${nextBigger(111)}`)
console.log(`nextBigger(531) => ${nextBigger(531)}`)
this.document && document.write && document.write(`nextBigger(12) => ${nextBigger(12)}<br/>`)
this.document && document.write && document.write(`nextBigger(513) => ${nextBigger(513)}<br/>`)
this.document && document.write && document.write(`nextBigger(2017) => ${nextBigger(2017)}<br/>`)
this.document && document.write && document.write(`nextBigger(2077) => ${nextBigger(2077)}<br/>`)
this.document && document.write && document.write(`nextBigger(2887) => ${nextBigger(2887)}<br/>`)
this.document && document.write && document.write(`nextBigger(8999) => ${nextBigger(8999)}<br/>`)
this.document && document.write && document.write(`nextBigger(9) => ${nextBigger(9)}<br/>`)
this.document && document.write && document.write(`nextBigger(111) => ${nextBigger(111)}<br/>`)
this.document && document.write && document.write(`nextBigger(531) => ${nextBigger(531)}<br/>`)
