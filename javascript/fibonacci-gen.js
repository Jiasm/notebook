function* fibonacci (len) {
  const res = [0, 1]
  let cursor = res.length

  yield* res.slice(0, len)

  if (len <= cursor) return 

  while (cursor < len) {
    const item = res[cursor - 1] + res[cursor - 2]
    yield item
    res.push(item)
    cursor += 1
  }
}

console.log([...fibonacci(-2)])
console.log([...fibonacci(1)])
console.log([...fibonacci(2)])
console.log([...fibonacci(10)])