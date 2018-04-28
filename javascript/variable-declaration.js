(() => {
  var a = 'Niko '

  ~(() => {
    var a = a += 'Bellic'

    console.log(1, a) // = ?
  })()
  console.log(2, a) // = ?
})()
