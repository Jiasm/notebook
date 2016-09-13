var config = {
  fileList: [`${__dirname}/test.xlsx`], // 要解析的excel们
  sortCol: '编号',                                     // 编号列
  cnCol: '简体中文',
  twCol: '繁体中文',
  enCol: '英文',
  ignoreNaNSort: true,                                 // 是否过滤掉编号列为非数字的行
  // 下边的就是生成出来的列名的映射了
  image: 'iamge',
  small: 'small',
  code: 'code',
  name: 'name',
  name_en: 'name_en',
  name_zh_tw: 'name_zh_tw'
}

config.templete = `array(
    '${config.image}'     => '$$${config.image}$$',
    '${config.small}'     => '$$${config.small}$$',
    '${config.code}'      => '$$${config.code}$$',
    '${config.name}'      => '$$${config.name}$$',
    '${config.name_en}'   => '$$${config.name_en}$$',
    '${config.name_zh_tw}'=> '$$${config.name_zh_tw}$$',
)`

module.exports = config
