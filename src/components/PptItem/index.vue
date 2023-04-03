<template>
  <div class="ppt-container" @click="handleClick">
    <img src="@/assets/images/classify/ppt.png" alt="" />
    <div class="right-info">
      <div class="info-title">{{ props.title }}</div>
      <div class="info-classify">{{ '报告人：' + reporterName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import useAuthLogin from '@/hooks/useAuthLogin'

const router = useRouter()
const props = defineProps<{
  id: number // id
  title: string // 综述提名
  createTime: string // 创建事件
  reporterName: string
  reporterCover: string
  detailsLink: string
  fileUrl: string
}>()

const handleClick = () => {
  useAuthLogin().then(() => {
    if (!props.fileUrl) {
      return Toast('暂无文件预览，请先上传文件')
    }
    router.push({ name: 'pdfPreview', params: { url: props.fileUrl } })
    // location.href = `https://view.xdocin.com/view?src=${props.fileUrl}&printable=false&title=${props.title}`
  })
}
</script>

<style scoped lang="scss">
.ppt-container {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.21);
  img {
    width: 34px;
    height: 36px;
    margin-right: 15px;
  }

  .info-title {
    margin-bottom: 4px;
    font-weight: bold;
  }
}
</style>
