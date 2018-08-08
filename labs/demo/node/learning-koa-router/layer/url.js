const Layer = require('koa-router/lib/layer')
const layer = new Layer('/list/:id/info/:name', [], [_ => {}])

console.log(layer.url({ id: 123, name: 'Niko' }))
console.log(layer.url([123, 'Niko']))
console.log(layer.url(123, 'Niko'))
console.log(
  layer.url(123, 'Niko', {
    query: {
      arg1: 1,
      arg2: 2
    }
  })
)
