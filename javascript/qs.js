(function () {
  var qs = {
    parse: parse,
    stringify: stringify
  }

  var reg = /(\w+)(\=)?([^=&]+)?/
  var regReplace = new RegExp(reg, 'g')

  function parse (search, mergeSameKey) {
    search = search.replace(/^\?/, '') // ignore start with `?`
    
    var params = {}
    
    search.replace(
      regReplace, // ignore empty key, ignore empty key with `=`
      function (text) {
        var matched = text.match(reg) // [fulltext, key, `=`, value]

        var key = matched[1]
        var value = matched[3] || '' // maybe undefined

        if (mergeSameKey && params[key]) {
          if (params[key] instanceof Array) {
            params[key].push(value)
          } else {
            params[key] = [params[key]].concat(value)
          }
        } else {
          params[key] = value
        }
      }
    )

    return params
  }

  function stringify (params) {
    var search = []

    for (var key in params) {
      var item = [key, params[key]]
      search.push(item.join('='))
    }

    return search.join('&')
  }

  // test case
  var s1 = 'a=1&b=2'
  var res1 = parse(s1)
  console.assert(res1.a === '1', '`a` should be equal 1')
  console.assert(stringify(res1) === s1, '`stringify` for restore')

  var s2 = '?a=1&b=2&a=3'
  var res2 = parse(s2, true)
  console.assert(res2.a instanceof Array, 'merge same key')
  console.assert(typeof res2.b === 'string', 'unmerge key will be string')
  console.assert(stringify(res2) === 'a=1,3&b=2', 'stringify array value')
  // test case end


  // load module
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = qs
  } else if (typeof window === 'object') {
    window.qs = qs
  } else {
    return qs
  }
})()
