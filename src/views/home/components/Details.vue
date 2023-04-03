<template>
  <div class="details">
    <img :src="obj.imgUrl" class="imgUrl" alt="" />
    <div style="padding: 0 18px 21px">
      <div class="mt_12" style="font-weight: bold">论坛名称：</div>
      <div class="mt_14">
        {{ obj.meetingName }}
      </div>
      <div class="mt_12" style="font-weight: bold">年份：</div>
      <div class="mt_14">
        {{ obj.year }}
      </div>
      <div class="mt_12" style="font-weight: bold">届次：</div>
      <div class="mt_14">
        {{ obj.annual == 1 ? '第23届' : '第24届' }}
      </div>
      <div class="mt_12" style="font-weight: bold">时间：</div>
      <div class="mt_14">
        {{ obj.meetingStart + '至' + obj.meetingEnd }}
      </div>
      <div class="content" v-html="obj.details"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMeetingById } from '@/api'
const route = useRoute()
const obj = ref({})
onMounted(() => {
  loadData()
})
const loadData = async () => {
  const result = await getMeetingById({ id: Number(route.query.id) })
  obj.value = result.data
}
</script>

<style scoped lang="scss">
.details {
  min-height: 100%;
  font-size: 15px;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 21px;
  .imgUrl {
    width: 375px;
    height: 209px;
    margin-bottom: 18px;
  }

  .mt_14 {
    margin-bottom: 14px;
  }
  .mt_12 {
    margin-bottom: 12px;
  }
  .content {
    :deep(img) {
      width: 100%;
    }
  }
}
</style>
