import React, {Component} from 'react'
import {Card, Spin, Icon, Alert} from 'antd'
import './ui.less'

export default class Loadings extends Component{
  render() {
    const icon1 = <Icon type="loading" style={{fontSize: 24}}/>
    const icon2 = <Icon type="plus" style={{fontSize: 24}}/>
    return (
      <div>
        <Card title="Spin用法" className="card-wrapper">
          <Spin size="small"/>
          <Spin style={{margin: '0 10px'}}/>
          <Spin size="large"/>
          <Spin indicator={icon1} style={{marginLeft: 10}}/>
          <Spin indicator={icon2} style={{marginLeft: 10}} spinning/>
        </Card>
        <Card title="内容遮罩" className="card-wrapper" style={{marginBottom: 0}}>
          <Alert
            message="React"
            description="欢迎来到react课程"
            type="info"
            className="card-alert"
          />
          <Spin>
            <Alert
              message="React"
              description="欢迎来到react课程"
              type="success"
              className="card-alert"
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="欢迎来到react课程"
              type="success"
              className="card-alert"
            />
          </Spin>
          <Spin indicator={icon1}>
            <Alert
              message="React"
              description="欢迎来到react课程"
              type="success"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}