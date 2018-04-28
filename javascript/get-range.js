'use strict'

(() => {
  let func = (num, range) => (num = num - (num % range || range), `${num + 1}-${num + range}`)

  console.log(func(80322, 500))
  console.log(func(73000, 500))
})()
