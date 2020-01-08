<template>
  <div class="comment">
    <div class="commentTitle">
      <van-cell value="热门评论" />
    </div>
    <van-list
      class="commentList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="commentBox" v-for="(item, index) in commentList" :key="index">
        <div class="userInfo">
          <div class="left">
            <div class="pic">
              <img :src="item.aut_photo" alt="" />
            </div>
            <div class="text">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.pubdate | timefilter }}</span>
            </div>
          </div>
          <!-- 点赞模块 -->
          <div class="right">
            <van-icon
              v-if="item.is_liking"
              name="good-job"
              color="#ff4444"
              size="20"
            />
            <van-icon v-else name="good-job-o" color="#ccc" size="20" />
            {{ item.like_count }}
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="write">
          <van-button @click="showReply(item)" round size="mini"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getComment } from '../../../api/article'
// 导入 bus 对象
import bus from '../../../utils/bus'
export default {
  name: 'comment',
  props: ['artId'],
  data () {
    return {
      // 评论列表
      commentList: [],
      // 评论加载状态
      loading: false,
      // 评论是否加载完毕
      finished: false,
      // 评论id
      offset: null,
      // 结束的评论id
      endid: ''
    }
  },
  methods: {
    // 加载评论方法
    async onLoad () {
      // 发送请求
      let res = await getComment({
        artId: this.artId,
        offset: this.offset
      })
      // 手动修改加载状态
      this.loading = false
      // 评论结束id和评论页id
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      // 判断是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
      // 将评论追加到评论列表
      this.commentList = [...this.commentList, ...res.data.data.results]
    },
    // 控制评论回复框显示隐藏
    showReply (data) {
      // 将当前参数传入到 reply 中
      bus.$emit('passdata', data)
      // 将父组件中的 replyshow 改为 true
      this.$emit('showReply', true)
    }
  },
  created () {
    bus.$on('addcom', value => {
      if (value) {
        this.commentList.unshift(value)
      }
    })
  }
}
</script>

<style lang="less">
// 评论模块的样式
.comment {
  margin-top: 10px;
  background-color: #fff;
  padding: 0 15px;
  .commentTitle {
    .van-cell {
      padding: 20px 0 15px;
    }
    span {
      font-size: 20px;
    }
  }
  .commentList {
    margin-bottom: 44px;
    .commentBox {
      padding: 13px 0;
      border-bottom: 1px solid #cccccc30;
      .userInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .left {
          display: flex;
          align-items: center;
          .pic {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            img {
              height: 30px;
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
          display: flex;
          .van-icon {
            margin-right: 3px;
          }
        }
      }
      .content {
        padding-left: 40px;
        line-height: 20px;
        font-family: 'STHeiti';
        margin-bottom: 10px;
      }
      .write {
        padding-left: 40px;
      }
    }
  }
}
</style>
