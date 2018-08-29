function concat(listA, listB, ...rest) {
    if (!listB) {
        return listA
    }

    return concat(build(listA, listB), ...rest)
}

function build(arr1, arr2) {
  let arr = []
  arr1.forEach(elt1 => {
      arr2.forEach(elt2 => {
          arr.push([].concat(elt1, elt2))
      })
  })
  return arr
}

console.log(concat([0, 1], [2, 3]))
console.log(concat([0, 1], [2, 3], [4, 5, 6]))
