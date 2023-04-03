<template>
  <div class="meeting-details">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="flag ? '' : '～ 亲 没更多数据了哦 ～'"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="meeting-item"
          :class="index >= 1 ? 'border_pt12' : ''"
          @click="handleClickDetailsToContent(item)"
        >
          <img :src="item.imgUrl" alt="" />
          <div class="meeting-right">
            <div class="meeting-title">{{ item.meetingName }}</div>
            <div class="meeting-name">
              {{ item.meetingStart + '至' + item.meetingEnd }}
            </div>
            <!--            <div class="meeting-name">{{ item.createTime }}</div>-->
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMeetingList } from '@/api'
import { IMeeting } from '@/api/types/common'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let flag = ref(false)
const list = ref<IMeeting[]>([])
let searchParams = ref({ ps: 10, pn: 1 })
const onLoad = () => {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  console.log(searchParams.value, '我是返回的searchParams')
  getMeetingList(searchParams.value).then((res) => {
    if (searchParams.value.pn == 1 && res.data.length == 0) {
      flag.value = true
    } else {
      flag.value = false
    }
    console.log(flag.value, '我是此时的值')
    if (searchParams.value.pn == 1) {
      list.value = res.data
    } else {
      list.value = list.value.concat(res.data)
    }
    loading.value = false
    if (res.data.length < 9) {
      finished.value = true
    }
    searchParams.value.pn++
  })
}
const onRefresh = () => {
  // 清空列表数据
  searchParams.value.pn = 1
  finished.value = false
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
const handleClickDetailsToContent = (item: { id: any }) => {
  router.push({ path: '/details', query: { id: item.id } })
}
</script>

<style scoped lang="scss">
.meeting-details {
  padding: 24px 16px;
  background: #ffffff;
}
.meeting-item {
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(155, 155, 155, 0.21);
  margin-bottom: 15px;
  img {
    width: 131px;
    height: 84px;
    border-radius: 4px;
    display: block;
    margin-right: 12px;
  }
  .meeting-right {
    width: 200px;
    font-family: PingFangSC-Regular, PingFang SC;
    .meeting-title {
      font-size: 14px;
      font-weight: 600;
      color: #4a4a4a;
      line-height: 20px;
      margin-bottom: 7px;
    }
    .meeting-name {
      font-size: 11px;
      font-weight: 400;
      color: #9b9b9b;
      line-height: 16px;
      margin-bottom: 7px;
    }
  }
}
//.meeting-item:last-child {
//  border-bottom: none;
//}
</style>
