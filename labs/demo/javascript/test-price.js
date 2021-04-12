const moment = require('moment')

const a = [
  {
    date: '2021-04',
    p: 1,
  },
]

const b = [
  {
    date: '2014-09',
    p: 2,
  },
  
]

const unit = 'YYYY-MM'

function fillTimeLine (arr1, arr2) {
  const first = moment(arr1[0].date, unit).unix() < moment(arr2[0].date, unit).unix() ? arr1[0] : arr2[0]
  const last = moment(arr1[arr1.length - 1].date, unit).unix() > moment(arr2[arr2.length - 1].date, unit).unix() ? arr1[arr1.length - 1] : arr2[arr2.length - 1]

  const firstDate = moment(first.date, unit)
  const lastDate = moment(last.date, unit)
  let cursor = moment(firstDate).format(unit)
  const end = moment(lastDate).format(unit)


  let arr1Before = 0
  let arr2Before = 0
  let arr1Cursor = arr1.shift()
  let arr2Cursor = arr2.shift()

  const data1 = []
  const data2 = []

  while (true) {
    const result1 = arr1Cursor && cursor === arr1Cursor.date
    const result2 = arr2Cursor && cursor === arr2Cursor.date

    if (result1 && result2) {
      data1.push(arr1Cursor)
      arr1Before = arr1Cursor.p
      arr1Cursor = arr1.shift()

      data2.push(arr2Cursor)
      arr2Before = arr2Cursor.p
      arr2Cursor = arr2.shift()
    } else if (result1) {
      data1.push(arr1Cursor)
      arr1Before = arr1Cursor.p
      arr1Cursor = arr1.shift()

      data2.push({ date: cursor, p: arr2Before })
    } else if (result2) {
      data2.push(arr2Cursor)
      arr2Before = arr2Cursor.p
      arr2Cursor = arr2.shift()

      data1.push({ date: cursor, p: arr1Before })
    } else {
      data1.push({ date: cursor, p: arr1Before })
      data2.push({ date: cursor, p: arr2Before })
    }

    if (cursor === end) {
      break
    }

    cursor = moment(cursor, unit).add(1, 'M').format(unit)
  }

  console.log(data1, data2)
}

fillTimeLine(a, b)
