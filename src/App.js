import React, { Component } from 'react';
// import 'antd/dist/antd.css'
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
