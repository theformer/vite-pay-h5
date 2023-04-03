<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="loadData"
  >
    <div class="item" v-for="(item, index) in list">
      <div class="date" v-if="item.createTime !== list[index - 1]?.createTime">
        {{ item.createTime }}
      </div>
      <ExpertItem
        :id="item.refId"
        :name="item.guestsName"
        :guests="item.guests"
        :img-url="item.imgUrl"
      />
    </div>
  </van-list>
</template>

<script setup lang="ts">
import ExpertItem from '@/components/ExpertItem/index.vue'
import { usePagination } from '@/hooks/usePagination'
import { IHistoryExpert } from '@/api/types/my'
import { useKeepPage } from '@/hooks/useKeepPage'
const { loading, loadData, finished, list } = usePagination<IHistoryExpert[]>('/api/records3')
useKeepPage(['expertDetail'])
</script>

<style scoped>
.date {
  font-weight: bold;
  color: #010101;
  margin-bottom: 15px;
}
.item {
  background: #fff;
  padding: 10px 15px;
}
</style>
