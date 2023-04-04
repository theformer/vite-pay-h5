<template>
  <van-tabbar v-model="active" active-color="#0125B1">
    <van-tabbar-item>
      <span>返回顶部</span>
    </van-tabbar-item>
    <van-tabbar-item icon="home-o" class="item-buy">
      <template #icon="props">
        <div class="buy-btn">
          <img
            style="width: 30px; height: 29px; margin-top: 3px"
            :src="icon.classifyInactive"
            alt="classify"
          />
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
import { ref } from 'vue'
import { getAssetsImageUrl } from '@/utils'
const icon = {
  classifyInactive: getAssetsImageUrl('money.png', 'icon')
}
const active = ref(0)
</script>

<style scoped lang="scss">
.van-tabbar {
  --van-tabbar-item-icon-margin-bottom: 5px;
  --van-tabbar-height: 60px;
  .buy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 125px;
    background: #e2f920;
    border-radius: 25%;
    height: 120%;
  }
  img {
    height: 22px;
  }
}
</style>
