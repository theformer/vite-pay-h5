<template>
  <div :style="getBg">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAssetsImageUrl } from '@/utils'

enum TypeEnum {
  hot = 1,
  list = 2
}

const props = defineProps<{
  type: number
}>()

const getBg = computed(() => {
  if (props.type === TypeEnum.hot) {
    return {
      background: `url('${getAssetsImageUrl('classify/classify-hot.png', 'images')}') no-repeat`,
      height: '29px',
      lineHeight: '29px',
      backgroundSize: '100%'
    }
  } else {
    return {
      background: `url('${getAssetsImageUrl('classify/classify-list.png', 'images')}') no-repeat`,
      height: '30px',
      lineHeight: '30px',
      backgroundSize: '100%'
    }
  }
})
</script>

<style scoped lang="scss">
div {
  margin: 15px 0;
  font-size: 15px;
  padding: 0 6px;
  color: white;
  background: #3771d9;
}
</style>
