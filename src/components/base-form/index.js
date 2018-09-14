import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'
import utils from '../../utils/utils.js'

const FormItem = Form.Item

class BaseForm extends React.Component {
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue()

        // filterSubmit() 调用父级方法，传递数据
        this.props.filterSubmit(fieldsValue) 
    }
    reset = () => {
        this.props.form.resetFields()
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = []
        if (formList && formList.length > 0) {
            formList.forEach((item) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === '时间查询') {
                    const begin_time = (
                        <FormItem label="订单时间" key="begin_time">
                            {
                                getFieldDecorator('begin_time')(
                                    <DatePicker showTime={true} placeholder="开始时间" style={{width: 172}} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(begin_time)
                    const end_time = (
                        <FormItem label="~" colon={false} key="end_time">
                            {
                                getFieldDecorator('end_time')(
                                    <DatePicker showTime={true} placeholder="结束时间" style={{width: 172}} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(end_time)
                } else if (item.type === 'INPUT') {
                    const INPUT = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })( 
                                    <Input type="text" placeholder={placeholder} style={{width: width}}/>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })(
                                    <Select 
                                        style={{width: width}}
                                        placeholder={placeholder}
                                    >
                                        {utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = (
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    valuePropName: 'checked',
                                    initialValue: initialValue   // true | false
                                })(
                                    <Checkbox>
                                        {label}
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(CHECKBOX)
                } else if (item.type === 'DATE') {
                    const DatePicke = (
                        <FormItem label={label} key={field}>
                           {
                                getFieldDecorator(field)(
                                    <DatePicker showTime={true} placeholder={placeholder} style={{width: 172}} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>
                    )
                    formItemList.push(DatePicke)
                }
            })
        }
        return formItemList;
    }
    render () {
        console.log(this.initFormList())
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 16px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(BaseForm)