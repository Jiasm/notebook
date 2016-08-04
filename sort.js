'use strict'

/**
 * 根据多维度进行数据的排序
 * 大致套路如下
 * [1, 2, 3, 4]
 * [[3, 4], [1, 2]]
 * [[4], [3], [2], [1]]
 * ... do something
 * [4, 3, 2, 1]
 * @param  {Object} rules 一个排序规则的对象
 * @param  {Array} data   要被排序的数据集合
 * @return {Array}        返回一个排序后的集合
 */
function sort (rules, data) {
  // 为了解决 数据中可能存在 Array类型的节点
  // 所以自己创建一个特殊的 Array的子集来实现对节点的分类
  // 并提供一个展开自身的方法
  class NodeArray extends Array {
    isNodeArray () {
      return true
    }
    develop () {
      var arr = []
      // 如果当前节点下还存在 NodeArray对象 说明还有嵌套 继续展开子节点
      for (let item of this) {
        if (item.isNodeArray && item.isNodeArray()) {
          arr = arr.concat(item.develop())
        } else {
          arr.push(item)
        }
      }

      return arr
    }
  }
  /**
   * 方法接收一组排序规则 并使用第一组排序规则将当前数据进行排序
   * @param  {Array} rules  排序规则的集合
   * @param  {Array} data   这个就是要被排序的一个集合
   * @return {NodeArray}    返回一个Array的子集
   */
  let func = (rules, data) => {
    let [[rule, order]] = rules   // [key, value]
    let ruleList = rules.slice(1) // 取出剩余规则
    let result = new NodeArray()
    let mapping = new Map()       // 作为一个去重的参照

    data.sort(({[rule]: a}, {[rule]: b}) => order === 'desc' ? a < b : a > b).map(({[rule]: key}, index, data) => {
      let arr

      // 如果当前规则下 已经存在 某个值的节点
      // 直接取出该节点对应的 NodeArray
      if (mapping.has(key)) {
        arr = mapping.get(key)
      } else {
        // 这种属于初始化会执行的地方
        // 声明一个NodeArray 并塞到外层 NodeArray 以及 去重参照的 Map 中
        arr = new NodeArray()
        result.push(arr)
        mapping.set(key, arr)
      }

      // 将当前节点 push到 当前NodeArray节点
      arr.push(data[index])
    })
    // 这一步执行完后 会得到一个二维数组
    // 一个参照当前排序规则的值 进行分组的 二维数组

    // 这里判断下是否还有其余的排序规则
    // 如果有 会将当前数组中所有的节点作为 被排序的集合 传入函数 递归调用
    if (ruleList.length) {
      for (let key in result) {
        // 示例：
        // [1, 2]
        // =>
        // [[1], [2]]
        result[key] = func(ruleList, result[key])
      }
    }

    return result
  }

  // 将 一个 JSONObject 转换为 [[key, value], [key, value], ...] 这样子的二维数组
  rules = Object.entries(rules)

  // 调用展开方法 并返回
  return func(rules, data).develop()
}

var data = [
  {
    age: 20,
    name: 'cc',
    price: 20
  }, {
    age: 18,
    name: 'ab',
    price: 233
  }, {
    age: 20,
    name: 'aa',
    price: 233
  }, {
    age: 20,
    name: 'cc',
    price: 1000
  }, {
    age: 20,
    name: 'aa',
    price: 1000
  }
]

var arr = sort({
  age: 'desc',
  name: 'asc',
  price: 'desc'
}, data)
arr.forEach(item => {
  document.querySelector('#output').innerHTML += `
    <li>
    ${JSON.stringify(item, null, 2).replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')}
    </li>
  `
})
