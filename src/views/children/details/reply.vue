<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '75%' }"
  >
    <div class="commentBox">
      <div class="userInfo">
        <div class="left">
          <div class="pic">
            <img :src="comData.aut_photo" alt="" />
          </div>
          <div class="text">
            <span>{{ comData.aut_name }}</span>
            <span>{{ comData.pubdate | timefilter }}</span>
          </div>
        </div>
        <!-- 点赞模块 -->
        <div class="right">
          <van-icon
            v-if="comData.is_liking"
            name="good-job"
            color="#ff4444"
            size="20"
          />
          <van-icon v-else name="good-job-o" color="#ccc" size="20" />
          {{ comData.like_count }}
        </div>
      </div>
      <div class="content">
        {{ comData.content }}
      </div>
    </div>
    <div class="titleText">
      当前评论的回复
    </div>
    <!-- 回复评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(item, index) in ReplyComList"
        :key="index"
        class="replyComment"
      >
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
      </div>
    </van-list>
    <!-- 回复输入框 -->
    <addCominput
      :reply="reply"
      :comID="comData.com_id"
      @replycom="replycom($event)"
    ></addCominput>
  </van-popup>
</template>

<script>
import bus from '../../../utils/bus'
import addCominput from './addCominput'
import { getReplyComment } from '../../../api/article'
export default {
  name: 'reply',
  components: {
    addCominput
  },
  props: ['value'], // 控制显示隐藏
  data () {
    return {
      // reply
      reply: 1,
      // 源评论
      comData: {},
      // 源评论的回复列表
      ReplyComList: [],
      // 回复的评论的id 用于获取下一页
      last_id: null,
      // 回复的评论的结束id
      end_id: null,
      // 是否加载完毕状态
      finished: false,
      // 加载状态
      loading: false
    }
  },
  methods: {
    async onLoad () {
      // 获取该评论的回复
      let res = await getReplyComment({
        comId: this.comData.com_id,
        offset: this.last_id
      })
      this.ReplyComList = [...this.ReplyComList, ...res.data.data.results]
      this.last_id = res.data.data.last_id
      this.end_id = res.data.data.end_id
      if (this.last_id === this.end_id) {
        // 说明已加载完成
        this.finished = true
      }
      // 手动设置加载状态为false
      this.loading = false
    },
    // 回复评论后将新回复unshift到列表最前面
    replycom (value) {
      this.ReplyComList.unshift(value)
    }
  },
  created () {
    // 从bus中获取当前的源评论
    bus.$on('passdata', value => {
      window.console.log(value)
      if (value) {
        this.comData = value
        this.ReplyComList = []
        this.loading = false
        this.finished = false
        this.offset = null
        this.end_id = 0
      }
    })
  }
}
</script>

<style lang="less">
.commentBox,
.replyComment {
  padding: 13px 10px;
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
.titleText {
  padding: 10px;
  border-bottom: 1px solid #cccccc30;
}
</style>
