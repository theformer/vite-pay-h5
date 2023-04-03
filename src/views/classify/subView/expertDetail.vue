<template>
  <div style="background: #fff; height: 100vh">
    <div class="header">
      <img :src="formData.imgUrl" alt="" />
      <div class="info">
        <div class="info-name">{{ formData.name }}</div>
        <div class="info-post"><span>单位及职务：</span>{{ formData.guests }}</div>
      </div>
    </div>
    <div class="content fu-text">
      <div class="intro">个人简介：</div>
      <div v-html="formData.introduce"></div>

      <template v-if="formData.reporterList?.length > 0">
        <h3 class>专家个人报告</h3>
        <div
          class="more"
          v-for="(report, index) in formData.reporterList"
          @click="handleClick(report.detailsLink)"
        >
          {{ useAnnualType(report.annual) }} 报告{{ index + 1 }}：{{ report.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getExertDetail } from '@/api/classify'
import { onMounted, ref } from 'vue'
import { IExpertDetail } from '@/api/types/classify'
import { useAnnualType } from '@/hooks/useParseType'

const route = useRoute()
const formData = ref<Partial<IExpertDetail>>({})

onMounted(() => {
  loadData()
})
const loadData = async () => {
  const id = Number(route.query.id)
  const result = await getExertDetail({ id })
  formData.value = result.data
}

const handleClick = (url: string) => {
  window.location.href = url
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  padding: 25px;
  background: linear-gradient(180deg, #4599f0 0%, #3771d9 100%);
  color: #fff;
  box-sizing: border-box;

  img {
    margin-right: 15px;
    width: 144px;
    height: 192px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .info {
    font-size: 15px;
    div {
      margin-bottom: 8px;
    }
    &-name {
      font-size: 20px;
      font-weight: 500;
    }
    span {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
}

.content {
  background: #fff;
  padding: 25px;

  .more {
    color: $theme-color;
    text-decoration: underline;
    margin-top: 15px;
  }

  h3 {
    margin-top: 22px;
    font-weight: bold;
  }

  :deep(img) {
    width: 100%;
  }

  .intro {
    font-size: 14px;
    font-weight: 500;
    color: #000;
    margin-bottom: 14px;
  }
}
</style>
