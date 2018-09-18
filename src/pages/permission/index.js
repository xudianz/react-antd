import React, { Component } from 'react'
import { Card, Button, Tree, Form, Select, Input, Modal, message, Transfer } from 'antd'
import ETable from '../../components/e-table'
import axios from '../../axios'
import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'

const Option = Select.Option
const FormItem = Form.Item
const TreeNode = Tree.TreeNode
export default class Permission extends Component{

  state = {}

  componentWillMount () {
    axios.requestList(this, '/role/list', {})
  }

  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/role/create',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code === 0 || res.code === '0') {
        this.setState({
          isRoleVisible: false
        })
        message.success('创建角色成功')
        // 刷新列表
        axios.requestList(this, '/role/list', {})
        this.roleForm.props.form.resetFields()
      }
    })
  }

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '请选择一个角色'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {...data}
      }
    }).then((res) => {
      if (res.code === '0' || res.code === 0) {
        this.setState({
          isPermVisible: false
        })
        axios.requestList(this, '/role/list', {})
      }
    })
  }

  handleUserAuth = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '请选择一个角色'
      })
      return
    }
    this.getRoleUserList(item.id)
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
  }

  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: {id}
      }
    }).then((res) => {
      if (res.code === 0 || res.code === '0') {
        this.getAuthUserList(res.result)
      }
    })
  }

  getAuthUserList = (dataSource) => {
    const mockData = []
    const targetKeys = []
    if (dataSource && dataSource.length > 0) {
      dataSource.forEach((item) => {
        const data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status
        }
        if (data.status === 1) {
          targetKeys.push(data.key)
        }
        mockData.push(data)
      })
      this.setState({
        mockData,
        targetKeys
      })
    }
  }

  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys // 目标用户id
    data.role_id = this.state.selectedItem.id // 角色id
    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {...data}
      }
    }).then((res) => {
      if (res.code === '0' || res.code === 0) {
        this.setState({
          isUserVisible: false
        })
        axios.requestList(this, '/role/list', {})
      }
    })
  }

  render () {
    const columns = [
      {title: '角色Id', dataIndex: 'id'},
      {title: '角色名称', dataIndex: 'role_name'},
      {title: '创建时间', dataIndex: 'create_time', render: Utils.formateDate},
      {title: '使用状态', dataIndex: 'status', render: (status) => status === 1 ? '启用' : '禁用'},
      {title: '授权时间', dataIndex: 'authorize_time', render: Utils.formateDate},
      {title: '授权人', dataIndex: 'authorize_user_name'}
    ]
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission} style={{margin: '0 10px'}}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            columns={columns}
            dataSource={this.state.list}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields() // 重置
            this.setState({isRoleVisible: false})
          }}
        >
          <RoleForm
            wrappedComponentRef={(inst) => this.roleForm = inst}
          />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PermEditForm
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              })
            }}
            wrappedComponentRef={(inst) => this.permForm = inst}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForm
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
            wrappedComponentRef={(inst) => this.userAuthForm = inst}
          />
        </Modal>
      </div>
    )
  }
}

// 创建角色Form
class RoleForm extends Component{

  render () {
    let type = this.props.type
    let userInfo = this.props.userInfo || {} // 编辑为空
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 15
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            type === 'detail' ? userInfo.username :
            getFieldDecorator('role_name')(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
           getFieldDecorator('state')(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            ) 
          }
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create({})(RoleForm)

// 权限设置Form
class PermEditForm extends Component{

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      }
      return <TreeNode {...item} />
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    const detail_info = this.props.detailInfo
    const menuInfo = this.props.menuInfo
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: '1'
            })(
              <Select>
                <Option value="1">开启</Option>
                <Option value="0">关闭</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
          checkedKeys={menuInfo}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

PermEditForm = Form.create({})(PermEditForm)

class RoleAuthForm extends Component{

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys)
  }

  render () {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    const detail_info = this.props.detailInfo
    return (
      <Form>
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            dataSource={this.props.mockData}
            titles={['待选用户', '已选用户']}
            showSearch
            listStyle={{width: 200, height: 280}}
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            render={item => item.title}
            onChange={this.handleChange}
          />
        </FormItem>
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm)