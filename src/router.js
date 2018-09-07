import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import Modal from './pages/ui/modals'
import NoMatch from './pages/nomatch'

export default class IRouter extends Component{
  render () {
    return (
      <Router>
        <App>
          <Route path="/login" component={Login} />
          <Route path="/admin" render={() =>
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Button}/>
                <Route path="/admin/ui/modals" component={Modal} />
                <Route component={NoMatch} />
              </Switch>      
            </Admin>
          } />
          <Route path="/order/detail" component={Login} />
        </App>
      </Router>
    )
  }
}