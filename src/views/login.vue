<template>
  <div class="login_Box">
    <!-- 头部导航 -->
    <van-nav-bar class="login_nav" title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="loginData.mobile"
        placeholder="请输入手机号"
        :error-message="err_msg_mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-shouji1"></i>
        </template>
      </van-field>
      <van-field
        v-model="loginData.code"
        placeholder="请输入验证码"
        left-icon="phone-circle-o"
        :error-message="err_msg_code"
      >
        <template slot="left-icon">
          <i class="iconfont icon-lock"></i>
        </template>
        <van-button
          class="codeBut"
          slot="button"
          round
          size="small"
          color="#ededed"
          >获取验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="loginBut">
      <van-button
        :loading="loginLoading"
        type="info"
        size="large"
        @click="loginBut"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { userLogin } from '../api/user'
export default {
  data () {
    return {
      loginData: {
        mobile: '13811111111',
        code: '246810'
      },
      // 手机号错误提示
      err_msg_mobile: '',
      // 验证码错误提示
      err_msg_code: '',
      // 登录加载状态
      loginLoading: false
    }
  },
  methods: {
    // 点击按钮发送登录请求

    loginBut () {
      // 判断yanzen方法返回数值是否为false false则return true则继续执行
      if (this.yanzen()) {
        return
      }
      // 将登录状态改为true
      this.loginLoading = true
      window.setTimeout(async () => {
        try {
          // 传入参数发送登录请求
          let res = await userLogin(this.loginData)
          window.console.log(res)
          if (res.status === 201) {
            // 提示登录成功
            this.$toast('登录成功')
            // 将服务器返回的token存入localstorage中
            this.$store.commit('setUser', res.data.data)
            // 转跳至home页
            this.$router.push('/home')
          }
        } catch {
          this.$toast.fail('登录失败')
        }
        // 将登录状态改为false
        this.loginLoading = false
      }, 500)
    },
    yanzen () {
      // 声明一个数组判断两个输入框的值是否正确 正确才发送登录请求
      let arr = []
      // 验证手机号正则
      let zz = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      // 判断手机号
      if (zz.test(this.loginData.mobile)) {
        arr.push(true)
        this.err_msg_mobile = ''
      } else {
        this.err_msg_mobile = '手机格式不正确'
        arr.push(false)
      }
      // 判断验证码
      if (this.loginData.code.length === 6) {
        arr.push(true)
        this.err_msg_code = ''
      } else {
        this.err_msg_code = '验证码错误'
        arr.push(false)
      }
      // 判断数组内的值为true则发送登录请求
      return arr.includes(false)
    }
  }
}
</script>

<style lang="less">
// 给html,body高度 背景色
html,
body {
  height: 100%;
  background-color: #f5f7f9;
}
// 登录页面盒子
.login_Box {
  // 顶部标题样式
  .login_nav.van-nav-bar {
    background-color: #3e9df8;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  //登录按钮样式
  .loginBut {
    margin: 30px 15px;
    border-radius: 8px;
    overflow: hidden;
  }
  //验证码按钮样式
  .van-field__button {
    border-left: 1px solid #eee;
    .codeBut {
      span {
        color: #666666;
        font-size: 14px;
      }
    }
  }
  //输入框缩进
  .van-field__control {
    text-indent: 10px;
  }
  //字体图标样式
  .icon-shouji1 {
    font-size: 20px;
    color: #666;
    line-height: 26px;
  }
  .icon-lock {
    font-size: 20px;
    line-height: 30px;
    color: #666;
  }
}
</style>
