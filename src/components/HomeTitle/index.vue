<template>
  <div class="home_title">
    <div class="title-left">
      <div class="icon"></div>
      <div class="title">{{ props.title }}</div>
    </div>
    <div class="title-right" @click="handleClickToDetails">
      {{
        props.title == '热门报告'
          ? '查看更多学术报告>>'
          : props.title == '最新会议'
          ? '查看更多会议>>'
          : props.title == '热门榜单'
          ? '查看更多学术专家>>'
          : ''
      }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps(['title'])
const router = useRouter()
const handleClickToDetails = () => {
  if (props.title == '最新会议') {
    router.push({ path: '/meetingList' })
  } else if (props.title == '热门榜单') {
    router.push({ path: '/classify', query: { home: 1, typeId: 2 } })
  } else {
    router.push({ path: '/classify', query: { home: 0, typeId: 1 } })
  }
}
</script>

<style lang="scss" scoped>
.home_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .title-left {
    display: flex;
    align-items: center;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
      line-height: 22px;
    }
    .icon {
      width: 5px;
      height: 17px;
      background: #3771d9;
      margin-right: 6px;
    }
  }
  .title-right {
    //width: 120px;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #3771d9;
    line-height: 18px;
  }
}
</style>
