<template>
  <SessionTitle :type="1">热门综述</SessionTitle>
  <OverviewItem v-for="(hot, index) in props.list.hot" v-bind="hot">
    <img :src="getAssetsImageUrl(medals[index])" class="medal" alt="奖牌" />
  </OverviewItem>
  <template v-if="props.list.annual24?.length > 0">
    <SessionTitle :type="2">第24届中国科协年会综述集锦</SessionTitle>
    <OverviewItem v-for="annual in props.list.annual24" v-bind="annual" />
  </template>
  <template v-if="props.list.annual23?.length > 0">
    <SessionTitle>第23届中国科协年会综述集锦</SessionTitle>
    <OverviewItem v-for="annual in props.list.annual23" v-bind="annual" />
  </template>
</template>

<script setup lang="ts">
import SessionTitle from '../SessionTitle/index.vue'
import { IClassifyList } from '@/api/types/classify'
import { getAssetsImageUrl } from '@/utils'
import OverviewItem from '@/components/OverviewItem/index.vue'

const props = defineProps<{
  list: IClassifyList
}>()

const medals = ['gold.png', 'sliver.png', 'bronze.png']
</script>

<style scoped lang="scss">
.medal {
  width: 25px;
  height: 32px;
  margin: 0 6px;
}
</style>
