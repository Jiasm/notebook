function* fibonacci (len) {
  const res = [0, 1]
  const cursor = res.length
  if (len <= cursor) {
    yield* res.slice(0, len)
    return
  }

  let index = cursor

  while (index < len) {
    const item = res[index - 1] + res[index - 2]
    res.push(item)
    index += 1
  }

  yield* res
}

console.log([...fibonacci(-2)])
console.log([...fibonacci(1)])
console.log([...fibonacci(2)])
console.log([...fibonacci(10)])