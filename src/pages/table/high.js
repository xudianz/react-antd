import React, { Component } from 'react'
import { Card, Table, Modal, message, Badge, Button } from 'antd'
import axios from '../../axios/index'
// import Utils from '../../utils/utils';

export default class Basic extends Component{
  // setState ==> render() ===> 渲染dom
  state = {}

  params = {
    page: 1
  }

  componentDidMount () {
    this.request()
  }

  // 获取mock数据
  request = () => {
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          dataSource: res.result.list
        })
      }
    })
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    })
  }

  // 删除操作
  handleDelete = (text, item) => {
    Modal.confirm({
      title: '确认',
      content: '您确认要删除这条数据吗？',
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: '0',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: '1',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: '2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: '3',
        render (state) {
          let config = {
            '1' : '差',
            '2' : '一般',
            '3' : '好',
            '4' : '很好',
            '5' : '非常好'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: '4',
        render (hobby) {
          let config = {
            '1': '穿越火线',
            '2': '王者荣耀',
            '3': '绝地求生',
            '4': '节奏大师',
            '5': '龙争虎斗',
            '6': '大话西游'
          }
          return config[hobby]
        },
        width: 100
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: '6',
        width: 160
      },
      {
        title: '早期时间',
        dataIndex: 'time',
        key: '7',
        width: 90
      }
    ]
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        key: '0',
        fixed: 'left',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: '1',
        fixed: 'left',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: '2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: '3',
        render (state) {
          let config = {
            '1' : '差',
            '2' : '一般',
            '3' : '好',
            '4' : '很好',
            '5' : '非常好'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: '4',
        render (hobby) {
          let config = {
            '1': '穿越火线',
            '2': '王者荣耀',
            '3': '绝地求生',
            '4': '节奏大师',
            '5': '龙争虎斗',
            '6': '大话西游'
          }
          return config[hobby]
        },
        width: 100
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5-1',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5-2',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5-3',
        width: 120
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5-4',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: '6',
        fixed: 'right',
        width: 160
      },
      {
        title: '早期时间',
        dataIndex: 'time',
        key: '7',
        fixed: 'right',
        width: 90
      }
    ]
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
        key: '0',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: '1',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: '2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: '40',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: '3',
        render (state) {
          let config = {
            '1' : '差',
            '2' : '一般',
            '3' : '好',
            '4' : '很好',
            '5' : '非常好'
          }
          return config[state]
        },
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: '4',
        render (hobby) {
          let config = {
            '1': '穿越火线',
            '2': '王者荣耀',
            '3': '绝地求生',
            '4': '节奏大师',
            '5': '龙争虎斗',
            '6': '大话西游'
          }
          return config[hobby]
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: '6',
      },
      {
        title: '早期时间',
        dataIndex: 'time',
        key: '7',
      }
    ]
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id',
        key: '0',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: '1',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: '2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: '40'
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: '3',
        render (state) {
          let config = {
            '1' : '差' ,
            '2' : '一般',
            '3' : '好',
            '4' : '很好',
            '5' : '非常好'
          }
          return config[state]
        },
      },
      {
        title: '爱好',
        dataIndex: 'hobby',
        key: '4',
        render (hobby) {
          let config = {
            '1': <Badge status="success" text="穿越火线" />,
            '2': <Badge status="error" text="王者荣耀" />,
            '3': <Badge status="default" text="绝地求生" />,
            '4': <Badge status="success" text="节奏大师" />,
            '5': <Badge status="warning" text="龙争虎斗" />,
            '6': <Badge status="processing" text="大话西游" />
          }
          return config[hobby]
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: '6',
      },
      {
        title: '删除',
        // 注意this指向, 使用箭头函数
        render: (text, item) => {
          return <Button size="small" onClick={(item) => this.handleDelete(item)}>删除</Button>
        }
      }
    ]
    return (
      <div>
        <Card title="头部固定" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            bordered
            pagination={false}
            scroll={{y: 240}}
          />
        </Card>
        <Card title="列固定" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource}
            columns={columns2}
            bordered
            pagination={false}
            scroll={{x: 1285}}
          />
        </Card>
        <Card title="表格排序" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource}
            columns={columns3}
            bordered
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource}
            columns={columns4}
            bordered
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}