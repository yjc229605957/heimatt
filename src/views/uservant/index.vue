<template>
  <div>
    <h3>使用vent</h3>
    <h4>使用按钮</h4>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h4>使用单元格</h4>
    <van-cell value="1" label="138211111111">
      <template slot='title'>
        <van-icon name="phone-o" />
        输入手机号
        <van-icon name="phone-o" />
      </template>
    </van-cell>
    <h4>使用icon图标</h4>
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="2rem" />
    <van-icon name="chat-o" color="skyblue" size="2rem" />
    <van-icon name="like-o" color="red" size="2rem" />
    <van-icon name="star-o" color="gold" size="2rem" />
    <van-icon name="fire-o" color="red" size="2rem" />
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
