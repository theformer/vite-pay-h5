<template>
  <div class="details" v-if="loading">
    <img :src="obj.imgUrl" class="imgUrl" alt="" />
    <div>
      <div class="mt_14">
        <span>论坛名称：</span>
        <p>{{ obj.meetingName }}</p>
      </div>
      <div class="mt_14">
        <span>年份：</span>
        <p>{{ obj.year }}</p>
      </div>
      <div class="mt_14">
        <span>届次：</span>
        <p>{{ getAnnualName(obj.annual) }}</p>
      </div>
      <div class="mt_14">
        <span>综述类型：</span>
        <p>{{ useParseType(obj.type) }}</p>
      </div>
      <div class="mt_14">
        <span>承办单位：</span>
        <p>{{ obj.organizer2 }}</p>
      </div>
      <div class="mt_14">
        <span>支持单位：</span>
        <p>{{ obj.organizer3 }}</p>
      </div>

      <div class="mt_14">
        <span>综述详情：</span>
      </div>
      <div class="content" v-html="obj.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getOverviewDetail } from '@/api'
import { IArticleClassify } from '@/api/types/classify'

const route = useRoute()
const obj = ref<Partial<IArticleClassify>>({})
import { useParseType } from '@/hooks/useParseType'
import { ANNUAL_LIST } from '@/utils'

const loading = ref(false)
onMounted(() => {
  loadData()
})

const getAnnualName = (annual: number) => ANNUAL_LIST[annual - 1]?.fullName
const loadData = async () => {
  const result = await getOverviewDetail({ id: Number(route.query.id) })
  obj.value = result.data
  loading.value = true
}
</script>

<style scoped lang="scss">
.details {
  min-height: 100vh;
  font-size: 15px;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 21px;
  background: #fff;

  .imgUrl {
    width: 375px;
    height: 209px;
    margin-bottom: 18px;
  }

  .mt_14 {
    margin-bottom: 14px;

    span,
    p {
      display: block;
      margin-bottom: 8px;
    }
    span {
      font-size: 15px;
      font-weight: 500;
    }
  }

  .content {
    :deep(img) {
      width: 100%;
    }
  }

  & > div {
    padding: 20px 20px 80px 20px;
  }
}
</style>
