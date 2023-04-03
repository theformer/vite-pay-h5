<template>
  <van-tabbar v-model="active" route active-color="#0125B1">
    <van-tabbar-item>
      <span>返回顶部</span>
    </van-tabbar-item>
    <van-tabbar-item icon="home-o" class="item-buy">
      <span>已购买</span>
      <template #icon="props">
        <img
          style="width: 19px; height: 19px; margin-top: 3px"
          :src="props.active ? icon.classifyActive : icon.classifyInactive"
          alt="classify"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>订单投诉</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getAssetsImageUrl } from '@/utils'
const icon = {
  classifyInactive: getAssetsImageUrl('classify-inactive.png', 'icon'),
  classifyActive: getAssetsImageUrl('classify-active.png', 'icon')
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
