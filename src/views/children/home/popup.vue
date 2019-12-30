<template>
  <!-- 弹出层 -->
  <!-- 单向数据流只能在父组件中改变值 -->
  <!-- 所以需要在往父组件传递show的值 -->
  <!--
    @input="$emit('input', $event)"
    @input接收了子组件的值后在通过input事件往父组件传值$emit('input', $event)
    $emit('input') = 绑定父组件input事件
    $event = 子组件的值
  -->
  <van-popup
    class="pop_box"
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '85%' }"
  >
    <van-grid>
      <!-- 顶部关闭图标单元格 -->
      <van-cell>
        <!-- 插槽将title改成X图标 -->
        <template solt="title">
          <van-icon @click="hid" name="cross" class="popicon" />
        </template>
      </van-cell>
    </van-grid>
    <!-- 我的频道标题单元格 -->
    <van-cell class="myChannels">
      <template slot="title">
        我的频道
      </template>
      <template slot="right-icon">
        <van-button
          v-if="iconShow === false"
          @click="iconShow = true"
          round
          plain
          type="primary"
          size="mini"
          color="#f85a5a"
          >编辑</van-button
        >
        <van-button
          v-else
          @click="iconShow = false"
          round
          plain
          type="primary"
          size="mini"
          color="#f85a5a"
          >完成</van-button
        >
      </template>
    </van-cell>
    <!-- 我的频道内容宫格 -->
    <van-grid :gutter="7" :column-num="5">
      <van-grid-item
        class="channel_grid"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <template slot="text">
          <span class="channelText">{{ item.name }}</span>
          <!-- 删除频道 -->
          <van-icon
            @click="removeChannel(index, item)"
            v-if="iconShow&&index!=0"
            class="channelIcon"
            name="clear"
          />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题单元格 -->
    <van-cell class="myChannels">
      <template slot="title">
        频道推荐
      </template>
    </van-cell>
    <!-- 频道推荐内容宫格 -->
    <van-grid :gutter="7" :column-num="5">
      <van-grid-item
        @click="addChannels(item, index)"
        class="channel_grid"
        v-for="(item, index) in filterChannels"
        :key="index"
      >
        <template slot="text">
          <span class="channelText">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
// 导入频道的请求方法 全部频道 新增频道
import { AllchannelsList, AddChannels } from '../../../api/channels.js'
// 导入操作localstorage方法
import { setlocal } from '../../../utils/local'
export default {
  name: 'popup',
  props: ['value', 'channelList'],
  data () {
    return {
      // 控制x图标显示隐藏
      iconShow: false,
      AllchannelsList: []
    }
  },
  methods: {
    // 点击x图标隐藏弹出层
    hid () {
      this.$emit('input', false)
    },
    // 新增频道
    async addChannels (item) {
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.$set(item, 'list', [])
      // 先给当前频道动态添加属性在push到列表中
      this.channelList.push(item)
      // 判断是否登录
      let user = this.$store.state.user
      if (user.token) {
        // 有则说明用户登录了
        let newArr = []
        this.channelList.slice(1).forEach((item, index) => {
          newArr.push({
            id: item.id,
            seq: index + 2
          })
        })
        window.console.log(newArr)
        await AddChannels(newArr)
      } else {
        setlocal('channels', this.channelList)
      }
    },
    // 删除频道
    async removeChannel (index) {
      this.channelList.splice(index, 1)
      // 判断是否登录
      let user = this.$store.state.user
      if (user.token) {
        let newArr = []
        this.channelList.slice(1).forEach((item, index) => {
          newArr.push({
            id: item.id,
            seq: index + 2
          })
        })
        await AddChannels(newArr)
      } else {
        setlocal('channels', this.channelList)
      }
    }
  },
  computed: {
    // 计算属性过滤出 全部频道中 不在 我的频道 的频道
    filterChannels () {
      // 获取我的频道的id
      let ids = this.channelList.map(item => {
        return item.id
      })
      // 在全部频道中使用filter方法遍历出 全部频道中 不包含在我的频道中的频道
      let newArr = this.AllchannelsList.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  },
  async created () {
    // 打开是就获取数据获取全部频道数据
    let res = await AllchannelsList()
    this.AllchannelsList = res.data.data.channels
    // 将全部频道的长度截短
    this.AllchannelsList.length = 22
  }
}
</script>

<style lang="less">
.pop_box {
  // 关闭图标
  .popicon {
    font-size: 26px;
  }
  // 我的频道标题单元格样式
  .myChannels {
    .van-cell__title {
      font-size: 16px;
    }
  }
  // 我的频道宫格
  .channel_grid {
    position: relative;
    // 小叉叉图标
    .channelIcon {
      z-index: 2;
      position: absolute;
      top: -3px;
      right: -3px;
      color: #f85a5a;
    }
    // 频道宫格文本
    .channelText {
      font-size: 12px;
    }
  }
  .van-cell:not(:last-child)::after {
    border: none;
  }
  .channel_grid [class*='van-hairline']::after {
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .van-grid{
    margin-bottom: 40px;
    &:nth-child(1){
      margin-bottom: 10px;
    }
  }
}
</style>
