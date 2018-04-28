/**
 * 检测CSS是否有效
 * @param  {String} key     CSS规则的key： border background
 * @param  {String} value   选填，CSS规则的值： #fff cover ...
 * @return {Boolean}        如果返回true则表示规则可用
 */
function supports (key, value) {
  let originKey = key
  key = key.replace(/-(\w)/g, (_, $1) => $1.toUpperCase()) // 转成驼峰
  if (!(key in document.documentElement.style)) return new Error('unsupported rule')

  // 如果存在value，则去检查是否支持对应的值
  if (value) {
    let _tmp = document.createElement('div')
    _tmp.style[key] = value

    // 创建一个DOM元素，这样getComputedStyle才会生效
    document.body.appendChild(_tmp)

    let result = getComputedStyle(_tmp)[key] !== value

    // 检查完毕后移除该元素
    document.body.removeChild(_tmp)

    if (result) return new Error(`unsupported value in: ${originKey} with: ${value}`)
  }

  return true
}

// test code
console.log(supports('border-image'))
console.log(supports('border-image1'))
console.log(supports('background-size', 'cover'))
console.log(supports('background-size', 'cover1'))
