import Vue from 'vue'
// 导入dayjs库
import dayjs from 'dayjs'
// 导入扩展插件（其实在 dayjs 中已经下载好了）
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
// 扩展这个插件
dayjs.extend(relativeTime)
// 使用中文语言包
dayjs.locale('zh-cn')
// 定义全局过滤器
Vue.filter('timefilter', function (str) {
  // str需要过滤的数据
  return dayjs().from(dayjs(str))
})
