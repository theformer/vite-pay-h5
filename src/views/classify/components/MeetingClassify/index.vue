<template>
  <div class="meeting-container">
    <h4>会议分类</h4>
    <div class="meeting-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadData"
      >
        <ul>
          <li
            @click="handleSelect(meet.id)"
            :class="{ active: selected === meet.id }"
            v-for="meet in meetingList"
          >
            {{ meet.meetingName }}
          </li>
        </ul>
      </van-list>
    </div>

    <div class="footer">
      <van-button plain class="btn" @click="handleReset">重置</van-button>
      <van-button type="primary" class="btn" @click="handleSure">确认</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMeetingList } from '@/api/common'
import { IMeeting } from '@/api/types/common'
import { meetingQuery } from '@/api/types/home'

const emits = defineEmits<{
  (e: 'change', value: number | string): void
}>()

const meetingList = ref<Partial<IMeeting>[]>([
  {
    id: 0,
    meetingName: '全部'
  }
])
const query = ref<meetingQuery>({
  pn: 1,
  ps: 10
})
const loading = ref(false)
const finished = ref(false)
const loadData = async () => {
  const result = await getMeetingList(query.value)
  meetingList.value = meetingList.value.concat(result.data).concat(result.data).concat(result.data)
  loading.value = false
  query.value.pn++
  if ((result.tc as number) <= meetingList.value.length - 1) finished.value = true
}
const selected = ref<number | string>(0)
// 选择会议事件
const handleSelect = (e: number) => (selected.value = e)
const handleSure = () => {
  emits('change', selected.value)
}
const handleReset = () => {
  selected.value = 0
  handleSure()
}
</script>

<style scoped lang="scss">
.meeting-container {
  position: relative;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

h4 {
  color: #161616;
  font-size: 15px;
  font-weight: bold;
}

li {
  background: #e7f0ff;
  color: #161616;
  padding: 9px 0;
  //height: 38px;
  //line-height: 38px;
  width: 100%;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  box-sizing: border-box;
  text-align: center;
  margin: 14px 0;
  &.active {
    background: $theme-color;
    color: white;
  }
}

.footer {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 85%;

  .btn {
    width: 103px;
    height: 38px;
  }
}

.meeting-list {
  // padding-bottom:  20px;;
  height: 500px;
  overflow-y: auto;
}
</style>
