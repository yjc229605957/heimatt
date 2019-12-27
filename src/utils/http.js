// 此文件封装所有与axios 相关的逻辑

// 导入axios
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 设置请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 设置响应拦截器
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 暴露出去
export default instance