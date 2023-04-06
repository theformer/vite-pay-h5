<template>
  <van-tabbar z-index="9" v-model="active">
    <van-tabbar-item>
      <span @click="handleClickToBckTop">返回顶部</span>
    </van-tabbar-item>
    <van-tabbar-item icon="home-o" class="item-buy">
      <template #icon="props">
        <div class="buy-btn">
          <img style="width: 30px; height: 29px" :src="icon.classifyInactive" alt="classify" />
          <span style="margin-left: 10px; color: red; font-weight: bolder">已购买</span>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>订单投诉</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getAssetsImageUrl } from '@/utils'
const icon = {
  classifyInactive: getAssetsImageUrl('money.png', 'icon')
}
const backTopFlag = ref(false) //用来判断样式

const handleClickToBckTop = () => {
  let top = document.documentElement.scrollTop //获取点击时页面的滚动条纵坐标位
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top -= 50 //一次减50往上滑动
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 5) //定时调用函数使其更顺滑
}
const handleScroll = () => {
  if (document.documentElement.scrollTop > 20) {
    backTopFlag.value = true
  } else {
    backTopFlag.value = false
  }
  //往下滑超过20则显示 否则则不显示按钮
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
}) //监听滚动事件
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
}) //离开页面时移除监听事件

const active = ref(0)
</script>

<style scoped lang="scss">
.van-tabbar {
  --van-tabbar-item-icon-margin-bottom: 5px;
  --van-tabbar-height: 40px;
  .buy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 124px;
    height: 26px;
    line-height: 29px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgba(228, 251, 31, 1);
    color: rgba(232, 13, 13, 1);
    font-size: 20px;
    text-align: center;
    font-family: Arial;
    border: 1px solid rgba(187, 187, 187, 1);
    margin-top: 5px;
  }
  img {
    height: 22px;
  }
  .van-tabbar-item {
    background-color: #028a58;
    color: white;
  }
}
</style>
