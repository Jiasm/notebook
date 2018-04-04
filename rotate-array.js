(() => {
  // 旋转数组
  function rotateArr (arr) {
    // let maxLen = 0
    let rowLen = arr.length
    let colLen = arr[0].length
    //
    // if (row >= col) {
    //
    // } else {
    //
    // }
    let newArr = new Array(colLen).fill(0).map(_ => new Array(rowLen).fill(0))

    arr = [].concat(arr).reverse()

    newArr.forEach((row, rowIndex) => {
      row.forEach((_, col) => {
        // 第一列的第一个 -> 第一行反转后的第一个（也就是最后一个）
        newArr[rowIndex][col] = arr[col][rowIndex]
        // console.log(rowIndex, col, arr.reverse()[col][rowIndex])
      })
    })

    return newArr
  }

  let arr1 = [
    [1, 1, 1],
    [1, 0, 0]
  ]
  // expect:
  // [
  //  [1, 1],
  //  [0, 1],
  //  [0, 1]
  // ]
  //
  // 0,0 -> 0,2
  // 0,2 -> 2,2
  // 1,0 -> 0,1
  // 1,2 -> 2,1
  // 2,0 -> 0,0
  // 2,2 -> 2,0
  //
  // 第一列变为第一行，第一个元素变为最后一个元素
  // 第一行变为最后一列，最后一行变成第一列
  //
  // 先转换为：
  // [1, 0, 0],
  // [1, 1, 1]
  //
  // 然后从第一个行的第一列开始取

  log(rotateArr(arr1))
  log(rotateArr(rotateArr(arr1)))
  log(rotateArr(rotateArr(rotateArr(arr1))))
  log(rotateArr(rotateArr(rotateArr(rotateArr(arr1)))))
  // log(rotateArr(rotateArr(rotateArr(rotateArr(rotateArr(arr1))))))

  // expect
  // [
  //  [1, 1, 1, 1]
  // ]

  let arr2 = [
    [1],
    [1],
    [1],
    [1]
  ]
  log(rotateArr(arr2))

  function log (arr) {
    console.log(arr.map(item => item.join('')).join('\n'))
  }
})()
