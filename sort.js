'use strict'

function sort (rules, data, desc) {
  // 为了解决 可能存在 array类型的节点
  // 所以自己创建一个特殊的 array的子集来实现对节点的分类
  // 并提供一个展开自身的方法
  class NodeArray extends Array {
    isNodeArray () {
      return true
    }
    develop () {
      var arr = []
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
  let func = (rules, data) => {
    let [[rule, order]] = rules
    let result = new NodeArray()
    let mapping = new Map()

    data.sort((a, b) => order === 'desc' ? a[rule] < b[rule] : a[rule] > b[rule]).map(({[rule]: key}, index, data) => {
      let arr

      if (mapping.has(key)) {
        arr = mapping.get(key)
      } else {
        arr = new NodeArray()
        result.push(arr)
        mapping.set(key, arr)
      }

      arr.push(data[index])
    })

    let ruleList = rules.slice(1)

    if (ruleList.length) {
      for (let key in result) {
        result[key] = func(ruleList, result[key])
      }
    }

    return result
  }

  rules = Object.entries(rules)

  let result = func(rules, data).develop()

  return result
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
