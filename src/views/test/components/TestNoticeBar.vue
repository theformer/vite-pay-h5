<template>
  <van-notice-bar left-icon="volume-o" :text="props.text" />
</template>

<script setup lang="ts">
const props = defineProps(['text'])
</script>

<style lang="scss" scoped></style>
