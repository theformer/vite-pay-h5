<template>
  <van-overlay class="overlay" :show="show" @click="emit('close')">
    <div @touchstart="touchStart" @touchend="touchEnd">
      <img class="share" src="../../../assets/images/share.png" alt="" />
    </div>

    <span>温馨提示：长按图片保存到相册即可分享</span>
    <img class="close" src="../../../assets/images/close.png" alt="" />
  </van-overlay>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getDetaios } from '@/utils'
import { useRouter } from 'vue-router'
import emitter from '@/utils/bus'
const router = useRouter()
const Loop = ref(null)
const emit = defineEmits(['close'])
const touchStart = () => {
  //手指触摸
  clearTimeout(Loop.value) //再次清空定时器，防止重复注册定时器
  Loop.value = setTimeout(async () => {
    let token = localStorage.getItem('token') || null
    let user = getDetaios(localStorage.getItem('user') || null)
    if (!token) {
      router.push('/login')
    } else if (user) {
      await emit('close')
      emitter.emit('why', { flag: true })
    }
  }, 200)
}
const touchEnd = () => {
  clearTimeout(Loop.value)
}
const show = ref(false)
</script>

<style scoped lang="scss">
.overlay {
  z-index: 11;
  background: rgba(0, 0, 0, 0.67);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .share {
    width: 297px;
    height: 474px;
    margin: 0 auto;
    display: block;
    //margin-top: 128px;
  }
  span {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 20px;
    margin: 12px 0 16px 0;
    display: block;
  }
  .close {
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
  }
}
</style>
