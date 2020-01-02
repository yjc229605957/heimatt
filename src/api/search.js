// 封装所有search 的请求

// 导入axios
import instance from '../utils/http'

// 搜索联想自动补全请求方法
function searchSug (q) {
  return instance({
    url: `/suggestion?q=${q}`,
    method: 'get'
  })
}
// 搜索结果请求方法
function searchRes ({ page, perPage, q }) {
  return instance({
    url: `/search?page=${page}&per_page=${perPage}&q=${q}`,
    method: 'get'
  })
}

export { searchSug, searchRes }
