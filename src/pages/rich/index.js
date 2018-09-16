import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import draftjs from 'draftjs-to-html'

export default class RichText extends Component{

  state = {
    showRichText: false,
    editorState: ''
  }

  // 编辑器状态
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }

  // 内容状态
  onEditorChange = (contentState) => {
    this.setState({
      contentState
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  render () {
    const { editorState } = this.state
    return (
      <div>
        <Card className="card-wrapper">
          <Button type="primary" onClick={this.handleClearContent} style={{marginRight: 10}}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑器" className="card-wrapper">
          <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => this.setState({showRichText: false})}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>    
      </div>
    )
  }
}