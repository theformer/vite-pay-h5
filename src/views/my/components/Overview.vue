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
      <OverviewItem
        :type="item.type"
        :meeting-name="item.meetingName"
        :id="item.refId"
        :meeting-start="item.meetingStart"
      />
    </div>
  </van-list>
</template>

<script setup lang="ts">
import OverviewItem from '@/components/OverviewItem/index.vue'
import { usePagination } from '@/hooks/usePagination'
import { IHistoryOverview } from '@/api/types/my'
import { useKeepPage } from '@/hooks/useKeepPage'

const { loading, loadData, finished, list } = usePagination<IHistoryOverview[]>('/api/records1')
useKeepPage(['overviewDetail'])
</script>

<style scoped lang="scss">
.date {
  font-weight: bold;
  color: #010101;
  padding: 5px 0;
}

.item {
  background: #fff;
  padding: 0 15px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.21);
}

.item:nth-last-of-type(3) {
  border: none;
}
</style>
