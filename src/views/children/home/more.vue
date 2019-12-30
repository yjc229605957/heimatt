<template>
  <div class="moreBox">
    <van-dialog :value="value" :show-confirm-button="false">
      <template slot="title">
        <!-- 正常三个选项 -->
        <van-cell-group v-if="switchTab === 0">
          <van-cell @click="$emit('input', false)" icon="cross" />
          <van-cell @click="dislikes" title="不感兴趣" icon="failure" />
          <van-cell
            @click="switchTab = 1"
            title="反馈垃圾内容"
            icon="warning-o"
          >
            <template slot="right-icon">
              <van-icon name="arrow" />
            </template>
          </van-cell>
          <van-cell @click="blacklists" title="拉黑作者" icon="delete" />
          <!-- <van-cell @click="Cancelblacklists" title="取消拉黑" icon="delete" /> -->
        </van-cell-group>
        <!-- 举报文章选项 -->
        <van-cell-group v-else>
          <van-cell @click="switchTab = 0" icon="arrow-left" />
          <van-cell
            @click="reports(item)"
            v-for="(item, index) in reportsType"
            :key="index"
            :title="item.text"
          />
        </van-cell-group>
        {{ articleId }}
      </template>
    </van-dialog>
  </div>
</template>

<script>
// 导入操作文章方法 拉黑文章
import { articleDisLike, articleReports } from '../../../api/article'
// 导入操作用户方法 拉黑文章作者
import { userBlacklists } from '../../../api/user' // userBlacklists,userBlacklistsCancel
export default {
  name: 'more',
  // 接收父组件传值 显示关闭窗口 文章id
  props: ['value', 'articleId', 'autName'],
  data () {
    return {
      // 切换 正常选项/举报文章选项
      switchTab: 0,
      // 举报文章的类型列表
      reportsType: [
        { id: 0, text: '其他问题' },
        { id: 1, text: '标题夸张' },
        { id: 2, text: '低俗色情' },
        { id: 3, text: '错别字多' },
        { id: 4, text: '旧闻重复' },
        { id: 5, text: '广告软文' },
        { id: 6, text: '内容不实' },
        { id: 7, text: '涉嫌违法犯罪' },
        { id: 8, text: '侵权' }
      ]
    }
  },
  methods: {
    // 文章不感兴趣
    async dislikes () {
      // 传值都父组件关闭更多选项窗口
      this.$emit('input', false)
      // 发送请求给服务器对文章不喜欢
      await articleDisLike(this.articleId)
      // 传值给父组件激活删除文章方法
      this.$emit('removeArt')
    },
    // 举报垃圾文章
    async reports (item) {
      window.console.log(item)
      try {
        await articleReports(this.articleId, item.id)
        this.$toast.success('举报提交成功')
      } catch {
        this.$toast.fail('此文章已举报')
      }
      this.$emit('input', false)
      this.switchTab = 0
    },
    // 拉黑作者
    async blacklists () {
      try {
        await userBlacklists(this.autName)
        this.$toast.success('成功拉黑该作者')
      } catch {
        this.$toast.fail('已拉黑,不能重复拉黑')
      }
      this.$emit('input', false)
      this.switchTab = 0
      this.$emit('onLoad')
    }
    // // 取消拉黑作者
    // async Cancelblacklists () {
    //   try {
    //     await userBlacklistsCancel(1)
    //     this.$toast.success('成功拉黑该作者')
    //   } catch {
    //     this.$toast.fail('已拉黑,不能重复拉黑')
    //   }
    //   this.$emit('input', false)
    //   this.switchTab = 0
    //   this.$emit('onLoad')
    // }
  }
}
</script>

<style lang="less">
.moreBox {
  .van-dialog {
    .van-dialog__header {
      padding: 0;
      .van-cell {
        &:nth-child(3) {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
