<template>
  <div class="container">
    <van-field
      v-model="value"
      center
      clearable
      label="账户"
      placeholder="点击输入你能记得住的账户进行绑定"
    >
      <template #button>
        <van-button size="small" type="primary">绑定</van-button>
      </template>
    </van-field>
    <div>
      <div v-for="(item, index) in list" :key="index" class="buy-item">
        {{ item.name }}
      </div>
    </div>
    <div class="tips">
      <h1>友情提示：</h1>
      <div>购买VIP请到账户绑定账户后购买</div>
      <div>一旦网页丢失你的数据</div>
      <div>账户可用于找回你的VIP</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const list = ref([
  { name: 'XX元钱一天随心看(点我开通)' },
  { name: 'XX元钱一周随心看(点我开通)' },
  { name: 'XX元钱一月随心看(点我开通)' },
  { name: 'XX元钱一那边随心看(点我开通)' }
])
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  --van-field-label-width: 30px;
}
.buy-item {
  height: 37px;
  background: #028958;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
}
.tips {
  h1 {
    text-align: center;
    color: red;
    margin: 12px 0 22px 0;
  }
  div {
    margin: 0 0 8px 20px;
  }
}
</style>
