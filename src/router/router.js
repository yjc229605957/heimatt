// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入登录组件
import login from '../views/login.vue'
// 导入layout组件
import layout from '../views/layout.vue'
// 导入首页组件
import home from '../views/children/home.vue'
// 在vue上注册
Vue.use(VueRouter)
// 路由规则
const routes = [{
  path: '/',
  // 路由重定向=>home页
  redirect: '/layout'
},
{
  path: '/layout',
  component: layout,
  children: [{
    path: 'home',
    component: home
  }]
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
