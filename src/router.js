import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import Modal from './pages/ui/modals'
import NoMatch from './pages/nomatch'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/table/basic'
import HighTable from './pages/table/high'
import City from './pages/city'

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
                <Route path="/admin/ui/loading" component={Loadings} />
                <Route path="/admin/ui/notification" component={Notification} />
                <Route path="/admin/ui/messages" component={Messages} />
                <Route path="/admin/ui/tabs" component={Tabs} />
                <Route path="/admin/ui/gallery" component={Gallery} />
                <Route path="/admin/ui/carousel" component={Carousels}/>
                <Route path="/admin/form/login" component={FormLogin} />
                <Route path="/admin/form/register" component={Register} />
                <Route path="/admin/table/basic" component={Basic} />
                <Route path="/admin/table/high" component={HighTable} />
                <Route path="/admin/city" component={City} />
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