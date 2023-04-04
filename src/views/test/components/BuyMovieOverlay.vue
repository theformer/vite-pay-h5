<template>
  <van-overlay z-index="999" :show="props.show" @click="emit('close')">
    <div class="wrapper" @click.stop>
      <img class="main-img" src="@/assets/images/bronze.png" alt="" />
      <van-button class="title-info" size="large">{{ props.title }}</van-button>
      <div style="display: flex; justify-content: space-between; margin-top: 8px" class="pay-btn">
        <div>
          <img class="ali" src="@/assets/icon/ali.png" alt="" />
          <span style="color: #26cffe">支付宝付款</span>
        </div>
        <div>
          <img class="wx" src="@/assets/icon/wx.png" alt="" />
          <span style="color: #3db993">微信付款</span>
        </div>
        <!--        <van-button class="ali iconfont icon-weixin">支付宝付款</van-button>-->
        <!--        <van-button class="wx iconfont icon-zhifubao">微信付款</van-button>-->
      </div>
      <van-button class="money-see title-info mt_20" size="large">5元观看</van-button>
      <van-button class="money-see title-info mt_10" size="large">XXX元天无限看</van-button>
      <van-button class="money-see title-info mt_10" size="large">X金币观看(剩余XXXX)</van-button>
      <van-button class="money-see title-info mt_10" size="large">充值VIP(更优惠)</van-button>
      <van-button class="money-see title-info mt_10" style="color: red" size="large"
        >暂不需要(关闭窗口)</van-button
      >
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps<{
  show: boolean
  title: string
  imgUrl: string
}>()
const emit = defineEmits(['close'])
watch(
  () => props.title,
  (newVal, oldVal) => {
    console.log('监听基本类型数据testStr')
    console.log('new', newVal)
    console.log('old', oldVal)
  }
)
</script>

<style scoped lang="scss">
.wrapper {
  width: 350px;
  padding: 12px;
  margin-top: 100px;
  height: 100%;
  overflow-y: auto;
  .main-img {
    height: 160px;
    width: 100%;
    display: inline-block;
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
