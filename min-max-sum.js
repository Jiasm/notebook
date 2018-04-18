(() => {
  /* 示例：
   * var values = [1, 5, 12, 4, 3]
   * minimumSum(values, 2);   // => 1 + 3 = 4
   * maximumSum(values, 3);   // => 4 + 5 + 12 = 21
   *
   * param1 Array , param2 Number
   * return Number

   */

  function minimumSum (arr, num) {
    // TODO：从arr里取num个最小的元素来相加，返回相加后的总和
    return func(arr, num, true)
  }

  function maximumSum (arr, num) {
    // TODO：从arr里取num个最大的元素来相加，返回相加后的总和
    return func(arr, num)
  }

  function func (arr, num, min) {
    return Array.from(arr).sort(min ? (a, b) => a - b : (a, b) => b - a).slice(0, num).reduce((result, item) => result + item, 0)
  }

  let values = [1, 5, 12, 4, 3]
  console.log(minimumSum(values, 2)) // => 1 + 3 = 4
  console.log(maximumSum(values, 3)) // => 4 + 5 + 12 = 21
})()
