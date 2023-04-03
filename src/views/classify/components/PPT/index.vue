<template>
  <SessionTitle :type="1">热门报告文件</SessionTitle>
  <PPTItem v-for="(hot, index) in props.list.hot" v-bind="hot" />
  <template v-if="props.list.annual24?.length > 0">
    <SessionTitle :type="2">第24届中国科协年会报告文件集锦</SessionTitle>
    <PPTItem v-for="annual in props.list.annual24" v-bind="annual" />
  </template>
</template>

<script setup lang="ts">
import { IClassifyList } from '@/api/types/classify'
import SessionTitle from '../SessionTitle/index.vue'
import PPTItem from '@/components/PptItem/index.vue'

const props = defineProps<{
  list: IClassifyList
}>()
</script>

<style scoped></style>
