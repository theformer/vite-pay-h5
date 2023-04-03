<template>
  <div class="userInfo">
    <div class="title">{{ obj.title }}</div>
    <div class="content" v-html="obj.content"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getDocument } from '../../../api'
const obj = ref({})
onMounted(async () => {
  const { data } = await getDocument()
  obj.value = data[0]
  console.log(obj, '我是返回的obj')
})
</script>

<style lang="scss" scoped>
.userInfo {
  background: #fff;
  min-height: 100vh;
  :deep(.content) {
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.title {
  font-size: 20px;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: center;
  padding: 30px 0 0 0;
}
</style>
