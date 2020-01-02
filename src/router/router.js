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
// 导入我的 页面组件
import my from '../views/children/my.vue'
// 导入搜索 页面组件
import search from '../views/children/search.vue'
// 导入搜索结果 页面组件
import searchRes from '../views/children/search/searchResult.vue'
// 导入视频 页面组件
import video from '../views/children/video.vue'
// 在vue上注册
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/',
    // 路由重定向=>home页
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    component: layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: home
      },
      {
        path: 'myHome',
        component: my
      },
      {
        path: 'search',
        component: search
      },
      {
        path: 'video',
        component: video
      }
    ]
  },
  {
    path: '/searchRes/:key',
    component: searchRes
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
