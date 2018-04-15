(() => {
  let feed = [0, 1]
  function getArr (size, index = 1, result = feed) {
    return size === index ? result : getArr(size, index + 1, [].concat(...feed.map(item => 
      new Array(feed.length ** index).fill(item).map((item, itemLen) => 
        [].concat(result[itemLen], item))
      )
    ))
  }

  let arr = getArr(4)

  console.log(JSON.stringify(arr))
})()
