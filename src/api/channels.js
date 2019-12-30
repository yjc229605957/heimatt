// 封装所以关于频道的请求方法

// 导入axios
import instance from '../utils/http'
// 获取用户频道列表请求方法
function channelsList () {
  return instance({
    url: '/user/channels',
    method: 'get'
  })
}

// 获取用户频道列表请求方法
function AllchannelsList () {
  return instance({
    url: '/channels',
    method: 'get'
  })
}

// 新增用户频道请求方法
function AddChannels (channels) {
  return instance({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

export { channelsList, AllchannelsList, AddChannels }
