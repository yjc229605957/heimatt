// 此文件封装所有与axios 相关的逻辑

// 导入axios
import axios from 'axios'
// 导入仓库
import store from '../store/store'
// 导入 jsonbigint
import jsonbig from 'json-bigint'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [
    function (data) {
      try {
        return jsonbig.parse(data)
      } catch {
        return JSON.parse(data)
      }
    }
  ]
})

// 设置请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 取出仓库中用户信息,如果有就携带token
    let user = store.state.user
    if (user.token) {
      // 在请求头中添加 token
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 设置响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 暴露出去
export default instance
