(() => {
  console.time('consume')
  // 一瓶可乐4元，瓶盖可以卖1元，瓶身可以卖2元，有100元可以喝多少瓶可乐。

  const colaPrice = 4 // 可乐的价格
  const colaCapPrice = 1 // 可乐瓶盖回收价格
  const colaBodyPrice = 2 // 可乐瓶子回收价格

  /**
   * 获取给定金额能够购买多少瓶可乐
   * @param  {Number} balance   当前余额
   * @param  {Number} total     已购买数量，默认0
   * @return {Number}           总购买数量
   */
  function consume (balance, total = 0) {
    if (balance < colaPrice) return total // 无力购买可乐

    let remainder = balance % colaPrice // 结余的金额
    let count = balance / colaPrice | 0 // 实际购买数量

    return consume(remainder + recycle(count), (total += count))
  }

  /**
   * 回收一个瓶子所得到的金额
   * @param  {Number} count 要回收的数量
   * @return {Number}       回收所得金额
   */
  function recycle (count) {
    return count * (colaCapPrice + colaBodyPrice)
  }

  consume(100000000)

  console.time('consume')
})()
