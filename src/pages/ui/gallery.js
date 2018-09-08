import React, {Component} from 'react'
import {Card, Row, Col, Modal} from 'antd'
import './ui.less'

export default class Gallery extends Component{

  state = {
    visible: false
  }

  openGallery = (imgSrc) => {
    this.setState({
      currentImg: `/gallery/${imgSrc}`,
      visible: true
    })
  }

  render() {
    const imgs = [
      ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      ['6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'],
      ['11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
      ['16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
      ['21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg']
    ]
    const imgList = imgs.map((list) => list.map((item, index) =>
      <Card 
        key={index}
        cover={<img src={`/gallery/${item}`} 
                    alt="加载失败"
                    onClick={() => this.openGallery(item)} 
                />}
        style={{marginBottom: 10}}
      >
        <Card.Meta
          title="React Admin"
          description="www.baidu.com"
        />
      </Card>
  ))
    return (
      <div className="card-wrapper">
        <Row gutter={10}>
          <Col md={5}>
            {imgList[0]}
          </Col>
          <Col md={5}>
            {imgList[1]}
          </Col>
          <Col md={5}>
            {imgList[2]}
          </Col>
          <Col md={5}>
            {imgList[3]}
          </Col>
          <Col md={4}>
            {imgList[4]}
          </Col>
        </Row>
        <Modal
          width={300}
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false})}
          footer={null}
          title="图片画廊"
        >
          <img src={this.state.currentImg} alt="" style={{width: '100%', height: 400}}/>
        </Modal>
      </div>
    )
  }
}