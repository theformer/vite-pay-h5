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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const list = ref([
  { name: '邀请人数：XXX' },
  { name: '金币余额：XXX' },
  { name: 'VIP到期时间：XXX天' }
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
</style>
