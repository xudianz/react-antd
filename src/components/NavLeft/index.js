import React, {Component} from 'react'
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import './index.less'

const SubMenu = Menu.SubMenu;

class NavLeft extends Component{

  state = {
    currentKey: ''
  }

  componentWillMount () {
    const menuTreeNode = this.renderMenu(MenuConfig)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  handleClick = ({ item, key }) => {
    const { dispatch } = this.props
    dispatch(switchMenu(item.props.title)) // 然后触发reducer
    this.setState({
      currentKey: key
    })
  }

  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        ) 
      }
      return  <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
              </Menu.Item>
    })
  }
  render () {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo.gif" alt="加载失败"/>
          <h1>my Ms</h1>
        </div>
        <Menu
          selectedKeys={[this.state.currentKey]} 
          theme="dark"
          onClick={this.handleClick}
          >
          { this.state.menuTreeNode }
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)