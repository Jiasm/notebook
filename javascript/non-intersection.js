(() => {
  var arr1 = [{
    id: 111,
    name: 'aaa'
  }, {
    id: 222,
    name: 'bbb'
  }, {
    id: 333,
    name: 'ccc'
  }]

  var arr2 = [{
    id: 111,
    name: 'aaa'
  }, {
    id: 222,
    name: 'bbb'
  }, {
    id: 444,
    name: 'ddd'
  }]

  function filter (arr1, arr2, rules) {
    return arr1.filter(item1 => !arr2.some(item2 => rules.every(key => item1[key] === item2[key])))
  }

  function build (arr1, arr2, rules) {
    return [].concat(filter(arr1, arr2, rules), filter(arr2, arr1, rules))
  }

  let result = build(arr1, arr2, ['id', 'name'])

  console.log(result)
})()
