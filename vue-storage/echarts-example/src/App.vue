<template>
  <div id="app">
    <div id="echarts"></div>
    <div id="menu">
      <label v-on:click="drawChart('line')">Line<input name="chart" checked type="radio" /></label>
      <label v-on:click="drawChart('pie')">Pie<input name="chart" type="radio" /></label>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

// 测试数据
const opinion = ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
const opinionData = [
    {value:335, name:'直接访问'},
    {value:310, name:'邮件营销'},
    {value:234, name:'联盟广告'},
    {value:135, name:'视频广告'},
    {value:1548, name:'搜索引擎'}
]

export default {
  name: 'app',
  data () {
      return {
          charts: '',
          defaultOptions: {
              legend: {
                orient: 'vertical',
                x: 'left',
                data: opinion
              }
          },
          lineOptions: {
            xAxis: {
                type: 'category',
                data: opinion
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c}'
            },
            series: [{
                name: '柱状图悬浮框',
                data: opinionData,
                type: 'bar'
            }]
          },
          pieOptions: {
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c} ({d}%)'
            },
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius:['50%','70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'blod'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: opinionData
              }
            ]
          }
      }
  },
  methods:{
      drawChart (type = 'line') {
          this.charts && this.charts.dispose() // 每次创建前销毁之前的实例即可
          this.charts = echarts.init(document.getElementById('echarts'))

          this.charts.setOption({
              ...this.defaultOptions,
              ...type === 'line' ? this.lineOptions : this.pieOptions
          })
      }
  },
  //调用
  mounted(){
      this.$nextTick(function() {
          this.drawChart()
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#echarts {
  width: 600px;
  height: 400px;
}
</style>
