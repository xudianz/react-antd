import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
  static jsonp (options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      },function (err, response) {
        if (response.status === 'success') {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    })
  }

  static ajax (options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    // const baseURL = 'https://www.easy-mock.com/mock/5b97376f74ae6d082f54e316/reactantdapi'
    const baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        methods: 'get',
        baseURL,
        timeout: 500000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (response.status === 200) {
          let res = response.data
          if (res.code === 0 || res.code === '0') {
            resolve(res)
          } else {
            Modal.info({
              title: '提示',
              content: res.message
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}