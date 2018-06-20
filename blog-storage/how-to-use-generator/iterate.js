function * generator () {
  yield 1
  yield 2
  return 3
}

for (let item of generator()) {
  item
}
// > 1 2
