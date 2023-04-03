<template>
  <SessionTitle :type="1">热门专家</SessionTitle>
  <ExpertItem class="item" v-for="report in props.list.hot" v-bind="report" />
  <template v-if="props.list.annual24?.length > 0">
    <SessionTitle :type="2">第24届中国科协年会专家集锦</SessionTitle>
    <ExpertItem class="item" v-for="report in props.list.annual24" v-bind="report" />
  </template>
  <template v-if="props.list.annual23?.length > 0">
    <SessionTitle>第23届中国科协年会专家集锦</SessionTitle>
    <ExpertItem class="item" v-for="report in props.list.annual23" v-bind="report" />
  </template>
</template>

<script setup lang="ts">
import SessionTitle from '../SessionTitle/index.vue'
import ExpertItem from '@/components/ExpertItem/index.vue'
import { IClassifyList } from '@/api/types/classify'

const props = defineProps<{
  list: IClassifyList
}>()
</script>

<style scoped>
.item {
  padding: 0 20px;
  margin: 20px 0;
}
</style>
