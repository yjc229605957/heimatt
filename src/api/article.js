// 封装所有关于文章article的请求方法

// 导入axios
import instance from '../utils/http'

// 获取频道文章列表请求方法
function articleList ({ channelId, timestamp }) {
  return instance({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1
    }
  })
}
// 对文章不喜欢请求方法
function articleDisLike (target) {
  return instance({
    url: 'article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
}
// 举报文章请求方法
function articleReports (target, type) {
  return instance({
    url: 'article/reports',
    method: 'POST',
    data: {
      target,
      type,
      remark: ''
    }
  })
}

export { articleList, articleDisLike, articleReports }
