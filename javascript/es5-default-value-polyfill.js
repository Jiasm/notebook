function defaultValue () {
  return arguments[+(arguments[0] === undefined)]
}

function doSomething (name, age) {
  name = defaultValue(name, 'default name')
  age = defaultValue(age, 18)

  console.log(name, age)
}

doSomething()
doSomething(undefined, 0)
doSomething('', undefined)
doSomething('Niko', 18)
