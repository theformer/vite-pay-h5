<template>
  <van-tabbar v-model="active" route active-color="#0125B1">
    <van-tabbar-item icon="home-o" to="/">
      <span>首页</span>
      <template #icon="props">
        <img
          style="width: 25px; height: 23px"
          :src="props.active ? icon.homeActive : icon.homeInactive"
          alt="home"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="home-o" to="/classify">
      <span>分类</span>
      <template #icon="props">
        <img
          style="width: 19px; height: 19px; margin-top: 3px"
          :src="props.active ? icon.classifyActive : icon.classifyInactive"
          alt="classify"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" to="/my">
      <span>我的</span>
      <template #icon="props">
        <img
          style="width: 21px; height: 21px"
          :src="props.active ? icon.myActive : icon.myInactive"
          alt="my"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getAssetsImageUrl } from '@/utils'
const icon = {
  homeInactive: getAssetsImageUrl('home-inactive.png', 'icon'),
  homeActive: getAssetsImageUrl('home-active.png', 'icon'),
  classifyInactive: getAssetsImageUrl('classify-inactive.png', 'icon'),
  classifyActive: getAssetsImageUrl('classify-active.png', 'icon'),
  myInactive: getAssetsImageUrl('my-inactive.png', 'icon'),
  myActive: getAssetsImageUrl('my-active.png', 'icon')
}
const active = ref(0)
</script>

<style scoped lang="scss">
.van-tabbar {
  --van-tabbar-item-icon-margin-bottom: 5px;
  --van-tabbar-height: 60px;
  img {
    height: 22px;
  }
}
</style>
