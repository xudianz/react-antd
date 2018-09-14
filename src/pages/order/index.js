import React, { Component } from 'react'
import { Card, Button, Form, Modal, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import ETable from '../../components/e-table'
import BaseForm from '../../components/base-form'

const FormItem = Form.Item
// const Option = Select.Option

export default class Order extends Component{

  state = {
    list: [],
    orderConfirmVisible: false,
    selectedItem: null,
    orderInfo: {},
    selectedRowKeys: []
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initValue: '1',
      width: 80,
      list: [
        {id: '0', name: '全部', key: '01'},
        {id: '1', name: '北京', key: '02'},
        {id: '2', name: '天津', key: '03'},
        {id: '3', name: '上海', key: '04'}
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
        {id: '0', name: '全部', key: '10001'},
        {id: '1', name: '进行中', key: '10002'},
        {id: '2', name: '结束行程', key: '10003'}
      ]
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
    axios.requestList(this, '/order/list', this.params, true)
  }

  // 打开结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem
    console.log(item)
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code === '0' || res.code === 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: true
        })
      }
    })
  }

  // 结束订单确认
  handleFinishOrderOk = () => {
    let item = this.state.selectedItem
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code === 0 || res.code === '0') {
        message.success('结束订单成功')
        this.setState({
          orderConfirmVisible: false
        })
        this.requestList()
      }
    })
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单'
      })
      return
    }
    //window.location.href = `/#/common/order/detail/${item.id}`
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        key: '01',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        key: '02',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        key: '03',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        key: '04',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        key: '05',
        dataIndex: 'distance'
      },
      {
        title: '行驶时长',
        key: '06',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        key: '07',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        key: '08',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        key: '09',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        key: '10',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        key: '11',
        dataIndex: 'user_pay'
      }
    ]
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return (
      <div>
        <Card className="card-wrapper">
          {/* <FilterForm /> */}
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilter}
          />
        </Card>
        <Card>
          <Button type="primary" onClick={this.openOrderDetail} style={{marginRight: 15}}>订单详情</Button>
          <Button type="primary" onClick={this.handleFinishOrder}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          {/* <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          /> */}
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            pagination={this.state.pagination}
            rowSelection="radio"
            selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false
            })
          }}
          onOk={this.handleFinishOrderOk}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

// class FilterForm extends Component{
//   render () {
//     const {getFieldDecorator} = this.props.form
//     return (
//       <Form layout="inline">
//         <FormItem label="城市">
//           {
//             getFieldDecorator('city_id')(
//               <Select placeholder="全部" style={{width: 86}}>
//                 <Option value="">全部</Option>
//                 <Option value="1">北京市</Option>
//                 <Option value="2">天津市</Option>
//                 <Option value="3">上海市</Option>
//                 <Option value="4">深圳市</Option>
//               </Select>
//             )
//           }
//         </FormItem>
//         <FormItem label="订单时间">
//           {
//             getFieldDecorator('start_time')(
//               <DatePicker
//                 showTime
//                 format="YYYY-MMM-DD HH:mm:ss"
//               />
//             )
//           }
//         </FormItem>
//         <FormItem>
//           {
//             getFieldDecorator('end_time')(
//               <DatePicker
//                 showTime
//                 format="YYYY-MMM-DD HH:mm:ss"
//               />
//             )
//           }
//         </FormItem>
//         <FormItem label="订单状态">
//           {
//             getFieldDecorator('status')(
//               <Select placeholder="全部" style={{width: 72}}>
//                 <Option value="">全部</Option>
//                 <Option value="1">进行中</Option>
//                 <Option value="2">结束行程</Option>
//               </Select>
//             )
//           }
//         </FormItem>
//         <FormItem>
//           <Button type="primary" style={{marin: '0 20px'}}>查询</Button>
//           <Button>重置</Button>
//         </FormItem>
//       </Form>
//     )
//   }
// }
// FilterForm = Form.create()(FilterForm)