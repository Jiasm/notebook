'use strict'

let fs = require('fs')
let xlsx = require('node-xlsx')
let {
  fileList,
  sortCol,
  cnCol,
  twCol,
  enCol,
  ignoreNaNSort,
  image,
  small,
  code,
  name,
  name_en,
  name_zh_tw,
  templete
} = require('./bq.config.js')
let [type = 'png'] = process.argv.slice(2)

function init ({fileList}) {
  fileList.map(file => {
    try {
      let [{
      data: [header, ...data]
    }] = xlsx.parse(fs.readFileSync(file))
      let text = buildSomePHPCode({type, header, data})
      let fileName = file.match(/\/([^\/]*)?\./)[1]
      fs.writeFileSync(`${fileName}.php`, text)
      console.log(`${fileName}.php已生成完毕`)
    } catch (e) {
      console.error(`${file}生成时出现错误\n`, e)
    }
  })
}

init({fileList})

function buildSomePHPCode ({type, header, data}) {
  let sortPos = header.indexOf(sortCol)
  let cnPos = header.indexOf(cnCol)
  let twPos = header.indexOf(twCol)
  let enPos = header.indexOf(enCol)
  let smallType = 'png'
  let iamgeType = type === 'gif' ? 'gif' : smallType

  switch (-1) {
    case sortPos:
    case cnPos:
    case twPos:
    case enPos:
      return console.error('列信息无法匹配')
  }

  let text = data.map(item => {
    if (ignoreNaNSort && isNaN(item[sortPos])) {
      return null
    }

    let nameEnValue = item[enPos].replace(/'/g, '\\\'')
    let nameCnValue = item[cnPos]
    let nameTwValue = item[twPos]
    let codeValue = item[enPos].replace(/\W/g, '').toLowerCase()
    let iamgeValue = `${codeValue}.${iamgeType}`
    let smallValue = `${codeValue}.${smallType}`
    let obj = {
      [image]: iamgeValue,
      [small]: smallValue,
      [code]: codeValue,
      [name]: nameCnValue,
      [name_en]: nameEnValue,
      [name_zh_tw]: nameTwValue
    }

    return obj
  }).filter(item => item).map(item => {
    return templete.replace(/\$\$(.*)?\$\$/g, (_, key) => {
      return item[key]
    })
  }).join(',\n') + ','

  return text
}
