import React, { Component } from 'react'
import { Card } from 'antd'
//import echarts from 'echarts' 导入了所有的图标
//按需加载 ⬇
import echarts from 'echarts/lib/echarts'
// 导入柱饼图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
// 导入主题
import echartsTheme from '../echartsTheme'

import ReactEcharts from 'echarts-for-react'



export default class Line extends Component{

  componentWillMount () {
    // 注册主题  在render()之前 注入
    echarts.registerTheme('Imooc', echartsTheme)
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    }
    return option
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['ofo订单量', 'mobike订单量']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo订单量',
          type: 'line',
          data: [1200, 3000, 4500, 6000, 8000, 12000, 20000]
        },
        {
          name: 'mobike订单量',
          type: 'line',
          data: [1000, 2000, 5500, 6000, 12000, 10000, 12000]
        }
      ]
    }
    return option
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
          areaStyle: {}
        }
      ]
    }
    return option
  }

  render () {
    return (
      <div>
        <Card title="折线图表一" className="card-wrapper">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height: 500}}/>
        </Card>
        <Card title="折线表二" className="card-wrapper">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height: 500}}/>
        </Card>
        <Card title="折线表三">
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height: 500}}/>
        </Card>          
      </div>
    )
  }
}