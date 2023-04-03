<template>
  <div class="swipers">
    <van-swipe :autoplay="5000" lazy-render>
      <van-swipe-item v-for="image in props.banner" :key="image">
        <img :src="image.url" class="swiper-img" />
      </van-swipe-item>
    </van-swipe>
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="handleClickToDetails(index, item.typeId)"
      >
        <img :src="item.img" alt="" />
        <div>{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import photoReport from '@/assets/images/down-banner/report.png'
import photoOverview from '@/assets/images/down-banner/overview.png'
import photoSpecialist from '@/assets/images/down-banner/specialist.png'
const router = useRouter()

const props = defineProps(['banner'])
console.log(props, '我是返回的props')
const list = reactive([
  { label: '学术报告', img: photoReport, typeId: 1 },
  { label: '学术专家', img: photoSpecialist, typeId: 2 },
  { label: '学术综述', img: photoOverview, typeId: 3 }
])
const handleClickToDetails = (index, typeId) => {
  router.push({ path: '/classify', query: { home: index, typeId } })
}
onMounted(() => {
  console.log(props, 1111111)
})
</script>

<style scoped lang="scss">
.swipers {
  width: 343px;
  //height: 140px;
  //background: #2951ff;
  border-radius: 5px;
  margin: 0 auto;
  .box {
    margin-top: 16px;
    padding: 0 26px;
    display: flex;
    justify-content: space-between;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 64px;
        height: 50px;
        border-radius: 10px;
      }
      div {
        margin-top: 12px;
        margin-bottom: 16px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4a4a4a;
        line-height: 20px;
      }
    }
  }
  ::v-deep {
    .van-swipe {
      border-radius: 10px;
    }
    .van-swipe-item {
      border-radius: 10px;
    }
    .van-swipe__track {
      width: 100% !important;
      height: 140px !important;
      .swiper-img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>
