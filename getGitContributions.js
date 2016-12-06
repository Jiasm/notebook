// 算出近一年的gitlab的提交次数
Array.from(document.querySelectorAll('.user-contrib-cell')).map((item) => item.dataset.originalTitle.match(/^(\d+)?/)[1]).filter(item => +item).reduce((old = 0, cursor, index) => {
  return +old + +cursor
})

// 算出近一年 github的提交次数
Array.from(document.querySelectorAll('.day')).map((item) => item.dataset.count).filter(item => +item).reduce((old = 0, cursor, index) => {
  return +old + +cursor
})

// 算出近一年 git.osc的提交次数
Array.from(document.querySelectorAll('.box')).map((item) => (item.dataset.content && item.dataset.content.match(/^(\d+)?/)[1])).filter(item => +item).reduce((old = 0, cursor, index) => {
  return +old + +cursor
})

