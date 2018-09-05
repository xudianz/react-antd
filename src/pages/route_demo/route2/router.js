import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home1 from '../route1/Home1'
import About from '../route1/About'
import Topics from '../route1/Topics'
import Home from './Home'

export default class IRouter extends Component{
  render () {
    return (
      <Router>
        <Home>
          <Route exact path="/" component={Home1}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topics" component={Topics}></Route>
        </Home>
      </Router>
    )
  }
}