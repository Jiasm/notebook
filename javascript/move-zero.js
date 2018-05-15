(() => {
  function removeZeros (array) {
    let storage = (tag, before) => function * () {
      if (before) yield * before()
      yield tag
    }
    let normal
    let special
    for (let item of array) item === 0 || item === '0' ? special = storage(item, special) : normal = storage(item, normal)

    let func = (...arg) => arg;

    ((...args) => {
      let ret
      for (let gen of args) {
        if (!gen) continue
        do {
          ret = gen.next()
          !ret.done && (func = func.bind(null, ret.value))
        } while (!ret.done)
      }
    })(normal && normal(), special && special())

    return func()
  }

  var input = [7, 2, 3, null, 4, 6, '0', undefined, 13, '0', 78, 0, 0, 19, 14]
  console.log(removeZeros(input)) // [ 7, 2, 3, null, 4, 6, undefined, 13, 78, 19, 14, '0', '0', 0, 0 ]

  input = [0, 1]
  console.log(removeZeros(input)) // [ 1, 0 ]

  input = [2, 1, 4]
  console.log(removeZeros(input)) // [ 2, 1, 4 ]

  input = [0, '0']
  console.log(removeZeros(input)) // [ 0, '0' ]
})()
