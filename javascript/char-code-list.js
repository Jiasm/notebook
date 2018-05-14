(() => {
  String.prototype.charCodeList = (function () {
    function getCharCode (str, arr) {
      let [char, ...others] = str
      arr.push(char.charCodeAt())
      others.length && getCharCode(others.join(''), arr)
    }
    return function () {
      var arr = []
      getCharCode(this, arr)
      return arr
    }
  })()
  console.log('abc'.charCodeList())
  console.log(String.fromCharCode(97, 98, 99))
})()
