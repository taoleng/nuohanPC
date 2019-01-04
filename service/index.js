import axios from 'axios'
import config from './config'
import store from '../store'
import { authToken, lang, webToken } from '../store/datakey'
import { getCookie, getcookiesInServer } from '../assets/js/cookie'
const service = axios.create(config)
// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (process.browser) {
      config.headers['token'] = getCookie(authToken) || '';
      config.headers['language'] = getCookie(lang) || '';
      config.headers['temptoken'] = getCookie(webToken) || '';
    } else {
      config.headers['token'] = store().state.token || '';
      config.headers['language'] = store().state.lang || '';
      config.headers['temptoken'] = store().state.webToken || '';
    }
    return config

  },
  error => {
    return Promise.reject(error)
  }
)
// 返回结果处理
service.interceptors.response.use(
  res => {
    if (res.data.code === -1 || res.data.code === -2) {
      if (process.browser) {
        // window.location( window.location.href = '/user/login')
        return;
      }
    }
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  // post 方法
  post (url, data) {
    return service({
      method: 'post',
      url,
      data: data
    })
  },
  // get 方法
  get (url, data) {
    return service({
      method: 'get',
      url,
      data: data
    });
  },
}
