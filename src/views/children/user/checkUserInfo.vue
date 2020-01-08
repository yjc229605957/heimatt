<template>
  <div class="checkUser">
    <!-- 顶部导航 -->
    <van-nav-bar
      class="top_nav"
      title="个人信息"
      right-text="保存"
      @click-right="save"
    >
      <van-icon @click="$router.back()" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div>
      <!-- 头像/昵称/介绍 -->
      <van-cell-group class="userInfoUp">
        <van-cell @click="IconShow = true" title="头像" is-link>
          <template slot="default">
            <div class="userPic">
              <img :src="userInfo.photo" />
            </div>
          </template>
        </van-cell>
        <van-cell
          @click="nameShow = true"
          title="昵称"
          is-link
          :value="userInfo.name"
        />
        <van-cell
          @click="introShow = true"
          title="介绍"
          is-link
          :value="userInfo.intro"
        />
      </van-cell-group>
      <!-- 性别生日组 -->
      <van-cell-group class="userInfoCenter">
        <van-cell
          @click="genderShow = true"
          title="性别"
          is-link
          :value="userInfo.gender ? '女' : '男'"
        />
        <van-cell
          @click="dateShow = true"
          title="生日"
          is-link
          :value="userInfo.birthday ? userInfo.birthday : '未设置'"
        />
      </van-cell-group>
      <!-- 手机号组 -->
      <van-cell-group class="userInfoDown">
        <van-cell
          @click="phoneShow = true"
          title="手机号"
          is-link
          :value="userInfo.mobile"
        />
      </van-cell-group>
    </div>
    <!-- 修改信息弹出框等 -->
    <div class="checkInput">
      <!-- 头像选择框 -->
      <van-dialog
        class="icon"
        v-model="IconShow"
        @confirm="checkName"
        :show-confirm-button="false"
      >
        <template slot="title">
          <van-cell-group>
            <van-cell @click="selectIcon">
              <template slot="title">
                <van-uploader :after-read="changeIcon">
                  <div>从相册中选择</div>
                </van-uploader>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title"><div>拍照</div></template>
            </van-cell>
            <van-cell @click="IconShow = false">
              <template slot="title"><div>取消</div></template>
            </van-cell>
          </van-cell-group>
        </template>
      </van-dialog>
      <!-- 昵称输入框 -->
      <van-dialog
        v-model="nameShow"
        title="修改昵称"
        show-cancel-button
        @confirm="checkName"
      >
        <van-field required v-model="checkname" placeholder="请输入昵称" />
      </van-dialog>
      <!-- 介绍输入框 -->
      <van-dialog
        v-model="introShow"
        title="修改介绍"
        show-cancel-button
        @confirm="checkIntro"
      >
        <van-field
          type="textarea"
          autosize
          required
          v-model="checkintro"
          placeholder="请输入介绍"
        />
      </van-dialog>
      <!-- 性别选择框 -->
      <van-dialog
        v-model="genderShow"
        title="修改性别"
        show-cancel-button
        @confirm="checkGender"
      >
        <van-radio-group v-model="checkgender">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </van-dialog>
      <!-- 手机号输入框 -->
      <van-dialog
        v-model="phoneShow"
        title="修改手机号"
        show-cancel-button
        @confirm="checkPhone"
      >
        <van-field required v-model="checkphone" placeholder="请输入手机号" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
// 导入vue
import Vue from 'vue'
// 导入vant图片预览插件
import { ImagePreview } from 'vant'
// 导入获取用户个人信息方法
// 获取用户个人信息,获取用户自己信息,上传用户头像,编辑个人信息
import {
  userInfoProfile,
  userInfo,
  userUpIcon,
  userSetProfile
} from '../../../api/user'
// 注册图片预览插件
Vue.use(ImagePreview)
export default {
  name: 'checkUserInfo',
  data () {
    return {
      // 个人信息数据
      userInfo: {},
      // 个人简介
      intro: '',
      // 头像选择框显示/隐藏
      IconShow: false,
      // 昵称输入框显示/隐藏
      nameShow: false,
      checkname: '', // 输入框的值
      // 介绍输入框显示/隐藏
      introShow: false,
      checkintro: '',
      // 性别选择框显示/隐藏
      genderShow: false,
      checkgender: '', // 选择框的值
      // 手机号输入框显示/隐藏
      phoneShow: false,
      checkphone: '' // 输入框的值
    }
  },
  methods: {
    // 顶部保存个人信息按钮
    async save () {
      window.console.log(this.userInfo)
      let res = await userSetProfile(
        // name:
        this.userInfo
        // gender,
        // birthday,
        // intro
      )
      window.console.log(res)
    },
    // 选择头像
    selectIcon () {},
    // 确定头像
    changeIcon (file) {
      // 图片预览插件
      ImagePreview({
        images: [file.content],
        // 预览关闭的回调函数
        onClose: () => {
          this.$dialog
            .confirm({
              title: '修改头像',
              message: '是否将此图片设置为头像'
            })
            // 确定的回调函数
            .then(async () => {
              // 发送请求更新头像
              let res = await userUpIcon(file.file)
              // 将返回的图片地址重新赋值给头像
              this.userInfo.photo = res.data.data.photo
              // 手动隐藏头像选择框
              this.IconShow = false
            })
            // 取消的回调函数
            .catch(() => {
              // 点击取消手动隐藏头像选择框
              this.IconShow = false
            })
        }
      })
    },
    // 修改昵称确定按钮
    checkName () {
      this.userInfo.name = this.checkname
    },
    // 修改介绍确定按钮
    checkIntro () {
      this.userInfo.intro = this.checkintro
      this.intro = this.checkintro
    },
    // 修改性别确定按钮
    checkGender () {
      this.userInfo.gender = +this.checkgender
    },
    // 修改手机号确定按钮
    checkPhone () {
      this.userInfo.mobile = this.checkphone
    }
  },
  async created () {
    // 发送请求获取个人信息
    let res = await userInfoProfile()
    // 个人信息赋值
    this.userInfo = res.data.data
    // 将默认昵称赋值给修改输入框
    this.checkname = this.userInfo.name
    // 将默认性别赋值给修改输入框
    this.checkgender = '' + this.userInfo.gender
    // 将默认手机号赋值给修改输入框
    this.checkphone = '' + this.userInfo.mobile
    // 发送请求获取自己信息
    let res1 = await userInfo()
    this.$set(this.userInfo, 'intro', res1.data.data.intro)
    this.checkintro = this.userInfo.intro
  }
}
</script>

<style lang="less">
.checkUser {
  // 顶部导航
  .top_nav {
    background-color: #3e9df8;
    .van-nav-bar__left .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
    // 点击时
    .van-nav-bar__text:active {
      background-color: #3e9df8;
      color: #eee;
    }
  }
  .van-cell-group {
    margin-bottom: 10px;
  }
  // 用户头像
  .userPic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    float: right;
    img {
      height: 60px;
    }
  }
  // 昵称 介绍等输入框下边框
  .van-field__control {
    border-bottom: 1px solid #3e9df8;
  }
  // 性别选择框
  .van-radio-group {
    padding: 0 20px;
    .van-radio {
      margin-bottom: 10px;
    }
  }
  // 头像弹出框
  .icon {
    .van-dialog__header {
      padding: 0;
      .van-cell-group {
        margin: 0;
      }
    }
  }
}
</style>
