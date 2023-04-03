<template>
  <div :style="{ color: color }">技术支持：浙江云上叮咚科技有限公司</div>
</template>

<script setup lang="ts">
defineProps(['color'])
</script>

<style scoped lang="scss">
div {
  font-size: 14px;
  line-height: 60px;
  text-align: center;
  color: #a8a7a7;
}
</style>
