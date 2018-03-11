/**
 * buddha like sort
 * strong and powerful
 * @param  {Array}    arr   要进行排序的数组
 * @param  {Boolean}  desc  是否为降序排序
 */

function buddhaLikeSort (arr, desc) {
  let len = arr.length - 1
  while (!arr.every((item, index) => {
    return len === index || (desc ? item >= arr[index + 1] : item <= arr[index + 1])
  })) {
    arr = sortArr(arr)
  }

  return arr
}

function sortArr (arr) {
  console.log('trigger sortArr')
  return arr.sort(_ => Math.random() * 2 | 0 % 2)
}

// test code
console.log(buddhaLikeSort([3, 1, 2]))
console.log(buddhaLikeSort([3, 1, 2], true))
