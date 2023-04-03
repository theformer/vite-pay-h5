<template>
  <SessionTitle :type="1">热门报告</SessionTitle>
  <div class="list-container">
    <ReportItem v-for="report in props.list.hot" v-bind="report" />
  </div>
  <template v-if="props.list.annual24?.length > 0">
    <SessionTitle :type="2">第24届中国科协年会报告集锦</SessionTitle>
    <div class="list-container">
      <ReportItem v-for="report in props.list.annual24" v-bind="report" />
    </div>
  </template>
  <template v-if="props.list.annual23?.length > 0">
    <SessionTitle>第23届中国科协年会报告集锦</SessionTitle>
    <div class="list-container">
      <ReportItem v-for="report in props.list.annual23" v-bind="report" />
    </div>
  </template>
</template>

<script setup lang="ts">
import SessionTitle from '../SessionTitle/index.vue'
import ReportItem from '@/components/ReportItem/index.vue'
import { IClassifyList } from '@/api/types/classify'
const props = defineProps<{
  list: IClassifyList
}>()
</script>

<style scoped lang="scss">
.list-container {
  padding: 0 15px;
  :deep(.image-container) {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
