import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
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
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import Permission from './pages/permission'

export default class IRouter extends Component{
  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            }/>
            <Route path="/" render={() =>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/ui/buttons" component={Button}/>
                  <Route path="/ui/modals" component={Modal} />
                  <Route path="/ui/loadings" component={Loadings} />
                  <Route path="/ui/notification" component={Notification} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousels}/>
                  <Route path="/form/login" component={FormLogin} />
                  <Route path="/form/register" component={Register} />
                  <Route path="/table/basic" component={Basic} />
                  <Route path="/table/high" component={HighTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/echarts/bar" component={Bar} />      
                  <Route path="/echarts/pie" component={Pie} />
                  <Route path="/echarts/line" component={Line} />  
                  <Route path="/rich" component={RichText} />  
                  <Route path="/permission" component={Permission} />
                  <Redirect to="/home" />                                                                                
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            } />

            {/* <Route path="/order/detail" component={Login} /> */}
          </Switch>
        </App>
      </Router>
    )
  }
}