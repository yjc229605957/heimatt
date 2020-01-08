// 导入vue
import Vue from 'vue'
// 导入app根组件
import App from './App.vue'
// 导入路由
import router from './router/router'
// 导入仓库
import store from './store/store'
// 导入vant-ui
import Vant, { Lazyload } from 'vant'
// 导入vant.css
import 'vant/lib/index.css'
// 导入字体图标icon
import './style/iconfont.css'
// 导入全局时间过滤器
import './filter/timeFilter'
// 导入全局验证登陆方法
import Mychecke from './utils/checklogin'

// 在vue上注册插件
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Mychecke)

// 阻止启动生产消息
Vue.config.productionTip = false

// 全局验证登陆方法
Vue.prototype.$check = function () {
  let user = store.state.user
  if (user.token) {
    return true
  } else {
    return false
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
