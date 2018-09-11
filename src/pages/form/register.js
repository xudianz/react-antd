import React, { Component } from 'react'
import { Card, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class Register extends Component {

  state = {}

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    console.log(userInfo)
    message.success(`${userInfo.userName} 恭喜您通过本次表单组件学习，当前密码为${userInfo.passWord}`)
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }));
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout ={
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12, offset: 4
        }
      }
    }
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(<Input placeholder="请输入用户名" />)
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(<Input type="password" placeholder="请输您的密码" />)
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(<RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>)
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(<InputNumber />)
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '3'
                })(<Select>
                    <Option value="1">咸鱼一条</Option>
                    <Option value="2">爱吃泡面</Option>
                    <Option value="3">可口可乐</Option>
                  </Select>)
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['2', '4']
                })(<Select mode="multiple">
                    <Option value="1">王者荣耀</Option>
                    <Option value="2">穿越火线</Option>
                    <Option value="3">绝地求生</Option>
                    <Option value="4">节奏大师</Option>
                  </Select>)
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Switch />)
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-09-09 12:00:00')
                })(<DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                  />)
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '北京市朝阳区双桥南街E9区创新工场2号楼'
                })(
                  <TextArea autosize={{minRows:2}}/>
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(<TimePicker />)
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('avatar')(<Upload
                  listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleChange}
                >
                  {this.state.userImg ? 
                    <img src={this.state.userImg} alt=""/> : 
                    <Icon type="plus"/>
                  }
                </Upload>)
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator('xieyi')(
                <Checkbox>我已阅读过<a>相关协议</a></Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Register)