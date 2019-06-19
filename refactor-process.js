const Weight = {
  Low: 1,
  Middle: 4,
  High: 8
}

const person = 1
const day = 8

const done = [
  { 
    name: 'live-data-oversea-server',
    value: calcScore({ dayTime: 4 }),
  },
  { 
    name: 'taobao-oversea',
    value: calcScore({ dayTime: 8 }),
  },
  { 
    name: 'c.blued',
    value: calcScore({ dayTime: 0.5 }),
  },
]

const progress = [
  {
    name: 'live-http-oversea-server',
    value: calcScore({ dayTime: 10 }),
  },
  {
    name: 'live-tools-server',
    value: calcScore({ dayTime: 3 }),
  },
  {
    name: 'live-monitor',
    value: calcScore({ dayTime: 6 }),
  },
]

const todo = [
  {
    name: 'live-tools-oversea-server',
    value: calcScore({ dayTime: 2 }),
  },
  {
    name: 'report-oversea-service',
    value: calcScore({ dayTime: 2 }),
  },
  {
    name: 'live-oversea-schedule',
    value: calcScore({ dayTime: 6 }),
  },
  {
    name: 'live-oversea-monitor',
    value: calcScore({ dayTime: 4 }),
  },
  {
    name: 'sex-monitor-oversea',
    value: calcScore({ dayTime: 6 }),
  },
  {
    name: 'live-http-server',
    value: calcScore({ dayTime: 15 }),
  },
  {
    name: 'game-live-console',
    value: calcScore({ dayTime: 2 }),
  },
  {
    name: 'chatroom、comment',
    value: calcScore({ dayTime: 3 }),
  },
  {
    name: 'live-data-server',
    value: calcScore({ dayTime: 2 }),
  },
  {
    name: 'report-service',
    value: calcScore({ dayTime: 0.5 }),
  },
  {
    name: 'track-oversea',
    value: calcScore({ dayTime: 0.5 }),
  },
  {
    name: 'live-schedule',
    value: calcScore({ dayTime: 6 }),
  },
  {
    name: 'sex-monitor',
    value: calcScore({ dayTime: 6 }),
  },
  {
    name: 'live-log',
    value: calcScore({ dayTime: 0.5 }),
  },
  {
    name: 'robot-*',
    value: calcScore({ dayTime: 4 }),
  },
  {
    name: 'taobao',
    value: calcScore({ dayTime: 10 }),
  },
]

const doneScore = done.reduce((res, current) => res + current.value, 0)
const progressScore = progress.reduce((res, current) => res + current.value, 0)
const todoScore = todo.reduce((res, current) => res + current.value, 0)

const total = doneScore + progressScore + todoScore

const doneRotate = (doneScore / total * 100).toFixed(2)
const progressRotate = (progressScore / total * 100).toFixed(2)
const todoRotate = (todoScore / total * 100).toFixed(2)

const doneStyle = { color: 'rgb(31, 96, 196)' }
const progressStyle = { color: 'rgb(55, 135, 45)' }
const todoStyle = { color: 'rgb(234, 184, 57)' }

const commonGap = {
  borderWidth: 2,
  borderColor: '#ffffff',
}

option = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data:['已完成','进行中','待启动']
  },
  series: [
    {
      name:'项目',
      type:'pie',
      radius: [0, '30%'],
      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[
        {
          value: doneRotate,
          itemStyle: doneStyle,
          name:'已完成',
        },
        {
          value: progressRotate,
          itemStyle: progressStyle,
          name:'进行中',
        },
        {
          value: todoRotate,
          itemStyle: todoStyle,
          name:'待启动',
        }
      ]
    },
    {
      name:'耗时',
      type:'pie',
      radius: ['30%', '45%'],
      label: {
        normal: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}h  {per|{d}%}  ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#999',
              lineHeight: 16,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 14,
              lineHeight: 24
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      data:[
        ...sortItem(done).map(item => ({...item, itemStyle: { ...doneStyle, ...commonGap } })),
        ...sortItem(progress).map(item => ({...item, itemStyle: { ...progressStyle, ...commonGap }})),
        ...sortItem(todo).map(item => ({...item, itemStyle: { ...todoStyle, ...commonGap }})),
      ]
    }
  ]
}

function calcScore ({
  personTime = 1,
  dayTime = 1
}) {
  return personTime * person * dayTime * day
}

function sortItem (list) {
  return list.sort((left, right) => right.value - left.value)
}