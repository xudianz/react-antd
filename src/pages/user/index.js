import React, { Component } from 'react'
import { Card, Button, Modal, Form, Select, Input, Radio, DatePicker } from 'antd'
import ETable from '../../components/e-table'
import BaseForm from '../../components/base-form'
import axios from '../../axios'
import Utils from '../../utils/utils'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

export default class User extends Component{

  state = {
    isVisible: false
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'user_name',
      width: 120
    },
    {
      type: 'INPUT',
      label: '用户手机号',
      placeholder: '请输入手机号',
      field: 'user_mobile',
      width: 120
    },{
      type: 'DATE',
      label: '入职日期',
      field: 'user_date',
      width: 100,
      placeholder: '请选择入职日期',
    }
  ]

  componentDidMount () {
    this.requestList()
  }

  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  // 功能区操作
  handleOperate = (type) => {
    let item = this.state.selectedItem
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择用户进行编辑'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type === 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请先选择一条用户信息'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '详情',
        userInfo: item
      })
    } else {
      // 删除员工
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请先选择一条用户信息'
        })
        return
      }
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前员工信息吗？',
        onOk: () => {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then((res) => {
            if (res.code === '0' || res.code === 0) {
              this.setState({
                isVisible: false
              })
              this.requestList()
            }
          })
        }
      })
    }
  }

  // 创建员工提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue()
    axios.ajax({
      url: type === 'create' ? '/user/add': '/user/edit',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code === '0' || res.code === 0) {
        this.userForm.props.form.resetFields()
        this.setState({
          isVisible: false
        })
        this.requestList()
      }
    })
  }

  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            '1': '差',
            '2': '一般',
            '3': '好',
            '4': '很好',
            '5': '超级棒',
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          return {
            '1': '穿越火线',
            '2': '王者荣耀',
            '3': '地下城',
            '4': '节奏大师',
            '5': '龙争虎斗',
            '6': '泡泡堂',
            '7': 'YY娱乐',
            '8': '虎牙直播'
          }[interest]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    let footer = {}
    if (this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilter}
          />
        </Card>
        <Card className="operate-wrap">
          <Button type="primary" icon="plus" onClick={() =>this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={() =>this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" onClick={() =>this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={() =>this.handleOperate('delete')}>删除员工</Button>          
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            pagination={false}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.userForm.props.form.resetFields()
            this.setState({
              isVisible: false
            })
          }}
          width={600}
          {...footer}
        >
          <UserForm
            type={this.state.type}
            wrappedComponentRef={(inst) => this.userForm = inst}
            userInfo={this.state.userInfo}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component{

  getState = (state) => {
    return {
      '1': '差',
      '2': '一般',
      '3': '好',
      '4': '很好',
      '5': '超级棒',
    }[state]
  }

  render () {
    let type = this.props.type
    let userInfo = this.props.userInfo || {} // 编辑为空
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="horizontal">
        <FormItem label="用户名" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.username :
            getFieldDecorator('user_name',{
              initialValue: userInfo.username
            })(
              <Input type="text" placeholder="请输入用户名"/>
            )
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            type === 'detail' ? (userInfo.sex === 1 ? '男': '女') :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup type="text" placeholder="请输入用户名">
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            type === 'detail' ? this.getState(userInfo.state) :
            getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>差</Option>
                <Option value={2}>一般</Option>
                <Option value={3}>好</Option>
                <Option value={4}>很好</Option>
                <Option value={5}>超级棒</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.birthday :
            getFieldDecorator('birtyday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker />
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.address :
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm)