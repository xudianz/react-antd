import React from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default {
  formateDate (time) {
    if (!time) return ''
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  },
  pagination (data, callback) {
    let page = {
      onChange: (current) => {
        callback(current) // 改变页码 执行回调
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.page}条`
      },
      showQuickJumper: true
    }
    return page
  },
  getOptionList (data) {
    if (!data) {
      return 
    }
    let options = []
    data.map((item) => {
      return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  },
  updateSelectedItem (selectedRowKeys, selectedItem, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedItem,
        selectedIds
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem
      })
    }
  }
}
// 百度API 天气接口 'api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'