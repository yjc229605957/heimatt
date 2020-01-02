<template>
  <div class="myHome">
    <!-- 用户信息模块 -->
    <div class="userInfo">
      <!-- 已登录则显示用户信息 -->
      <div class="userBox" v-if="userToken">
        <!-- 用户头像 昵称等信息 -->
        <div class="userTitle">
          <div class="userTitle_left">
            <div class="userIcon">
              <!-- ../../../public/头像.jpg -->
              <img :src="userInfo.photo" height="80px" />
            </div>
            <div class="username">
              <p>{{userInfo.name}}</p>
              <van-button round size="mini">申请认证</van-button>
            </div>
          </div>
          <!-- 今日阅读时间 -->
          <div class="readTime">
            <van-icon name="column" />
            <div class="readText">
              <span>今日阅读</span>
              <span>5分钟</span>
            </div>
          </div>
        </div>
        <!-- 用户动态 关注等数据 -->
        <div class="userData">
          <van-grid :column-num="3" :border="false">
            <van-grid-item>
              <template slot="text">
                <p>{{userInfo.art_count}}</p>
                <span>动态</span>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template slot="text">
                <p>{{userInfo.follow_count}}</p>
                <span>关注</span>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template slot="text">
                <p>{{userInfo.fans_count}}</p>
                <span>粉丝</span>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <!-- 未登录则显示登录按钮 -->
      <div v-else>
        <div class="loginBut">
          <van-icon name="user-circle-o" />
          <span>登录</span>
        </div>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="toolList">
      <van-grid :column-num="userToken ? 3 : 2">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="underway-o" text="历史" />
        <van-grid-item v-if="userToken" icon="records" text="作品" />
      </van-grid>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="实名认证" is-link />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { userInfo } from '../../api/user'
export default {
  name: 'my',
  data () {
    return {
      userToken: this.$store.state.user.token,
      userInfo: ''
    }
  },
  async created () {
    let res = await userInfo()
    this.userInfo = res.data.data
    window.console.log(res, this.userInfo)
  }
}
</script>

<style lang="less">
.myHome {
  // 用户信息模块
  .userInfo {
    height: 200px;
    background-color: #3f9dfa;
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    .userBox {
      width: 100%;
    }
    // 登录按钮
    .loginBut {
      width: 50px;
      height: 75px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      .van-icon {
        color: #fff;
        font-size: 50px;
      }
      span {
        font-family: '黑体';
        font-size: 16px;
        color: #fff;
      }
    }
    // 用户 头像等信息
    .userTitle {
      display: flex;
      align-items: center;
      margin-top: 30px;
      justify-content: space-between;
      .userTitle_left {
        display: flex;
        align-items: center;
      }
      // 头像
      .userIcon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 20px;
        border: 2px solid #fff;
      }
      // 昵称
      .username {
        p {
          font-size: 16px;
          margin: 5px 0;
        }
        button {
          width: 60px;
          font-size: 12px;
          height: 18px;
          line-height: 12px;
          color: #3f9dfa;
          font-weight: 700;
        }
      }
      // 阅读时间
      .readTime {
        display: flex;
        background-color: #3b82c9;
        border-radius: 50px 0 0 50px;
        height: 42px;
        width: 90px;
        align-items: center;
        font-size: 12px;
        .van-icon {
          font-size: 20px;
          margin: 0 7px;
        }
        .readText {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
    // 用户 动态等数据
    .userData {
      .van-grid-item__content {
        background-color: #3f9dfa;
        p {
          margin: 5px;
        }
      }
    }
  }
  // 工具栏
  .toolList {
    margin-bottom: 5px;
    .van-grid-item {
      span {
        font-size: 16px;
      }
      &:nth-child(1) {
        i {
          color: #eb595a;
        }
      }
      &:nth-child(2) {
        i {
          color: #ff9d1d;
        }
      }
      &:nth-child(3) {
        i {
          color: #678eff;
        }
      }
    }
  }
  // 单元格组
  .van-cell-group {
    margin-bottom: 5px;
  }
}
</style>
