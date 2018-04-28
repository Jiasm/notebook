/**
 * dataset的polyfill，通过正则匹配来实现
 */


(() => {
  const keyValReg = /(?<key>.*?)=(?<quote>")(?<value>.*?)\k<quote>/
  const matchReg = /(?<=<.*?)((?<=data-).*?=(?<quote>").*?\k<quote>)(?=.*?>)/g
  const dashReg = /-(\w)/g

  function getDataset (tag) {
    let result = {}
    tag.outerHTML.match(matchReg).map(item => {
      let {key, value} = item.match(keyValReg).groups
      result[key.replace(dashReg, (_, $1) => $1.toUpperCase())] = value
    })

    return result
  }

  // test
  let $span = document.createElement('span')
  $span.dataset['age'] = 18
  $span.dataset['firstName'] = 'Niko'
  $span.dataset['lastName'] = 'Bellic'

  document.body.appendChild($span)

  console.log(getDataset($span))
})()
