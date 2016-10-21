'use strict'

/**
 * 0. 接收一串数字，一系列的判断，如果数字只有一位，返回-1
 * 1. 最后两位更换位置后比较更换前后的两个数字
 *   new > old，则返回新数字（success）
 *   else 砍掉最后一位，递归调用自身
 *
 */

function nextBigger(number) {
  if (!/^\d+$/.test(number)) throw Error('arguments 0 is should be a number')

  if (/^\d$/.test(number)) return -1

  number = String(number).split('')
  let oldNumber = number.slice(-2).join('')
  let newNumber = sortByDESC(oldNumber.split(''))

  // so lucky
  if (String(oldNumber) < String(newNumber)) {
    number.splice(number.length - 2, 2, newNumber)
    return Number(number.join(''))
  } else {
    let result = nextBigger(number.slice(0, -1).join(''))
    if (result === -1) {
      return result
    } else {
      number.splice(0, number.length - 1, result)
      return Number(number.join(''))
    }
  }
}

function sortByDESC(numbers) {
  return Number(numbers.sort((a, b) => b - a).join(''))
}

console.log(`nextBigger(12) => ${nextBigger(12)}`)
console.log(`nextBigger(513) => ${nextBigger(513)}`)
console.log(`nextBigger(2017) => ${nextBigger(2017)}`)
console.log(`nextBigger(2077) => ${nextBigger(2077)}`)
console.log(`nextBigger(8999) => ${nextBigger(8999)}`)
console.log(`nextBigger(9) => ${nextBigger(9)}`)
console.log(`nextBigger(111) => ${nextBigger(111)}`)
console.log(`nextBigger(531) => ${nextBigger(531)}`)
this.document && document.write && document.write(`nextBigger(12) => ${nextBigger(12)}<br/>`)
this.document && document.write && document.write(`nextBigger(513) => ${nextBigger(513)}<br/>`)
this.document && document.write && document.write(`nextBigger(2017) => ${nextBigger(2017)}<br/>`)
this.document && document.write && document.write(`nextBigger(2077) => ${nextBigger(2077)}<br/>`)
this.document && document.write && document.write(`nextBigger(8999) => ${nextBigger(8999)}<br/>`)
this.document && document.write && document.write(`nextBigger(9) => ${nextBigger(9)}<br/>`)
this.document && document.write && document.write(`nextBigger(111) => ${nextBigger(111)}<br/>`)
this.document && document.write && document.write(`nextBigger(531) => ${nextBigger(531)}<br/>`)
