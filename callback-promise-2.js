(() => {
  function pro (a, b) {
    return new Promise(resolve => {
      resolve(a + b)
    })
  }

  function wrap (func) {
    return (...args) => {
      let callback = args.pop()

      return typeof callback === 'function' ? func(...args).then(callback.bind(this, null), callback.bind(this)) : func(...[].concat(args, callback))
    }
  }

  let func = wrap(pro)

  func(1, 2, (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log(result)
    }
  })

  func(1, 2).then(console.log, console.error)
})()
