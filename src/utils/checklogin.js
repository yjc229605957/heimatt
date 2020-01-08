// 封装一个验证登录的插件
// 导入仓库
import store from '../store/store'

let Mychecke = {}

Mychecke.install = function (Vue) {
  Vue.prototype.$check = function () {
    let user = store.state.user
    if (user.token) {
      return true
    } else {
      return false
    }
  }
}

export default Mychecke
