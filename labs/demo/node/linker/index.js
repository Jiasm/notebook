const cheerio = require('cheerio')
const http = require('http')
const iconv = require('iconv-lite')

const baseUrl = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_'
const Host = 'http://www.ygdy8.net/'

const totalPage = 2 //指定爬多少页数据
let ans = []
//获取页面电影数据
function getTitleHref(url, page) {
  return new Promise((resolve, reject) => {
    let startUrl = url + page + '.html'

    http.get(startUrl, function(res) {
      const { statusCode } = res
      let chunks = []
      res.on('data', function(chunk) {
        chunks.push(chunk)
      })
      res.on('end', function() {
        let title = []

        let html = iconv.decode(Buffer.concat(chunks), 'gb2312')
        let $ = cheerio.load(html, { decodeEntities: false })

        let titleHref = []
        $('.co_content8 .ulink').each(function(i, d) {
          let $d = $(d)
          titleHref.push({
            href: $d.attr('href')
          })
        })

        resolve(getLink(titleHref))
      })
    })
  })
}

// /*
//获取种子链接
function getLink(titleHref, cb) {
  console.log('进入getLink')
  console.log(titleHref)
  if (titleHref) {
    return Promise.all(
      titleHref.map(function(v, k) {
        return new Promise((resolve, reject) => {
          console.log('~~~~~~~~~~~~~~~~~~~~')
          let infoUrl = Host + v.href

          http
            .get(infoUrl, function(res) {
              const { statusCode } = res
              const contentType = res.headers['content-type']

              let error
              if (statusCode !== 200) {
                error = new Error('请求失败。\n' + `状态码: ${statusCode}`)
              }
              if (error) {
                console.error(error.message)
                // 消耗响应数据以释放内存
                res.resume()
                return
              }
              let chunks = []
              res.on('data', function(chunk) {
                chunks.push(chunk)
              })
              res.on('end', function() {
                try {
                  let html = iconv.decode(Buffer.concat(chunks), 'gb2312')
                  let $ = cheerio.load(html, { decodeEntities: false })
                  let bt = ''
                  bt = $('#Zoom td')
                    .children('a')
                    .attr('href')
                  resolve(bt)
                } catch (e) {
                  reject(e)
                }
              })
            })
            .on('error', e => {
              reject(e)
            })
        })
      })
    )
  } else {
    return Promise.resolve()
  }
}

async function main() {
  // */
  let results = await Promise.all(
    new Array(totalPage).fill().map((_, i) => getTitleHref(baseUrl, i + 1))
  )

  ans = ans.concat(...results)
  console.log('get data:', ans)
}

main()
