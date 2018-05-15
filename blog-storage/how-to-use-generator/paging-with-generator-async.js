(async () => {
  async function * loadDataGenerator (url) {
    let page = 1

    while (true) {
      page = (yield await ajax(url, {
        data: page
      })) || ++page
    }
  }

  // 使用setTimeout模拟异步请求
  function ajax (url, { data: page }) {
    return new Promise((resolve) => {
      setTimeout(_ => {
        console.log(`get page: ${page}`);
        resolve()
      }, 1000)
    })
  }

  let loadData = loadDataGenerator('get-data-url')

  await loadData.next()
  await loadData.next()

  // force load page 1
  await loadData.next(1)
  await loadData.next()
})()
