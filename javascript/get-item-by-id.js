(() => {
  var data = {
    id: 'xxx1',
    name: 'xxx1',
    children: [
      {
        id: 'xxx2',
        name: 'xxx2',
        children: false
      },
      {
        id: 'xxx3',
        name: 'xxx3',
        children: [
          {
            id: 'xxx4',
            name: 'xxx4',
            children: false
          },
          {
            id: 'xxx5',
            name: 'xxx5',
            children: false
          }
        ]
      }
    ]
  }

  function getItem (data, id) {
    // 如果传入对象id与要查找的id相等，直接返回
    if (data.id === id) return data

    if (Array.isArray(data.children)) {
      // 遍历所有子节点
      for (let item of data.children) {
        // 递归查找子节点，
        let result = getItem(item, id)

        if (result && result.id === id) return result
      }
    }
  }

  console.log(getItem(data, 'xxx1'))
  console.log(getItem(data, 'xxx2'))
  console.log(getItem(data, 'xxx4'))
})()
