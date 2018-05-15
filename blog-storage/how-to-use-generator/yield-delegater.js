function * gen1 () {
  yield 2
  yield 3
}

function * gen2 () {
  yield 1
  yield * gen1()
  yield 4
}

let gen = gen2()

gen.next().value // 1
gen.next().value // 2
gen.next().value // 3
gen.next().value // 4
