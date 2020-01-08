<template>
  <div class="searchBar">
    <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#3e9df8"
        @input="search"
        @search="onSearch(value)"
      />
    </form>
    <!-- 联想区域 -->
    <van-cell-group v-if="value">
      <van-cell
        v-for="(item, index) in thinkList"
        :key="index"
        icon="search"
        @click="onSearch(item.old)"
      >
        <template slot="title">
          <span v-html="item.new"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <!-- 垃圾桶图标 -->
        <van-icon
          @click="removeKey"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in historyList"
        :key="index"
        :title="item"
        icon="search"
      >
        <!-- 删除图标 -->
        <van-icon
          @click.stop="delkey(index)"
          slot="right-icon"
          name="cross"
          style="line-height: inherit;"
      /></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入 搜索关键字联想 请求方法
import { searchSug } from '../../api/search'
// 导入 操作localStorage 方法
import { getlocal, setlocal } from '../../utils/local'
export default {
  name: 'search',
  data () {
    return {
      value: '', // 搜索框值
      thinkList: [], // 搜索关键字的联想
      timer: '', // 设置一个全局变量储存防抖计时器
      historyList: [] // 搜索历史列表
    }
  },
  methods: {
    // 搜索联想
    search () {
      // 去除搜索关键字的前后空格
      this.value = this.value.trim()
      // 设置一个计时器用来防止js抖动 每次触发事件时会覆盖上一次计时器 直到没有触发事件时计时器倒计时结束才会触发逻辑代码 发送请求
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.value !== '') {
          let res = await searchSug(this.value)
          window.console.log(res.data.data.options)
          let newArr = res.data.data.options.map(item => {
            return {
              new: item
                .split(this.value)
                .join(`<span style="color:red">${this.value}</span>`),
              old: item
            }
          })
          window.console.log(newArr)
          this.thinkList = newArr
        }
      }, 300)
      if (!this.value) {
        this.thinkList = []
      }
    },
    // 搜索事件
    onSearch (key) {
      // 将本次搜索的关键字储存到历史列表
      this.historyList.unshift(key)
      this.historyList = [...new Set(this.historyList)]
      // 然后在将历史列表储存到本地local中
      setlocal('history', this.historyList)
      // 再通过路由转跳到搜索结果页面并把关键字传过去
      this.$router.push(`/searchRes/${key}`)
    },
    // 删除搜索历史关键字
    delkey (index) {
      // 先删除历史列表内的元素 在存到本地
      this.historyList.splice(index, 1)
      setlocal('history', this.historyList)
    },
    // 清空搜索历史记录
    removeKey () {
      // 弹框提示用户是否确定要删除
      this.$dialog.confirm({
        title: '操作提示',
        message: '是否清空搜索历史记录?'
      })
        .then(() => {
          // 确定删除 清空历史列表 再储存到本地
          this.historyList = []
          setlocal('history', this.historyList)
        })
    }
  },
  created () {
    // 在localstorage中获取搜索历史并赋值给历史列表
    this.historyList = getlocal('history') || []
  }
}
</script>

<style lang="less" scoped>
.searchBar {
  // 搜索框
  .van-search__content {
    border-radius: 34px;
  }
  // 取消按钮点击时的背景色
  .van-search__action:active {
    background-color: #3e9df8;
  }
  // 取消按钮文字样式
  .van-search__action {
    color: #fff;
  }
}
</style>
