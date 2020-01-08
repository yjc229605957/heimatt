<template>
  <div class="detailsBox">
    <!-- 头部导航模块 -->
    <van-nav-bar fixed class="head_nav">
      <!-- 后退按钮 -->
      <van-icon @click="$router.back()" name="arrow-left" slot="left" />
      <!-- 更多按钮 -->
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <!-- 文章模块 -->
    <div class="articleDetails">
      <!-- 文章标题 -->
      <div class="title">
        <h3>{{ article.title }}</h3>
      </div>
      <!-- 作者信息 -->
      <div class="authorInfo">
        <div class="left">
          <div class="pic">
            <img :src="article.aut_photo" alt="" />
          </div>
          <div class="text">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.pubdate | timefilter }}</span>
          </div>
        </div>
        <div class="right">
          <van-button
            v-if="!article.is_followed"
            round
            type="info"
            icon="plus"
            size="small"
            @click="follow"
            >关注</van-button
          >
          <van-button @click="noFollow" v-else round type="primary" size="small"
            >已关注</van-button
          >
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="content" v-html="article.content"></div>
      <!-- 点赞/喜欢工具 -->
      <div class="operate">
        <van-button
          @click="art_like()"
          :plain="article.attitude !== 1 ? false : true"
          round
          type="danger"
          hairline
          icon="like"
          size="normal"
          >点赞</van-button
        >
        <van-button
          @click="art_dis()"
          plain
          round
          :type="article.attitude !== 0 ? 'default' : 'warning'"
          hairline
          icon="delete"
          size="normal"
          >不喜欢</van-button
        >
      </div>
    </div>
    <!-- 评论模块 -->
    <comment @showReply="showReply = $event" :artId="articleId"></comment>
    <!-- 新增评论模块 -->
    <addCominput></addCominput>
    <!-- 评论回复模块 -->
    <reply v-model="showReply"></reply>
    <!-- <reply :value ='showReply' @input = "showReply=$event"></reply> -->
  </div>
</template>

<script>
// 导入关注用户方法
import { userFollow, userNoFollow } from '../../api/user'
// 导入获取文章内容方法
import {
  articleContent,
  articleLike,
  articleNoLike,
  articleDis,
  articleNoDis
} from '../../api/article'
// 导入新增评论组件
import addCominput from './details/addCominput'
// 导入评论组件
import comment from './details/comment'
// 导入评论回复组件
import reply from './details/reply'
export default {
  name: 'detail',
  // 注册子组件
  components: { addCominput, comment, reply },
  data () {
    return {
      // 文章id
      articleId: '',
      // 文章内容
      article: {},
      // 显示回复评论窗口
      showReply: false
    }
  },
  methods: {
    // 点击关注用户
    async follow () {
      await userFollow(this.article.aut_id)
      this.article.is_followed = true
    },
    // 取消关注用户
    async noFollow () {
      await userNoFollow(this.article.aut_id)
      this.article.is_followed = false
    },
    // 对文章点赞
    async art_like () {
      let status = this.article.attitude
      if (status !== 1) {
        await articleLike(this.article.art_id)
        this.article.attitude = 1
      } else {
        await articleNoLike(this.article.art_id)
        this.article.attitude = -1
      }
    },
    // 对文章不喜欢
    async art_dis () {
      let status = this.article.attitude
      if (status !== 0) {
        await articleDis(this.article.art_id)
        this.article.attitude = 0
      } else {
        await articleNoDis(this.article.art_id)
        this.article.attitude = -1
      }
    }
  },
  async created () {
    // 获取文章id
    this.articleId = this.$route.params.id
    // 发送请求获取文章内容
    let res = await articleContent(this.articleId)
    window.console.log(res)
    // 文章内容保存
    this.article = res.data.data
  }
}
</script>

<style lang="less">
.detailsBox {
  font-family: -apple-system, BlinkMacSystemFont, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  // 头部导航模块
  .head_nav {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
      font-size: 22px;
    }
  }
  // 文章模块的样式
  .articleDetails {
    margin-top: 46px;
    padding: 0 15px;
    background-color: #fff;
    overflow: hidden;
    // 文章标题
    .title {
      font-size: 20px;
    }
    // 作者信息
    .authorInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .left {
        display: flex;
        align-items: center;
        .pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          img {
            height: 40px;
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          span {
            &:nth-child(2) {
              color: #c2c2c2;
            }
          }
        }
      }
      .right {
        button {
          width: 80px;
          height: 30px;
          .van-button__text {
            font-size: 14px;
          }
        }
      }
    }
    // 文章内容
    .content {
      font-family: 'STHeiti';
      img {
        width: 100%;
      }
    }
    // 点赞/不喜欢
    .operate {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      .van-button {
        width: auto;
        padding: 0 20px;
      }
    }
  }

  // 新增评论模块
  .addComInput {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .van-search {
      padding: 5px 10px;
    }
  }
}
</style>
