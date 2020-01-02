<template>
  <div>
    <router-view></router-view>
    <van-tabbar route v-model="$router.path">
      <van-tabbar-item to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/layout/video" icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/layout/myHome" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style></style>
