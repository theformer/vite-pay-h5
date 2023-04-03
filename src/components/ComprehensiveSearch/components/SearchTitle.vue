<template>
  <div class="search-title">
    {{ props.title }}
  </div>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
.search-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 20px;
  margin-bottom: 16px;
}
</style>
