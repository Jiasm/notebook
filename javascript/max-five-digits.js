(() => {
  function maxFiveDigits (num, size = 5) {
    num = String(num)
    return Math.max(...new Array(-size - ~num.length).fill().map((_, index) => parseInt(num.substr(index, size))))
  }

  console.log(maxFiveDigits(283910356876))
  console.log(maxFiveDigits(123456))
})()
