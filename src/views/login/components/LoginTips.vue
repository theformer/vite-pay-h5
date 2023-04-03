<template>
  <van-overlay
    :show="loginShow"
    @click="emit('close')"
    style="
      z-index: 5;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "
    :lock-scroll="false"
  >
    <img class="tips" src="../../../assets/images/loginTips.png" alt="" />
  </van-overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const loginShow = ref(false)
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.tips {
  width: 266px;
  height: 298px;
  display: block;
}
</style>
