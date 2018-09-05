import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'

export default class IRouter extends Component{
  render () {
    return (
      <Router>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/order/detail" component={Login} />
        </App>
      </Router>
    )
  }
}