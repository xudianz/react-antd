import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
const FormItem = Form.Item

class Login extends Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    // validateFields 校验并获取一组输入域的值
    this.props.form.validateFields((err, value) => {
      if (!err) {
        message.success(`${userInfo.userName} 恭喜您通过本次表单组件学习，当前密码为${userInfo.passWord}`)
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form // 获取表单this.props.form
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入账号" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登 录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginTop: 10}}>
          <Form layout="horizontal"style={{width: 300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 5,
                      max: 10,
                      message: '长度不在范围内'
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或者数字'
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: []
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>记住密码</Checkbox>)
              }
              <a href="http://www.baidu.com" style={{float: 'right'}}>忘记密码？</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登 录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(Login)
