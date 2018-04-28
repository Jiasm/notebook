'use strict'

/**
 * 0. 将传入的参数转换为一个数组
 * 1. 取出数组中的 最后两位...最后三位...最后四位——以此类推，并将该范围内的数字倒序排列，直到找到比原数字在这个区间内大的数字，如果到最后都没找到，则返回-1
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

  // 当数字只有一位数的时候，没有必要走这一套逻辑，直接return -1就好了
  for (let index = numberLength - 2; index >= 0; index--) {
    // 范围从2开始，一直递增 直到构建出一个大于原始数字的值
    let range = numberLength - index
    // 取出原始数字在这个范围的值
    let oldNumber = number.slice(index, index + range)
    // 将这个范围的值重构成一个最大的数字
    let newNumber = sortByDESC(Array.from(oldNumber))

    // 如果重构后的值大于原始数字，则认为next bigger的数字就在这里，但是不一定是最小的，因为当前范围不一定是2
    if (oldNumber.join('') < newNumber.join('')) {
      // index的值就是在原始数字中的起始位置，所以我们取出对应的值
      // 取出这个位置的值是因为，获取原始数字的next bigger的数字，最少要影响到这一位
      // 我们称之为下标位
      // 所以我们仅仅需要确保下标位的值会是一个比现在的数字要大的一个就行
      let cursor = number.slice(index, index + 1)
      // 取出下标位之前所有的数字，这些数字是不需要改变的
      let before = number.slice(0, index)

      // 取出下标位之后所有的数字，并按照正序排序，取出最小的且大于下标位的第一个数字的值，将剩余的数字放入到一个数组中
      let [newCursor, ...after] = sortByASC(number.slice(index + 1)).filter(item => item >= cursor)
      // 将之前的下标塞到剩余数组中，并做正序排序
      after = sortByASC(after.concat(cursor))

      // 合并这三部分
      return Number([].concat(before, newCursor, after).join(''))
    }
  }

  return -1
}

/**
 * 正序排序
 * @param  {array} numbers 要排序的数组
 */
function sortByASC (numbers) {
  return numbers.sort((a, b) => a - b)
}

/**
 * 反序排序
 * @param  {array} numbers 要排序的数组
 */
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
