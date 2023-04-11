<template>
  <van-popup :show="props.show" style="width: 231px">
    <div class="container">
      <div class="title">投诉订单</div>
      <div class="container-body">
        <div class="body-order">投诉订单号:{{}}</div>
        <van-radio-group v-model="checked" class="body-radio">
          <van-radio name="1">付款成功却购买失败</van-radio>
          <van-radio name="2">无法唤醒支付页面</van-radio>
          <van-radio name="3">自定义</van-radio>
        </van-radio-group>
      </div>

      <div v-if="checked == 3" style="margin-bottom: 7px">
        <van-field v-model="value" placeholder="自定义投诉内容" />
      </div>
      <div class="footer">
        <van-button
          class="footer-complaint"
          round
          type="primary"
          block
          @click="handleClickToComplaint"
          >确认投诉</van-button
        >
        <van-button round class="footer-close" type="primary" block @click="emit('close')"
          >取消投诉</van-button
        >
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getComplaintCreate } from '@/api/test'
const props = defineProps<{
  show: boolean
  title: string
  environment: string
}>()
const emit = defineEmits(['close'])
const value = ref('')
const checked = ref('1')
const handleClickToComplaint = async () => {
  let params = {
    hash: localStorage.getItem('hash'),
    title: props.title,
    body: checked.value != 3 ? checked.value : value.value,
    environment: props.environment
  }
  const { code, data } = await getComplaintCreate(params)
  console.log(code, data)
}
</script>

<style lang="scss" scoped>
.container {
  background: #3db93e;
  .title {
    height: 37px;
    color: red;
    text-align: center;
    line-height: 37px;
    border-bottom: 1px solid #bababb;
    font-size: 15px;
    font-weight: bolder;
  }
  .container-body {
    padding-left: 37px;
    color: white;
    .body-order {
      padding: 5px 0 11px 0;
      color: #e2f920;
      font-size: 12px;
    }
    .body-radio {
      --van-radio-label-color: white;
    }
    .van-radio {
      margin-bottom: 10px;
    }
  }
  .footer {
    padding-bottom: 3px;
    button {
      height: 20px;
      color: white;
    }
    .footer-complaint {
      margin-bottom: 6px;
      color: #e2f920;
      background: #1e32d6;
    }
    .footer-close {
      background: #000001;
    }
  }
}
</style>
