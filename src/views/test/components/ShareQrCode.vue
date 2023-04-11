<template>
  <van-overlay z-index="999" :show="props.show">
    <div class="wrapper" @click.stop>
      <div class="wrapper-title">朋友通过你的二维码或链接进入即可观看五部视频</div>
      <qrcode-vue :value="qrCode" :size="200" level="H"></qrcode-vue>
      <div class="qrCode-text">
        二维码<span style="color: #3db93e">长按或者截图</span>保存分享好友
      </div>
      <div class="advertising"></div>
      <div class="tips">友情提示</div>
      <div class="copy">复制链接</div>
      <div class="close" @click="emit('close')">分项取消</div>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue'
const qrCode = ref('我是二维码信息')
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.wrapper {
  border: 3px solid #c1c1c1;
  width: 320px;
  margin: 0 auto;
  margin-top: 150px;
  //height: 300px;
  background: white;
  background-image: url('@/assets/images/nodata.png');
  border-radius: 16px 16px 8px 8px;
  .wrapper-title {
    height: 20px;
    background: #028958;
    padding-left: 4px;
    border-radius: 16px 16px 8px 8px;
    color: #fff;
  }
}
.qrCode-text {
  width: 320px;
  margin: 0 auto;
  color: red;
  background: #fff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: large;
  border-bottom: #c1c1c1 3px solid;
}
.tips {
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  color: red;
  background: #fff;
  border-bottom: #c1c1c1 3px solid;
}
.copy {
  color: red;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: larger;
  background: #e4fb1f;
  border-bottom: #c1c1c1 3px solid;
}
.close {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: large;
  background: #4b4446;
  color: #fff;
}
</style>
