;/**
 * 较为通用的柯里化实现方式
 */
(()=>{

  function currying(callback) {
    return function deep(...args) {
      return Object.assign(deep.bind(this, ...args), {
        valueOf() {
          return callback.apply(this, args)
        },
        toString() {
          return callback.apply(this, args)
        },
        toLocaleString() {
          return callback.apply(this, args)
        }
      })
    }
  }

  function func(...arg) {
    let result = arg.reduce((old,item)=>old + item, 0)

    console.log(result)
  }

  var func1 = currying(func)

  var a = func1(1)(2);

  ;(+a,
  +a(3),
  +a(4),
  +a(3)(4));

  // 因为console.log实现的问题。。所以必须在前边添加一个+来确保能够得到正确的输出
}
)()

