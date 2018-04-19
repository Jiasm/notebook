'use strict'

function copy (orig) {
  // copy has same prototype as orig
  let copy = Object.create(Object.getPrototypeOf(orig))

  // copy has all of orig's properties
  copyOwnPropertiesFrom(copy, orig)

  return copy
}

function copyOwnPropertiesFrom (target, source) {
  Object.getOwnPropertyNames(source)
    .forEach(propKey => {
      let desc = Object.getOwnPropertyDescriptor(source, propKey)
      Object.defineProperty(target, propKey, desc)
    })

  return target
}

let obj = {
  name: 'niko',
  friends: [
    'roman'
  ]
}

let newObj = copy(obj)

newObj.friends.push('bellic')

console.log(obj.friends.join('|'))
