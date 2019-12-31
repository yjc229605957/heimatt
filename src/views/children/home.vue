<template>
  <div class="home_Box">
    <!-- 头部导航 -->
    <van-nav-bar class="head_nav" title="首页">
      <van-icon class="searchBar" name="search" slot="right" />
    </van-nav-bar>
    <!-- 标签页 -->
    <!-- v-model绑定频道的下标   animated:切换动画 -->
    <van-tabs class="channelBox" v-model="channelIndex" animated>
      <!-- 频道列表 -->
      <van-tab
        v-for="(item, index) in channelList"
        :key="index"
        :title="item.name"
      >
        <!-- 添加下拉刷新组件 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 文章列表 -->
          <!-- loading:加载状态    finished:没有更多提示  onLoad:加载时的函数 -->
          <van-list
            class="articleList"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 文章内容 -->
            <van-cell
              class="article"
              v-for="(item, index) in item.list"
              :key="index"
              :title="item.title"
            >
              <div>
                <!-- 文章浏览图 -->
                <van-grid
                  v-if="item.cover.type > 0"
                  :border="false"
                  :column-num="3"
                >
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
                <!-- 更多选项按钮 -->
                <van-icon @click="showMore(item, index)" name="ellipsis" />
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 频道菜单 -->
    <div class="channeMenu">
      <van-icon name="wap-nav" @click="show = true"></van-icon>
    </div>
    <!-- 频道菜单组件 -->
    <!-- :value='show' @input="show=$event" 等同于 v-model='show' 是v-model在组件中的底层原理-->
    <!--
      父传子:value='show' 父组件通过v-bind绑定属性传递 子组件使用props接收
      子传父@input="show=$event" 子组件通过v-on绑定事件传递 父组件使用事件接收
    -->
    <!-- <popup ref="popup" :value='show' @input="show=$event"></popup> -->
    <!-- <popup ref="popup" v-model="show" :channelList="channelList" :channelIndex='channelIndex' @update:channelIndex="channelIndex=$event"></popup> -->
    <popup
      ref="popup"
      v-model="show"
      :channelList="channelList"
      :channelIndex.sync="channelIndex"
    ></popup>
    <!-- 更多选项组件 -->
    <!-- articleId:文章id  articleIndex:文章下标  removeArt:删除文章  autName:作者id -->
    <more
      v-model="moreShow"
      :articleId="articleId"
      :articleIndex="articleIndex"
      @removeArt="removeArt"
      :autName="autName"
      @onLoad="onRefresh"
    ></more>
    <!-- <more :value='moreShow' @input="moreShow=$evnet" ></more> -->
  </div>
</template>

<script>
// 导入获取频道列表方法
import { channelsList } from '../../api/channels'
// 导入获取文章列表方法
import { articleList } from '../../api/article'
// 导入弹出层组件 频道管理
import popup from '../children/home/popup'
// 导入弹出框组件 更多选项
import more from '../children/home/more'
// 导入获取local方法
import { getLocal } from '../../../../day03/4-code/heimatt/src/utils/mylocal'

export default {
  name: 'home',
  // 注册子组件
  components: {
    popup,
    more
  },
  data () {
    return {
      // 频道列表
      channelList: [],
      // 频道激活项下标
      channelIndex: 0,
      // 控制频道弹出层显示隐藏
      show: false,
      // 控制更多选项弹出层显示隐藏
      moreShow: false,
      // 选择文章
      articleId: 0,
      // 选择文章的下标
      articleIndex: 0,
      // 选择文章的作者
      autName: ''
    }
  },
  methods: {
    // list组件加载事件 被加载时会触发
    async onLoad (Refresh) {
      Refresh = Refresh || 0
      // 获取当前频道
      let currentPage = this.channelList[this.channelIndex]
      // 获取当前频道id
      let id = currentPage.id
      // 发送获取文章列表请求
      let res = await articleList({
        channelId: id,
        timestamp: Date.now()
      })
      window.console.log(res)
      // 判断频道的文章列表已经全部获取完(没有文章)时 将finished设置为true 这样就不会一直在加载中
      if (res.data.data.results.length === 0) {
        currentPage.finished = true
      }
      // 将获取的数据追加进list中
      // 判断是0上拉加载数据 还是1下拉更新数据
      if (Refresh === 0) {
        currentPage.list = [...currentPage.list, ...res.data.data.results]
      } else {
        currentPage.list = res.data.data.results
      }
      // 然后手动设置loading状态为false
      currentPage.loading = false
    },
    // 下拉刷新时触发
    onRefresh () {
      // 获取当前频道
      let currentPage = this.channelList[this.channelIndex]
      currentPage.loading = false
      currentPage.finished = false
      window.setTimeout(() => {
        this.onLoad(1)
        currentPage.isLoading = false
      }, 500)
    },
    // 点击打开更多选项窗口
    showMore (item, index) {
      window.console.log(item)
      this.moreShow = true
      this.articleId = item.art_id
      this.articleIndex = index
      this.autName = item.aut_id
    },
    removeArt () {
      this.channelList[this.channelIndex].list.splice(this.articleIndex, 1)
    }
  },
  async created () {
    // 判断用户是否登录
    let user = this.$store.state.user
    try {
      if (user.token) {
        // 登录就直接去服务器获取频道数据, 并保存到data
        let res = await channelsList()
        this.channelList = res.data.data.channels
      } else {
        // 没有登录就判断本地是否储存了频道数据
        let channels = getLocal('channels')
        if (channels) {
          // 有就直接使用本地数据, 保存到data
          this.channelList = channels
        } else {
          // 没有则从服务器获取默认频道数据, 并保存到data
          let res = await channelsList()
          this.channelList = res.data.data.channels
        }
      }
    } catch {
      this.$toast.fail('出错啦')
    }
    // 使用循环动态添加额外的属性
    this.channelList.forEach(item => {
      // 每个频道的list组件的加载状态
      this.$set(item, 'loading', false)
      // 每个频道的list组件的完毕状态
      this.$set(item, 'finished', false)
      // 每个频道的pullrefresh组件的下拉状态
      this.$set(item, 'isLoading', false)
      // 每个频道的文章数据源
      this.$set(item, 'list', [])
    })
  }
}
</script>

<style lang="less">
.home_Box {
  // 头部导航
  .head_nav {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #3194ff;
    //导航标题文字
    .van-nav-bar__title {
      color: #fff;
    }
    // 搜索按钮
    .searchBar {
      color: #fff;
      font-size: 20px;
    }
  }
  //频道盒子
  .channelBox {
    // 频道列表盒子
    .van-tabs__wrap {
      width: 90%;
      position: fixed;
      z-index: 999;
      margin-top: 46px;
      .van-tab__text {
        font-size: 15px;
      }
    }
    //文章列表
    .articleList {
      margin-top: 90px;
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
          padding: 16px 7px;
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
      }
    }
  }
  // 频道菜单
  .channeMenu {
    position: fixed;
    z-index: 999;
    top: 46px;
    right: 0;
    height: 44px;
    width: 10%;
    text-align: center;
    background-color: #fff;
    i {
      line-height: 44px;
      font-size: 30px;
    }
  }
}
</style>
