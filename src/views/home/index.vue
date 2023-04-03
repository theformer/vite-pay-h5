<template>
  <div class="home">
    <div class="header">
      <div class="search" @click="router.push('/search')">
        <div class="search-bar-input">
          <van-icon name="search" size="25" color="#9b9b9b" />
          <span class="search-text">请输入你想搜索的</span>
        </div>
      </div>
      <SwiperHead :banner="bannersArr" />
    </div>
    <div class="main">
      <HomeTitle title="热门报告" />
      <div class="main-report">
        <swiper
          :slidesPerView="2"
          :spaceBetween="30"
          :freeMode="true"
          :pagination="{
            clickable: true
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide
            v-for="(item, index) in reportersArr"
            @click="handleClickToLink(item)"
            class="report-swiper"
            :key="index"
          >
            <img :src="item.reporterCover" alt="" />
            <div class="report-title">{{ item.title }}</div>
            <div class="report-name">报告人：{{ item.reporterName }}</div>
          </swiper-slide>
        </swiper>
      </div>
      <HomeTitle title="最新会议" />
      <div class="main-report meeting">
        <div
          v-for="(item, index) in meetingsArr"
          :key="index"
          class="meeting-item"
          :class="index >= 1 ? 'border_pt12' : ''"
        >
          <img :src="item.imgUrl" alt="" @click="handleClickToDetails(item)" />
          <div class="meeting-right" @click="handleClickToDetails(item)">
            <div class="meeting-title">{{ item.meetingName }}</div>
            <div class="meeting-name">
              {{ item.meetingStart + '至' + item.meetingEnd }}
            </div>
            <!--            <div class="meeting-name">{{ item.createTime }}</div>-->
          </div>
        </div>
      </div>
      <HomeTitle title="热门榜单" />
      <div class="main-report specialist">
        <div
          v-for="(item, index) in guestsArr"
          :key="index"
          class="specialist-item"
          :class="index == 0 ? 'bg_orange' : index == 1 ? 'bg_blue' : 'bg_green'"
        >
          <div
            class="specialist-palegreen"
            :class="
              index == 0 ? 'palegreen_orange' : index == 1 ? 'palegreen_blue' : 'palegreen_green'
            "
          ></div>
          <div class="specialist-ranking">{{ '0' + (index + 1) }}</div>
          <img @click="handleClickToGuest(item)" :src="item.imgUrl" alt="" />
          <div class="item-right" @click="handleClickToGuest(item)">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-title">{{ item.guests }}</div>
            <div class="item-details">查看详情>></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    <img
      src="../../assets/images/right-icon.png"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="right-icon"
      ref="iconDrav"
      @click="handleClickToPreview"
      alt=""
    />
    <Preview :show="reeviewShow" @close="closePreview" />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper'
import SwiperHead from '@/components/Swiper/index.vue'
import HomeTitle from '@/components/HomeTitle/index.vue'
import { getIndexList, getReportDetail, getUserInfo } from '@/api'
import { onMounted, ref, onBeforeUnmount, nextTick, watch } from 'vue'
import { IGuests, IMeeting, IReporter, IBanner } from '@/api/types/common'
import { useRouter } from 'vue-router'
import 'vant/es/image-preview/style'
import Preview from './components/Preview.vue'
import useAuthLogin from '@/hooks/useAuthLogin'
const top = ref(501)
const left = ref(304)
const router = useRouter()
const modules = [FreeMode]
const reeviewShow = ref(false)
const iconDrav = ref(null)
const timer = ref(null)
const currentTop = ref(0)
let guestsArr = ref<IGuests[]>([])
let meetingsArr = ref<IMeeting[]>([])
let reportersArr = ref<IReporter[]>([])
let bannersArr = ref<IBanner[]>([])
const handleClickToDetails = (item: { id: any }) => {
  router.push({ path: '/details', query: { id: item.id } })
}
const handleClickToGuest = (item: { id: any }) => {
  router.push({ name: 'expertDetail', query: { id: item.id } })
}
const handleClickToPreview = () => {
  reeviewShow.value = true
}
const closePreview = () => {
  reeviewShow.value = false
}
const handleClickToLink = async (item: { id: any; detailsLink: string }) => {
  useAuthLogin().then(() => {
    getReportDetail({ id: item.id }).then((res) => {
      if (res.code == 200) {
        window.location.href = item.detailsLink
      }
    })
  })
  // const { code, data } = await getReportDetail({ id: item.id })
  // window.location.href = item.detailsLink
}
left.value = 304
top.value = 501
/*
 * 通过top的高度
 * */
watch(
  () => top.value,
  (val) => {
    if (val <= 0) {
      return (top.value = 0)
    }
    let height = document.documentElement.clientHeight
    console.log(height, '我是此时返回的高度', top.value)
    if (height - (val + 71) <= 10) {
      return (top.value = height - 71)
    }
  }
)
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScrollStart)
})
const handleScrollStart = () => {
  timer.value && clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    handleScrollEnd()
  }, 300)
  currentTop.value = document.documentElement.scrollTop || document.body.scrollTop
  if (left.value > document.documentElement.clientWidth / 2) {
    left.value = document.documentElement.clientWidth - 35
  } else {
    left.value = -35
  }
}
const handleScrollEnd = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop === currentTop.value) {
    if (left.value > document.documentElement.clientWidth / 2) {
      left.value = document.documentElement.clientWidth - 81
    } else {
      left.value = 0
    }
    clearTimeout(timer.value)
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScrollStart)
  nextTick(() => {
    const div = iconDrav.value
    div.addEventListener('touchstart', () => {
      div.style.transition = 'none'
    })
    div.addEventListener('touchmove', (e: { targetTouches: string | any[] }) => {
      if (e.targetTouches.length === 1) {
        document.body.addEventListener('touchmove', bodyScroll, { passive: false })
        let touch = event.targetTouches[0]
        left.value = touch.clientX - 35 //组件的宽度是50
        top.value = touch.clientY - 35
      }
    })
    div.addEventListener('touchend', () => {
      document.body.removeEventListener('touchmove', bodyScroll, { passive: false }) //解除页面禁止滑动
      div.style.transition = 'all 0.3s'
      if (left.value > document.documentElement.clientWidth / 2) {
        left.value = document.documentElement.clientWidth - 81
      } else {
        left.value = 10
      }
    })
  })
  const bodyScroll = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }
  getIndexList().then((res) => {
    const { banners, guests, meetings, reporters } = res.data
    bannersArr.value = banners
    reportersArr.value = reporters
    meetingsArr.value = meetings
    guestsArr.value = guests.slice(0, 3)
  })
  const { data } = await getUserInfo()
  localStorage.setItem('user', JSON.stringify(data))
})
</script>

<style lang="scss" scoped>
.home {
  .header {
    background: #fff;
  }

  .main {
    background: #fff;
    margin-top: 6px;
    padding: 18px;
  }

  .report-swiper {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    img {
      width: 172px !important;
      height: 101px !important;
      display: block;
      margin-bottom: 12px;
      margin-right: 16px;
      border-radius: 4px;
    }

    .report-title {
      margin-bottom: 6px;
      font-size: 14px;
      color: #4a4a4a;
      line-height: 20px;
      width: 172px;
      @include text-overflow(1);
    }

    .report-name {
      font-size: 12px;
      color: #9b9b9b;
      line-height: 17px;
    }
  }

  .main-report {
    margin-bottom: 24px;
  }
  .meeting {
    .meeting-item {
      display: flex;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(155, 155, 155, 0.21);
      img {
        width: 131px;
        height: 84px;
        border-radius: 4px;
        display: block;
        margin-right: 12px;
      }
      .meeting-right {
        width: 200px;
        font-family: PingFangSC-Regular, PingFang SC;
        .meeting-title {
          font-size: 14px;
          font-weight: 600;
          color: #4a4a4a;
          line-height: 20px;
          margin-bottom: 7px;
          @include text-overflow(3);
        }
        .meeting-name {
          font-size: 11px;
          font-weight: 400;
          color: #9b9b9b;
          line-height: 16px;
          margin-bottom: 7px;
        }
      }
    }
  }
  .specialist {
    .specialist-item {
      overflow: hidden;
      width: 319px;
      height: 125px;
      border-radius: 4px;
      position: relative;
      padding: 12px 14px;
      display: flex;
      margin-bottom: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      img {
        width: 95px;
        height: 125px;
        margin-right: 12px;
        border-radius: 4px;
      }
      .item-name {
        font-size: 16px;
        font-weight: 500;
        color: #4a4a4a;
        line-height: 22px;
        margin-bottom: 6px;
        @include text-overflow(1);
      }
      .item-right {
        width: 180px;
      }
      .item-title {
        font-size: 13px;
        font-weight: 400;
        color: #9b9b9b;
        line-height: 18px;
        @include text-overflow(3);
      }
      .item-details {
        position: absolute;
        right: 14px;
        bottom: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #3771d9;
        line-height: 20px;
      }
    }
    .specialist-palegreen {
      transform: rotate(135deg);
      position: absolute;
      right: -44px;
      top: -44px;
      //border-radius: 4px;
      /* 给定四个边框大小、实线、这里为了隐藏将边款颜色设置为透明色 */
      border: 45px solid transparent;
      /* 给需要留下的边框给定边框颜色，让其显示出来 */
      //border-right: 45px solid peru;
    }
    .specialist-ranking {
      position: absolute;
      right: 7px;
      top: 5px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 21px;
    }
  }
  .border_pt12 {
    padding-top: 15px;
  }
  .bg_orange {
    background: #feebcc;
  }
  .bg_blue {
    background: #e9f2f1;
  }
  .bg_green {
    background: #edf7e1;
  }
  .palegreen_orange {
    background: #ff1942;
  }
  .palegreen_blue {
    background: #e8471c;
  }
  .palegreen_green {
    background: #ff8c00;
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    //object-fit: cover;
  }
  .search-bar-input {
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: #f0f0f2;
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    border-radius: 16px;
    padding: 5px 14px;
    box-sizing: border-box;
    z-index: 2;
    .search-text {
      margin-left: 13px;
      color: $text-color;
      flex: 1;
    }

    .search-btn {
      color: #3771d9;
      font-weight: 500;
    }
  }
  .search {
    position: relative;
    z-index: 3;
    background: #fff;
    padding: 10px 16px;
  }
  .right-icon {
    transition: all 0.3s;
    position: fixed;
    width: 71px;
    height: 71px;
    //top: 501px;
    //left: 304px;
    z-index: 4;
  }
}
</style>
