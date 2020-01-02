<template>
  <div class="searchResult">
    <van-nav-bar class="login_nav" title="搜索结果">
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
          <van-grid-item icon="comment-o" text="评论" />
          <van-grid-item
            v-if="item.iconLike === 'like-o'"
            @click="item.iconLike = 'like'"
            :icon="item.iconLike"
            text="点赞"
          />
          <van-grid-item
            v-else
            @click="item.iconLike = 'like-o'"
            :icon="item.iconLike"
            text="点赞"
          />
          <van-grid-item icon="share" text="分享" />
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
    }
  },
  created () {
    this.key = this.$route.params.key
    window.console.log(this.key)
  }
}
</script>

<style lang="less">
.searchResult {
  .login_nav {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #3e9df8;
    .van-nav-bar__left .van-icon {
      color: #fff;
    }
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
    }
  }
}
</style>
