import Vue from 'vue'
import Vuex from 'vuex'

// 导入操作localstorage方法
import {
  getlocal,
  setlocal
} from '../utils/local'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义一个变量用来保存用户信息
    // 每次打开页面时, 需要从localstorage中获取用户信息
    user: getlocal('userInfo') || {}
  },
  mutations: {
    // 定义一个方法给 user 赋值
    setUser (state, payload) {
      state.user = payload
      setlocal('userInfo', payload)
    }
  }
})
