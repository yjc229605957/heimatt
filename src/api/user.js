// 封装所有user 的请求

// 导入axios
import instance from '../utils/http'

// 用户登录/注册请求方法
function userLogin (data) {
  return instance({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export {
  userLogin
}
