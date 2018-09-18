import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Admin from './admin'
import Router from './router'
import { Provider } from 'react-redux'
import configStore from './redux/store/configStore'
import registerServiceWorker from './registerServiceWorker';

const store = configStore()

// Provider 提供数据源store
ReactDOM.render(
  <Provider store={store}> 
    <Router />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
