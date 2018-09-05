import React, {Component} from 'react'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'
import Home1 from './Home1'
import About from './About'
import Topics from './Topics'

export default class Home extends Component{
  render () {
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <hr/>
          <Switch>
            <Route exact path="/" component={Home1}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topics}></Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}