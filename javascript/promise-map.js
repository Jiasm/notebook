/**
 * 用来将Promise.all转换为Object的格式
 * let [
 *   a,
 *   b
 * ] = await Promise.all([
 *   getA(),
 *   getB()
 * ])
 *
 * ====>
 *
 * let {
 *   a,
 *   b
 * } = await promiseMap({
 *   a: getA(),
 *   b: getB()
 * })
 *
 * 减少因数组解构下标带来的记忆成本
 * @param {Object} promises
 */
async function promiseMap(promises) {
  let objects = {}
  let keys = Object.keys(promises)
  let results = await Promise.all(keys.map(key => promises[key]))

  results.forEach((result, index) => {
    objects[keys[index]] = result
  })

  return objects
}

// test code
async function main() {
  let getA = new Promise(r => r('a'))
  let getB = () => new Promise(r => r('b'))
  let getC = 'c'
  let getD = async () => 'd'

  let { a, b, c, d } = await promiseMap({
    a: getA,
    b: getB(),
    c: getC,
    d: getD()
  })

  console.log({
    a,
    b,
    c,
    d
  })
}

main()
// test code end
