import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils';

export default class Basic extends Component{
  // setState ==> render() ===> 渲染dom
  state = {
    dataSource2: [],
    pagination: true
  }

  params = {
    page: 1
  }

  componentDidMount () {
    const dataSource = [
      {
        id: '0',
        key: '0',
        userName: 'juejiang',
        sex: '1',
        state: '1',
        hobby: '2',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        key: '1',
        userName: 'juejiang2',
        sex: '1',
        state: '1',
        hobby: '2',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园2',
        time: '10:00'
      },
      {
        id: '3',
        key: '2',
        userName: 'juejiang3',
        sex: '0',
        state: '3',
        hobby: '2',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园3',
        time: '11:00'
      }
    ]
    this.setState({
      dataSource
    })
    this.request()
  }

  // 获取mock数据
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          dataSource2: res.result.list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination: Utils.pagination(res, (next) => {
            // 改变页码回调
            _this.params.page = next
            this.request()
          })
        })
      }
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index]
    Modal.info({
      title: '选中行',
      content: `用户id: ${record.id}，用户名：${record.userName}，用户爱好${record.hobby}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.map((item) => {
      return ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
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
        key: '0'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: '1'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: '2',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
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
        }
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
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: '5'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: '6'
      },
      {
        title: '早期时间',
        dataIndex: 'time',
        key: '7'
      }
    ]
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    } 
    return (
      <div>
        <Card title="基础表格" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="动态数据表格-mock" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource2}
            columns={columns}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="mock-单选" className="card-wrapper">
          <Table
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
            dataSource={this.state.dataSource2}
            columns={columns}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="mock-单选" className="card-wrapper">
          <div style={{marginBottom: 10}}>
            <Button type="primary" onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            rowSelection={rowCheckSelection}
            dataSource={this.state.dataSource2}
            columns={columns}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="mock-分页" className="card-wrapper">
          <Table
            dataSource={this.state.dataSource2}
            columns={columns}
            bordered
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}