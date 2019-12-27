// 导入vue
import Vue from 'vue'
// 导入app根组件
import App from './App.vue'
// 导入路由
import router from './router/router'
// 导入仓库
import store from './store/store'
// 导入vant-ui
import Vant from 'vant'
// 导入vant.css
import 'vant/lib/index.css'
// 导入字体图标icon
import './style/iconfont.css'
// 在vue上注册
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
