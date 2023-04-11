<template>
  <van-popup z-index="999" style="background: none" :show="props.show">
    <div class="wrapper" @click.stop>
      <img class="main-img" :src="props.imgUrl" alt="" @click="emit('seeMovie')" />
      <van-button class="title-info title-tow" size="large" @click="emit('seeMovie')">{{
        props.title
      }}</van-button>
      <div style="display: flex; justify-content: space-between; margin-top: 8px" class="pay-btn">
        <div>
          <img class="ali" src="@/assets/icon/ali.png" alt="" />
          <span style="color: #26cffe">支付宝付款</span>
        </div>
        <div>
          <img class="wx" src="@/assets/icon/wx.png" alt="" />
          <span style="color: #3db993">微信付款</span>
        </div>
      </div>
      <div style="height: 260px; overflow-y: scroll">
        <van-button class="money-see title-info mt_20" size="large"
          >{{ props.userMoney }}元观看</van-button
        >
        <van-button class="money-see title-info mt_10" size="large" @click="handleClickToVip"
          >XXX元天无限看</van-button
        >
        <van-button class="money-see title-info mt_10" size="large"
          >{{ props.userGold }}金币观看(剩余{{ userAllGold }})</van-button
        >
        <van-button class="money-see title-info mt_10" size="large" @click="handleClickToVip"
          >充值VIP(更优惠)</van-button
        >
        <van-button
          @click="emit('close')"
          class="money-see title-info mt_10"
          style="color: red"
          size="large"
          >暂不需要(关闭窗口)</van-button
        >
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps<{
  show: boolean
  title: string
  imgUrl: string
  userGold: string
  userMoney: string
  userAllGold: number
}>()
const emit = defineEmits(['close', 'toVip', 'seeMovie'])
const handleClickToVip = () => {
  emit('toVip')
}
watch(
  () => props.show,
  (newVal, oldVal) => {
    let height = document.documentElement.clientHeight
    console.log(height, 1111)
  }
)
</script>

<style scoped lang="scss">
.wrapper {
  width: 350px;
  padding: 12px;
  margin-top: 100px;
  height: 100%;
  overflow: auto;
  .main-img {
    height: 160px;
    width: 100%;
    display: inline-block;
  }
  .title-tow {
    ::v-deep {
      .van-button__text {
        @include text-overflow(2);
      }
    }
  }
  .title-info {
    color: red;
    background: #3db93e;
    border: #3db93e;
  }
  .pay-btn {
    div {
      border-radius: 50px;
      font-size: 20px;
      height: 80px;
      width: 48%;
      color: white;
      display: flex;
      align-items: center;
      background: white;
    }
  }
  .ali {
    width: 55px;
    height: 60px;
    padding-left: 5px;
  }
  .wx {
    width: 60px;
    height: 60px;
    padding-left: 5px;
  }
  .money-see {
    height: 35px;
    border-radius: 25px;
    color: white;
  }
}
</style>
