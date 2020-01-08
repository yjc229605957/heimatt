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
// 导入修改个人信息 页面组件
import checkUserInfo from '../views/children/user/checkUserInfo.vue'
// 导入搜索 页面组件
import search from '../views/children/search.vue'
// 导入搜索结果 页面组件
import searchRes from '../views/children/search/searchResult.vue'
// 导入视频 页面组件
import video from '../views/children/video.vue'
// 导入文章详情 页面组件
import detail from '../views/children/detail'
// 导入文章详情 页面组件
import AiRobot from '../views/children/AiRobot'
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
        // 首页
        path: 'home',
        component: home
      },
      {
        // 我的页面
        path: 'myHome',
        component: my
      },
      {
        // 搜索页面
        path: 'search',
        component: search
      },
      {
        // 视频页面
        path: 'video',
        component: video
      }
    ]
  },
  {
    // 搜索结果页面
    path: '/searchRes/:key',
    component: searchRes
  },
  {
    // 正常登陆页面
    path: '/login',
    component: login
  },
  {
    // 验证登陆页面
    path: '/checklogin',
    component: login
  },
  {
    // 文章详情页面
    path: '/detail/:id',
    component: detail
  },
  {
    // 修改个人信息页面
    path: '/checkUserInfo',
    component: checkUserInfo
  },
  {
    // 小智同学页面
    path: '/Ai',
    component: AiRobot
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})

// router.beforeRouteEnter((to, from, next) => {
//   next()
//   Vue.use(
//     new VueSocketIO({
//       debug: true,
//       connection: SocketIO('http://127.0.0.1:3000/')
//     })
//   )
// })

// 暴露路由对象
export default router
