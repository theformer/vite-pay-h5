<template>
  <div class="movie-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :offset="100"
      finished-text="没有更多了"
      @load="loadData"
    >
      <div v-for="(item, index) in testList" class="list-item" :key="index">
        <img src="@/assets/images/nodata.png" alt="" />
        <div class="movie-info">
          <div class="info-text">
            <span class="title">{{ item.title }}</span>
            <span>{{ item.ids }}</span>
            <span>时间: {{ item.time }}</span>
          </div>
          <div class="info-right">
            <div>￥{{ item.money }}</div>
            <div>{{ item.paystatus ? '已支付' : '未支付' }}</div>
          </div>
          <div class="info-btn" @click="showPopup = true">投诉</div>
        </div>
      </div>
    </van-list>
  </div>
  <OrderPopupr v-if="showPopup" :show="showPopup" @close="closePopup" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getComplaintVideo } from '@/api/test'
import OrderPopupr from '@/views/test/components/OrderPopup.vue'
const loading = ref(false)
const finished = ref(false)
const showPopup = ref(false)
const movieList = ref([])
const testList = ref([
  {
    name: '来学萤火虫冥想',
    ids: 777,
    time: '2015-01-02',
    money: 5,
    paystatus: false,
    title: '我是你被你遗忘的星辰'
  }
])
const closePopup = () => {
  showPopup.value = !showPopup.value
}
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

<style scoped lang="scss">
.movie-list {
  height: 100%;
  .list-item {
    display: flex;
    height: 53px;
    img {
      width: 95px;
      height: 100%;
    }
    .movie-info {
      display: flex;
      justify-content: space-between;
      border: 1px solid #bababb;
      width: 100%;
      .info-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #028958;
        padding-left: 2px;
        .title {
          color: red;
          width: 150px;
          @include text-overflow(1);
        }
      }
      .info-right {
        color: #28fd01;
        padding-top: 5px;
        text-align: center;
      }
      .info-btn {
        width: 47px;
        background: #26cffe;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: 1px solid #bababb;
      }
    }
  }
}
</style>
