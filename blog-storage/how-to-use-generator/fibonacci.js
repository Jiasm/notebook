function * fibonacci (seed1, seed2) {
  while (true) {
    yield (() => {
      seed2 = seed2 + seed1
      seed1 = seed2 - seed1
      return seed2
    })()
  }
}

const fib = fibonacci(0, 1)
fib.next() // {value: 1, done: false}
fib.next() // {value: 2, done: false}
fib.next() // {value: 3, done: false}
fib.next() // {value: 5, done: false}
fib.next() // {value: 8, done: false}
