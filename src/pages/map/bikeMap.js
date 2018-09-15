import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from '../../components/base-form'
import axios from '../../axios'

export default class BikeMap extends Component{

  state = {}
  map = '' // 地图对象

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initValue: '0',
      width: 80,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '北京'},
        {id: '2', name: '天津'},
        {id: '3', name: '深圳'}
      ]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initValue: '0',
      width: 80,
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '进行中'},
        {id: '2', name: '行程结束'}
      ]
    }
  ]

  componentWillMount () {
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code === 0 || res.code === '0') {
        this.setState({
          total_count: res.result.total_count
        })
        this.renderMap(res)
      }
    })
  }

  // 查询表单
  handleFilterSubmit = (filterParams) => {
    this.params = filterParams
    this.requestList()
  }

  // 渲染地图数据
  renderMap = (res) => {
    let list = res.result.route_list
    this.map = new window.BMap.Map('container')
    let gps1 = list[0].split(',') // 起点
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    let gps2 = list[list.length - 1].split(',') // 终点
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])

    this.map.centerAndZoom(endPoint, 11)

    let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let bikeMarkerStart = new window.BMap.Marker(startPoint, {
      icon: startPointIcon
    })
    this.map.addOverlay(bikeMarkerStart)
    let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {
      icon: endPointIcon
    })
    this.map.addOverlay(bikeMarkerEnd)

    // 绘制车辆行驶路线
    let routeList = []
    list.forEach((item) => {
      let p = item.split(',')
      routeList.push(new window.BMap.Point(p[0], p[1]))
    })

    // 连线
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 2,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyLine)

    // 绘制服务区
    let servicePointList = []
    let serviceList = res.result.service_list
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat))
    })

    // 连线
    let polyServiceLine = new window.BMap.Polyline(servicePointList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyServiceLine)

    // 添加地图中的自行车图标
    let bikeList = res.result.bike_list
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(36, 42)
    })
    bikeList.forEach((item) => {
      let p = item.split(',')
      let point = new window.BMap.Point(p[0], p[1])
      let bikeMarker = new window.BMap.Marker(point, {
        icon: bikeIcon
      })
      this.map.addOverlay(bikeMarker)
    })


  }

  render () {
    return (
      <div>
        <Card className="card-wrapper">
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilterSubmit}
          />
        </Card>
        <Card>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{height: 450}}></div>
        </Card>
      </div>
    )
  }
}