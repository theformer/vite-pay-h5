<template>
  <van-tabbar z-index="9" v-model="active">
    <van-tabbar-item>
      <span>返回顶部</span>
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
