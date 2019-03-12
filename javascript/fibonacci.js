function fibonacci (len, res = [0, 1, 1], cursor = res.length) {
  if (len <= cursor) return res.slice(0, len)
  else return c(len, [...res, res[cursor - 1] + res[cursor - 2]])
}