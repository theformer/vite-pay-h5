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
      <ReportItem
        style="height: 187px"
        :id="item.refId"
        :create-time="item.createTime"
        :reporter-cover="item.imgUrl"
        :reporter-name="item.reporterName"
        :title="item.title"
        :details-link="item.detailsLink"
      />
    </div>
  </van-list>
</template>

<script setup lang="ts">
import ReportItem from '@/components/ReportItem/index.vue'
import { usePagination } from '@/hooks/usePagination'
import { IHistoryReport } from '@/api/types/my'
const { loading, loadData, finished, list } = usePagination<IHistoryReport[]>('/api/records2')
</script>

<style scoped>
.date {
  font-weight: bold;
  color: #010101;
  margin-bottom: 15px;
}
.item {
  background: #fff;
  padding: 0 15px;
}
</style>
