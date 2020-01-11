<template>
  <div class="AiRobot">
    <!-- 头部导航模块 -->
    <van-nav-bar fixed class="head_nav" title="小智同学">
      <!-- 后退按钮 -->
      <van-icon @click="$router.back()" name="arrow-left" slot="left" />
      <!-- 更多按钮 -->
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <!-- 信息列表模块 -->
    <div class="chatList">
      <div
        class="chat"
        :class="item.flag === 'user' ? 'person' : ''"
        v-for="(item, index) in chatArr"
        :key="index"
      >
        <div class="left">
          <img src="../../../public/timg.jpg" v-if="item.flag === 'robot'" />
          <img src="../../../public/头像.jpg" v-else />
        </div>
        <div class="right">
          <div class="text">
            {{ item.msg }}
          </div>
        </div>
      </div>
      <!-- <div class="chat person">
        <div class="left">
          <img src="../../../public/头像.jpg" alt="" />
        </div>
        <div class="right">
          <div class="text">
            那就不管这些傻逼了,我们现充进去杀敌吧
          </div>
        </div>
      </div> -->
    </div>
    <!-- 底部发送信息模块 -->
    <div class="addInput">
      <van-search
        v-model="value"
        show-action
        shape="round"
        @search="Addchat"
        background="#cccccc"
      >
        <template slot="left-icon">
          <van-icon name="edit" />
        </template>
        <div slot="action" @click="Addchat">发送</div>
      </van-search>
    </div>
  </div>
</template>

<script>
// socket.io插件
import io from 'socket.io-client'
export default {
  name: 'AiRobot',
  data () {
    return {
      // 输入框的值
      value: '',
      // 初始化socket对象
      socket: null,
      // 聊天内容列表
      chatArr: [
        {
          flag: 'robot',
          msg: '迪妮莎你回来啦(*^▽^*)!'
        }
      ]
    }
  },
  methods: {
    Addchat () {
      // 将输入框中的数据通过 socket 提交到服务器
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      this.chatArr.push({ flag: 'user', msg: this.value })
      // 把数据清空
      this.value = ''
      // 阻止其它行为
      return false
    }
  },
  created () {
    // 初始化socket对象连接服务器
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.user.token
      }
    })
    // 接收服务端的信息
    this.socket.on('message', data => {
      console.log(data)
      this.chatArr.push({ flag: 'robot', msg: data.msg })
      // this.$scoll
    })
  }
}
</script>

<style lang="less">
.AiRobot {
  .head_nav {
    background-color: #3194ff;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
      font-size: 22px;
    }
  }
  // 发送聊天
  .addInput {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .van-search {
      padding: 7px 0 7px 10px;
    }
  }
  // 聊天列表
  .chatList {
    position: fixed;
    left: 0;
    top: 46px;
    bottom: 48px;
    width: 100%;
    padding-top: 20px;
    overflow: auto;
    .chat {
      display: flex;
      align-items: center;
      margin: 0 10px 20px;
      .left {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 40px;
        }
      }
      .right {
        box-sizing: border-box;
        line-height: 22px;
        margin: 0 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        padding: 8px;
        max-width: 230px;
      }
    }
    .person {
      display: flex;
      flex-direction: row-reverse;
      .right {
        background-color: rgb(91, 240, 65);
      }
    }
  }
}
</style>
