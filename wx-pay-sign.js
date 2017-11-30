const crypto = require('crypto')

const appInfo = {
  appID: 'appID',
  appsecret: 'appsecret',
  key: 'key'
}

/**
 * 生成微信支付使用的签名
 * 微信提供的在线校验工具： https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=20_1
 * @param  {Object} arg 调用接口传递的所有参数
 * @return {String}     加密后的签名
 */
const paySign = (arg) => {
  // 按照字典排序所有参数
  let str = Object.keys(arg).sort((a, b) => a == b ? 0: a > b ? 1 : -1).map(key => `${key}=${arg[key]}`).join('&')

  // 将key拼接在最后
  let stringSignTemp = `${str}&key=${appInfo.key}` // 注：key为商户平台设置的密钥key
  // let sign = md5(stringSignTemp) // 注：MD5签名方式
  let sign = hashMac(stringSignTemp) // 注：HMAC-SHA256签名方式
  return sign.toUpperCase()
}

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex').toString()
}

function hashMac (str) {
  let hash = crypto.createHmac('sha256', appInfo.key)
    .update(str)
    .digest('hex')
  return hash
}

console.log(paySign({
  appid: appInfo.appID,
  body: 'haha',
  device_info: 'WEB',
  mch_id: 'hahaha',
  nonce_str: Math.random().toString(36).substr(2, 15),
  sign_type: 'SHA256'
}))
