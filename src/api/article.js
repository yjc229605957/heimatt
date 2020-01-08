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
// 获取文章详情内容请求方法
function articleContent (articleId) {
  return instance({
    url: `articles/${articleId}`,
    method: 'GET'
  })
}
// 对文章点赞请求方法
function articleLike (articleId) {
  return instance({
    url: 'article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消对文章点赞请求方法
function articleNoLike (articleId) {
  return instance({
    url: `article/likings/${articleId}`,
    method: 'DELETE'
  })
}
// 对文章不喜欢请求方法
function articleDis (articleId) {
  return instance({
    url: 'article/dislikes',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消对文章不喜欢请求方法
function articleNoDis (articleId) {
  return instance({
    url: `article/dislikes/${articleId}`,
    method: 'DELETE'
  })
}
// 获取文章评论请求方法
function getComment ({ artId, offset }) {
  return instance({
    url: 'comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artId,
      offset: offset,
      limit: '10'
    }
  })
}
// 获取文章评论的   评论回复   请求方法
function getReplyComment ({ comId, offset }) {
  return instance({
    url: `comments?type=c&source=${comId}&limit=10`,
    method: 'GET',
    params: { offset }
  })
}
// 新增文章评论请求方法
function AddComment ({ artId, content, writeArtId }) {
  return instance({
    url: 'comments',
    method: 'POST',
    data: {
      target: artId,
      content,
      art_id: writeArtId
    }
  })
}
// 新增文章评论回复  请求方法
function ReplyComment ({ comId, content, writeArtId }) {
  return instance({
    url: 'comments',
    method: 'POST',
    data: {
      target: comId,
      content,
      art_id: writeArtId
    }
  })
}

export {
  articleList, // 获取频道文章列表
  articleDisLike, // 对文章不喜欢
  articleReports, // 举报文章
  articleContent, // 获取文章内容
  articleLike, // 对文章点赞
  articleNoLike, // 取消点赞
  articleDis, // 对文章不喜欢
  articleNoDis, // 取消对文章不喜欢
  getComment, // 获取文章评论
  getReplyComment, // 获取文章评论的   评论回复
  AddComment, // 新增文章评论
  ReplyComment // 新增文章评论回复
}
