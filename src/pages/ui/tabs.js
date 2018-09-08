import React, {Component} from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane

export default class Messages extends Component{

  newTabIndex = 0

  componentWillMount () {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1 content',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2 content',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3 content',
        key: '3'
      }
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  }

  callback = (key) => {
    message.info('Hi, 您选择了页签' + key)
  }

  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrapper">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">欢迎学习react课程 </TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3" disabled>Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab页签--带图标" className="card-wrapper">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">欢迎学习react课程 </TabPane>
            <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab页签--带图标" className="card-wrapper">
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.onChange}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map((panel) => {
              return <TabPane
                        tab={panel.title}
                        key={panel.key}
                      />
            })}
          </Tabs>
        </Card>
      </div>
    )
  }
}