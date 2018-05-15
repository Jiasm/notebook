function * randomGenerator (...randoms) {
  let len = randoms.length
  while (true) {
    yield randoms[Math.floor(Math.random() * len)]
  }
}

const randomeGen = randomGenerator(1, 2, 3, 4)

randomeGen.next().value // 返回一个随机数
