<template>
  <div class="addComInput">
    <van-search
      v-model="value"
      :placeholder="reply === 1 ? '写回复' : '写评论'"
      show-action
      shape="round"
      @search="AddCom"
    >
      <template slot="left-icon">
        <van-icon name="edit" />
      </template>
      <div slot="action" @click="AddCom">发表</div>
    </van-search>
  </div>
</template>

<script>
import { AddComment, ReplyComment } from '../../../api/article'
import bus from '../../../utils/bus'
export default {
  props: ['reply', 'comID'],
  name: 'addComInput',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 新增评论
    async AddCom () {
      if (this.reply !== 1) {
        // 写评论
        if (!this.value) {
          return
        }
        let res = await AddComment({
          artId: this.$route.params.id,
          content: this.value,
          writeArtId: null
        })
        window.console.log(res)
        window.console.log(res.data.data.new_obj)
        bus.$emit('addcom', res.data.data.new_obj)
        bus.$emit('addcom')
        this.value = ''
      } else {
        // 写回复
        if (!this.value) {
          return
        }
        let res = await ReplyComment({
          comId: this.comID,
          content: this.value,
          writeArtId: this.$route.params.id
        })
        window.console.log(res)
        window.console.log(res.data.data.new_obj)
        this.$emit('replycom', res.data.data.new_obj)
        bus.$emit('addcom')
        this.value = ''
      }
    }
  }
}
</script>

<style></style>
