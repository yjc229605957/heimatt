<template>
  <div class="searchResult">
    <!-- 顶部导航 -->
    <van-nav-bar class="top_nav" title="搜索结果">
      <van-icon @click="$router.back()" name="arrow-left" slot="left" />
    </van-nav-bar>
    <!-- 搜索结果文章列表 -->
    <van-list
      class="articleList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 文章内容 -->
      <van-cell
        class="article"
        v-for="(item, index) in searchList"
        :key="index"
        :title="item.title"
        @click="$router.push(`/detail/${item.art_id}`)"
      >
        <div>
          <!-- 文章浏览图 -->
          <van-grid v-if="item.cover.type > 0" :border="false" :column-num="3">
            <van-grid-item
              v-for="(imgitem, imgindex) in item.cover.images"
              :key="imgindex"
            >
              <van-image lazy-load :src="imgitem" />
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 文章信息 -->
        <div class="other">
          <span>
            <!-- 作者 -->
            <span>{{ item.aut_name }}</span>
            <!-- 评论 -->
            <span>{{ item.comm_count }}评论</span>
            <!-- 使用Vue全局过滤器过滤时间 -->
            <span>{{ item.pubdate | timefilter }}</span>
          </span>
        </div>
        <!-- 文章下方 点赞 收藏等工具 -->
        <van-grid :column-num="3">
          <van-grid-item @click="addComment" icon="comment-o" text="评论" />
          <van-grid-item
            v-if="item.iconLike === 'like-o'"
            @click="addLike(item)"
            :icon="item.iconLike"
            text="点赞"
            type="danger"
          />
          <van-grid-item
            v-else
            @click="addLike(item)"
            :icon="item.iconLike"
            text="已点赞"
            class="red"
          />
          <van-grid-item @click="addShare" icon="share" text="分享" />
        </van-grid>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { searchRes } from '../../../api/search'
export default {
  name: 'searchRes',
  data () {
    return {
      key: '',
      page: 0,
      perPage: 10,
      searchList: [],
      finished: false,
      loading: false
    }
  },
  methods: {
    // 文章列表加载事件
    async onLoad () {
      this.page++
      let res = await searchRes({
        page: this.page,
        perPage: this.perPage,
        q: this.key
      })
      window.console.log(res)
      this.searchList = [...this.searchList, ...res.data.data.results]
      this.searchList.forEach(item => {
        this.$set(item, 'iconLike', 'like-o')
      })
      this.loading = false
      if (res.data.data.results.length <= 0) {
        this.finished = true
      }
    },
    // 点击评论按钮
    addComment (item) {
      // 判断用户是否登录
      let user = this.$store.state.user
      window.console.log(user)
      if (user.token) {
        // 已登录
        window.console.log('评论了')
      } else {
        // 未登录 询问用户是否前往登陆页面
        this.$dialog
          .confirm({
            title: '操作提示',
            message: '需要登陆才可以评论哦!',
            // 修改确定按钮文本
            confirmButtonText: '登陆'
          })
          .then(() => {
            // 确定登陆
            this.$router.push('/checklogin')
          })
      }
    },
    // 点击点赞按钮
    addLike (item) {
      // 判断用户是否登录
      // 使用全局验证登陆方法 验证用户是否登录
      if (this.$check() === true) {
        // 已登录
        window.console.log('点赞了')
        item.iconLike = 'like'
      } else {
        // 未登录 询问用户是否前往登陆页面
        this.$dialog
          .confirm({
            title: '操作提示',
            message: '需要登陆才可以点赞哦!',
            // 修改确定按钮文本
            confirmButtonText: '登陆'
          })
          .then(() => {
            // 确定登陆
            this.$router.push('/checklogin')
          })
      }
    },
    // 点击分享按钮
    addShare (item) {
      if (this.$check() === true) {
        window.console.log('分享了')
      } else {
        // 未登录 询问用户是否前往登陆页面
        this.$dialog
          .confirm({
            title: '操作提示',
            message: '需要登陆才可以分享哦!',
            // 修改确定按钮文本
            confirmButtonText: '登陆'
          })
          .then(() => {
            // 确定登陆
            this.$router.push('/checklogin')
          })
      }
    }
  },
  created () {
    this.key = this.$route.params.key
    window.console.log(this.key)
  }
}
</script>

<style lang="less" scoped>
.searchResult {
  .top_nav {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #3e9df8;
    .van-nav-bar__left .van-icon,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .articleList {
    margin-top: 46px;
    margin-bottom: 50px;
    // 每篇文章
    .article {
      display: block;
      // 文章标题
      .van-cell__title {
        width: 100%;
        font-size: 18px;
        margin-bottom: 10px;
      }
      .van-grid-item__content {
        padding: 10px 7px;
      }
      .van-image {
        display: inline-block;
      }
      img {
        width: 100px;
        height: 57px;
      }
      // 文章信息
      .other {
        width: 100%;
        display: flex;
        align-items: center;
        color: #bdbdbd;
        position: relative;
        justify-content: space-between;
        span {
          margin-right: 20px;
          font-size: 12px;
        }
      }
      // 文章下方工具栏
      .van-grid-item__content {
        flex-direction: row;
        .van-icon {
          font-size: 18px;
        }
        .van-grid-item__text {
          margin: 0 5px;
          line-height: 24px;
        }
      }
      // 点赞背景色
      .red {
        color: red;
      }
    }
  }
}
</style>
