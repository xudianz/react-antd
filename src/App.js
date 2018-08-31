import React, { Component } from 'react';
import logo from './logo.svg';
import{ Button } from 'antd'
import './App.css';
import './test.less'
// import 'antd/dist/antd.css'

class App extends Component {

  handleClick = () => {
    console.log('fsdfdf')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title test">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={this.handleClick}>antd button</Button>
      </div>
    );
  }
}

export default App;
