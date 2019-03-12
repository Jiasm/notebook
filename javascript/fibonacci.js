function fibonacci (len, res = [0, 1], cursor = res.length) {
  if (len <= cursor) return res.slice(0, len)
  else return c(len, [...res, res[cursor - 1] + res[cursor - 2]])
}

console.log(fibonacci(-2))
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(10))