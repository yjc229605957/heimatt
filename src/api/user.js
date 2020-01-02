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
// 拉黑用户请求方法
function userBlacklists (target) {
  return instance({
    url: '/user/blacklists',
    method: 'post',
    data: {
      target
    }
  })
}
// 取消拉黑用户请求方法
function userBlacklistsCancel (target) {
  return instance({
    url: `http://ttapi.research.itcast.cn/app/v1_0/user/blacklists/:target=${target}`,
    method: 'DELETE'
  })
}
// 获取用户自己信息请求方法
function userInfo () {
  return instance({
    url: 'user',
    method: 'GET'
  })
}

export { userLogin, userBlacklists, userBlacklistsCancel, userInfo }
