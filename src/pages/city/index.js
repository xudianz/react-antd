import React, { Component } from 'react'
import { Card, Table, Button, Form, Select, Modal } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

export default class City extends Component{

  state = {
    list: [],
    isShowOpenCity: false
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  // 默认请求数据接口
  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      console.log(res)
      this.setState({
        list: res.result.item_list,
        pagination: Utils.pagination(res, (current) => {
          _this.params.page = current
          this.requestList()
        })
      })
    })
  }

  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  //城市开通提交
  handleSubmit = () => {
    console.log('fsdf')
  }

  render () {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id',
        key: '01'
      },
      {
        title: '城市名称',
        dataIndex: 'name',
        key: '02'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        key: '03'
      },
      {
        title: '运营模式',
        dataIndex: 'op_mode',
        key: '04'
      },
      {
        title: '授权加盟',
        dataIndex: 'franchisee_name',
        key: '05'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        key: '06',
        render (arr) {
          return arr.map((item) => {
            return item.user_name
          }).join(',') 
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time',
        key: '07'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        key: '08'
      },
      {
        title: '操作员',
        dataIndex: 'sys_user_name',
        key: '09'
      }
    ]
    return (
      <div>
        <Card className="card-wrapper">
          <FilterForm />
        </Card>
        <Card style={{marginTop: 1}}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
        >
        </Modal>
      </div>
    )
  }
}

class FilterForm extends Component{
  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('city_id')(
              <Select placeholder="全部" style={{width: 86}}>
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">上海市</Option>
                <Option value="4">深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select placeholder="全部" style={{width: 132}}>
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select placeholder="全部" style={{width: 72}}>
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select placeholder="全部" style={{width: 86}}>
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{marin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create()(FilterForm)
