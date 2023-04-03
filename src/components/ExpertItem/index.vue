<template>
  <div class="expert-container" @click="handleCheckDetail(props.id)">
    <div class="left-avatar">
      <img :src="props.imgUrl" alt="图片" v-lazy="props.imgUrl" />
    </div>
    <div class="right-info">
      <div class="info-title">
        <span>{{ props.name }}</span>
      </div>
      <div class="info-classify">{{ props.guests }}</div>
      <span class="check-detail">查看详情>></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: number // id
  name: string // 姓名
  guests: string // 职务
  createTime?: string // 创建时间
  imgUrl: string // 专家图片
}>()
const router = useRouter()
const handleCheckDetail = (id: number) => {
  router.push({ name: 'expertDetail', query: { id } })
}
</script>

<style scoped lang="scss">
.expert-container {
  display: flex;

  .left-avatar {
    width: 95px;
    height: 125px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: inherit;
      height: inherit;
    }
  }

  .right-info {
    position: relative;
    flex: 1;
    margin-left: 10px;

    div {
      margin-bottom: 4px;
    }

    .info {
      &-title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #4a4a4a;
        font-weight: bold;
      }

      &-title span:first-child {
        font-weight: bold;
      }
    }

    .info-classify {
      @include text-overflow(3);
    }
    .check-detail {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 14px;
      color: #3771d9;
    }
  }
}
</style>
