<template>
  <div class="mine-container">
    <div class="header-info">
      <div class="name">{{ userInfo.userName }}</div>
      <div class="phone">手机号码：{{ userInfo.mobile }}</div>
      <div class="company">单位名称：{{ userInfo.company }}</div>
    </div>
    <div class="nav-list">
      <van-cell title="个人资料" is-link size="large" to="profileEdit" title-class="cell-title">
        <template #title>
          <img
            class="icon"
            style="width: 26px; height: 20px"
            src="@/assets/icon/my-profile.png"
            alt="我的"
          />
          个人资料
        </template>
      </van-cell>
      <van-cell title="浏览记录" is-link size="large" to="history" title-class="cell-title">
        <template #title>
          <img
            class="icon"
            style="width: 23px; height: 23px"
            src="@/assets/icon/my-history.png"
            alt="我的"
          />
          浏览记录
        </template>
      </van-cell>
      <van-cell title="意见反馈" is-link size="large" to="advice" title-class="cell-title">
        <template #title>
          <img
            class="icon"
            style="width: 25px; height: 22px"
            src="@/assets/icon/my-advice.png"
            alt="我的"
          />
          意见反馈
        </template>
      </van-cell>
      <van-cell title="退出" is-link size="large" title-class="cell-title" @click="handleExit">
        <template #title>
          <img
            class="icon"
            style="width: 23px; height: 24px"
            src="@/assets/icon/my-exit.png"
            alt="我的"
          />
          退出
        </template>
      </van-cell>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
import { Dialog } from 'vant'
import 'vant/es/dialog/style'
import { getUserInfo } from '@/api/my'
import { onMounted, ref } from 'vue'
import { IUserInfo } from '@/api/types/my'
import { useKeepPage } from '@/hooks/useKeepPage'
import { useRouter } from 'vue-router'
const router = useRouter()
const userInfo = ref<Partial<IUserInfo>>({})
useKeepPage(['history'])

onMounted(() => {
  loadData()
})
const loadData = async () => {
  const result = await getUserInfo()
  userInfo.value = result.data
}
const handleExit = () => {
  Dialog.confirm({
    title: '提示',
    message: '确认退出？'
  })
    .then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.replace('/')
    })
    .catch(() => {
      console.log('取消')
    })
}
</script>

<style scoped lang="scss">
.mine-container {
  position: relative;
  background-color: #fff;
  min-height: calc(100vh - var(--van-tabbar-height));

  .header-info {
    //height: 170px;
    width: 100%;
    color: #fff;
    padding: 50px 0 55px 36px;
    background: url('../../assets/images/mine/mine-header-bg.png') no-repeat 100% / cover;
    box-sizing: border-box;
    div {
      margin-bottom: 4px;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .nav-list-text {
    color: #4a4a4a;
  }
  --van-cell-large-title-font-size: 15px;
  --van-cell-large-vertical-padding: 16px;
  --van-cell-horizontal-padding: 22px;
  --van-cell-border-color: rgba(155, 155, 155, 0.41);

  .icon {
    margin-right: 12px;
  }

  :deep(.cell-title) {
    display: flex;
    align-items: center;
  }
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
