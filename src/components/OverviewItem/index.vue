<template>
  <div class="over-container" @click="handleDetail(props.id)">
    <div class="left-avatar">
      <slot>
        <div class="avatar">综述</div>
      </slot>
    </div>
    <div class="right-info">
      <div class="info-title">{{ props.meetingName }}</div>
      <div class="info-classify">{{ useParseType(props.type) }}</div>
      <div class="info-start-date">{{ props.meetingStart }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParseType } from '@/hooks/useParseType'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id?: number // id
  title?: string // 综述提名
  createTime?: string // 创建事件
  meetingStart?: string
  type: number // 综述类型
  meetingName?: string
}>()
const router = useRouter()
const handleDetail = (id: number) => {
  router.push({ name: 'overviewDetail', query: { id } })
}
</script>

<style scoped lang="scss">
.over-container {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.21);

  &:last-child {
    border: none;
  }

  .avatar {
    display: inline-block;
    background: #d4ebfe;
    width: 38px;
    height: 38px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    color: #8f8f8f;
  }

  .right-info {
    margin-left: 10px;
    color: $text-color;
    font-size: 12px;
    flex: 1;

    div {
      margin-bottom: 4px;
    }

    .info {
      &-title {
        font-size: 16px;
        color: #4a4a4a;
        font-weight: bold;
      }
    }
  }
}
</style>
