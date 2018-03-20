(() => {
  let data = {
    data: 'A',
    children: [{
      data: 'B',
      children: [{
        data: 'D',
        children: [{
          data: 'G'
        }, {
          data: 'H'
        }, {
          data: 'I'
        }]
      }]
    }, {
      data: 'C',
      children: [{
        data: 'E',
        children: [{
          data: 'J'
        }]
      }, {
        data: 'F'
      }]
    }]
  }

  /**
   * 获取所有符合检查器规则的父节点数据
   * @param  {Object}   data    数据源
   * @param  {Function} checker 检查器
   * @return {Array}            所有的父节点
   */
  function findParents (data, checker) {
    if (!data.children) return // 到达最底层节点
    if (includes(data, checker)) return [data] // 当前节点的子节点包含所要查找的元素

    let result = null
    data.children.forEach(item => {
      let childResult = findParents(item, checker) // 循环当前节点的子节点，调用自身

      if (childResult) result = [].concat(data, childResult) // 如果下层结果有返回数据，则拼自身到返回值数组中
    })

    return result // 返回结果
  }

  /**
   * 获取一个节点是否包含对应的子节点
   * @param  {Object}   data    处理的数据源
   * @param  {Function} checker 检查器
   * @return {Boolean}          获取结果是否满足条件
   */
  function includes (data, checker) {
    return data.children.some(checker)
  }

  /**
   * 生成一个验证器，用来检测是否命中规则
   * @param  {String}   target 要查找的节点
   * @return {Function}        返回一个检查器
   */
  function getChecker (target) {
    return function checker (item) {
      return item.data === target
    }
  }

  console.log(findParents(data, getChecker('H')).map(({data}) => data))
  console.log(findParents(data, getChecker('D')).map(({data}) => data))
  console.log(findParents(data, getChecker('B')).map(({data}) => data))
  console.log(findParents(data, getChecker('J')).map(({data}) => data))
  console.log(findParents(data, getChecker('F')).map(({data}) => data))
  console.log(findParents(data, getChecker('A')))
})()
