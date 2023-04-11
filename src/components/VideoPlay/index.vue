<template>
  <videoPlay v-bind="options" :playsinline="true" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import videoPlay from 'vue3-video-play'
const props = defineProps(['url', 'title'])
const vedioSrc = props.url
const vedioTitle = props.title
const options = reactive({
  width: '100%', //播放器高度
  height: '100%', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  src: '', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.5, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ] //显示所有按钮,
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.video {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 992px) {
  .containervide {
    padding-top: 70px;
  }
}
</style>
