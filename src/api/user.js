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
    url: `http://ttapi.research.itcast.cn/app/v1_0/user/blacklists/:${target}`,
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
// 获取用户个人信息请求方法
function userInfoProfile () {
  return instance({
    url: 'user/profile',
    method: 'GET'
  })
}
// 关注用户请求方法
function userFollow (target) {
  return instance({
    url: 'user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消关注用户请求方法
function userNoFollow (target) {
  return instance({
    url: `user/followings/${target}`,
    method: 'DELETE'
  })
}
// 设置用户头像请求方法
function userUpIcon (photo) {
  let fd = new FormData()
  fd.append('photo', photo)
  return instance({
    url: 'user/photo',
    method: 'PATCH',
    data: fd
  })
}
// 设置用户个人资料请求方法
function userSetProfile ({ name, gender, birthday, intro }) {
  return instance({
    url: 'user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday,
      intro
    }
  })
}

export {
  userLogin,
  userBlacklists,
  userBlacklistsCancel,
  userInfo,
  userInfoProfile,
  userFollow,
  userNoFollow,
  userUpIcon,
  userSetProfile
}
