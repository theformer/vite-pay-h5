<template>
  <div class="image-container" @click="handleHrefChange">
    <img :src="props.reporterCover" alt="图片" v-lazy="props.reporterCover" />
    <div class="overlay">
      <div class="title">{{ props.title }}</div>
      <div class="name">报告人：{{ props.reporterName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getReportDetail } from '@/api'
import useAuthLogin from '@/hooks/useAuthLogin'

const props = defineProps<{
  id: number // id
  title: string // 综述提名
  createTime: string // 创建事件
  reporterName: string
  reporterCover: string
  detailsLink: string
}>()

const handleHrefChange = () => {
  useAuthLogin().then(() => {
    getReportDetail({ id: props.id }).then((res) => {
      if (res.code == 200) {
        window.location.href = props.detailsLink
      }
    })
  })
}
</script>

<style scoped lang="scss">
.image-container {
  display: inline-block;
  position: relative;
  overflow: hidden;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
  height: 140px;
  img {
    //width: 250px;
    width: 100%;
    height: 100%;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    padding: 5px 18px;
    width: 100%;
    color: white;
    background: rgba(0, 0, 0, 0.72);
    box-sizing: border-box;
    font-size: 12px;

    .title {
      @include text-overflow(1);
    }
  }
}
</style>
