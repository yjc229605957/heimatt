// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入组件
import login from '../views/login.vue'
// 在vue上注册
Vue.use(VueRouter)
// 路由规则
const routes = [{
  path: '/',
  component: login
},
{
  path: '/login',
  component: login
}
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 暴露路由对象
export default router
