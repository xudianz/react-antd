import React, {Component} from 'react'
import {Card, Carousel} from 'antd'
import './ui.less'

export default class Carousels extends Component{
  render () {
    return (
      <div className="card-wrapper">
        <Card title="文字背景轮播" className="card-wrapper">
          <Carousel autoplay effect="fade">
            <div><h1>Ant Motion Banner -- React</h1></div>
            <div><h1>Ant Motion Banner -- Vue</h1></div>
            <div><h1>Ant Motion Banner -- Angular</h1></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="slider-wrapper">
          <Carousel autoplay effect="fade">
            <div>
              <img src="/carousel-img/1.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/2.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}