<template>
  <div class="container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :offset="100"
      finished-text="没有更多了"
      @load="loadData"
    >
      <div v-for="(item, index) in movieList" :key="index" class="list">
        <div class="list-tips">官方消息</div>
        <div class="list-body">
          <div class="body-message">{{ item.message }}</div>
          <div class="body-time">{{ item.time }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getComplaintVideo } from '@/api/test'
const loading = ref(false)
const finished = ref(false)
const movieList = ref([
  { message: '我是成功返回的消息内容 ', time: '2022-02-14' },
  { message: '我是成功返回的消息内容 ', time: '2022-02-14' },
  { message: '我是成功返回的消息内容 ', time: '2022-02-14' },
  { message: '我是成功返回的消息内容 ', time: '2022-02-14' },
  { message: '我是成功返回的消息内容 ', time: '2022-02-14' }
])
const query = {
  hash: localStorage.getItem('hash'),
  offset: 1,
  limit: 20
}
const loadData = async () => {
  const { code, data } = await getComplaintVideo(query)
  if (code == 0) movieList.value = movieList.value.concat(data.complaint)
  loading.value = false
  query.offset++
  if (data.complaint.length < 20) finished.value = true
}
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .list {
    display: flex;
    width: 100%;
    .list-tips {
      width: 48px;
      height: 45px;
      color: red;
      background: #e4fb1f;
      border-radius: 5px;
      font-size: 17px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #bababb;
    }
    .list-body {
      position: relative;
      border: 1px solid #bababb;
      padding: 5px 10px;
      flex: 1;
      .body-message {
        width: 100%;
        @include text-overflow(1);
      }
      .body-time {
        text-align: end;
      }
    }
  }
}
</style>
