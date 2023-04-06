<template>
  <div v-if="flag">
    <TestNoticeBar :text="noticeText" />
    <div class="grid-list">
      <div
        class="item-list"
        :class="gridText == index ? 'activeText' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="handleClickGridText(index)"
      >
        {{ item.title }}
      </div>
      <div class="search-form">
        <span class="freeMovie" @click="showQrCode = true">免费电影</span>
        <van-search class="search-frame" v-model="searchVal" placeholder="请输入搜索关键词" />
        <span class="search-ant">搜索</span>
      </div>
    </div>
    <div class="video-play"></div>
    <div class="movie-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadData"
        :immediate-check="false"
      >
        <div class="list-item" v-for="(item, index) in movieList" :key="index">
          <div class="item-watchTime">
            <img src="@/assets/icon/watch.png" alt="" />
            <span>{{ item.watchTime }}</span>
          </div>
          <div class="item-number" v-if="1 != 1">
            <span>{{ `已有${item.number}付费` }}</span>
            <span style="color: red">{{ item.money }}</span
            >元观看
          </div>
          <div v-else class="item-number" style="text-align: center; color: red; width: 95%">
            有效日期 ：2023.3.3日失效
          </div>
          <img
            @click="handleClickToBuyMovie(item)"
            class="movie-cover"
            src="@/assets/images/bronze.png"
          />
          <div class="item-description">{{ item.description }}</div>
        </div>
      </van-list>
      <BuyMovieOverlay
        v-if="showMovie"
        :show="showMovie"
        :title="movieObj.title"
        :img-url="movieObj.path"
        @close="closeOverlay"
      />
      <ShareQrCode v-if="showQrCode" :show="showQrCode" @close="closeShareQrCode" />
    </div>
    <Tabbar v-if="showTab" />
  </div>
  <div v-else class="loading">
    <div class="loading-text">正在加载中</div>
    <van-progress class="loading-progress" troke-width="8" :percentage="percentage" />
    <div class="annular" @click="handleClickToGoHome">点我手动加载</div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
const route = useRoute()
import TestNoticeBar from '@/views/test/components/TestNoticeBar.vue'
import BuyMovieOverlay from '@/views/test/components/BuyMovieOverlay.vue'
import ShareQrCode from '@/views/test/components/ShareQrCode.vue'
import { MovieObjProps } from '@/api/types/test'
import { $deepcopy } from '@/utils'
import { updateUserInfo } from '@/api/test'
import Tabbar from '@/components/Layout/Tabbar.vue'
let noticeText = ref('无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。')
let gridText = ref(0)
let movieObj = ref<MovieObjProps>({
  title: '',
  imgUrl: ''
})
const showTab = computed(() => {
  return route.meta.showTab
})
const percentage = ref(0)
const flag = ref(false)
let searchVal = ref(null)
const loading = ref(false)
const finished = ref(false)
const showMovie = ref(false)
const showQrCode = ref(false)
let list = ref([
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' },
  { title: '可能' }
])
let movieList = ref([
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  },
  {
    path: '@/images/bronze.png',
    watchTime: '20:20',
    number: '20',
    money: '5',
    description: '啊啊啊啊啊啊啊',
    title: '我真是傻逼'
  }
])
let percentageSecond = ref(0)
const handleClickGridText = (index: number) => {
  gridText.value = index
}
const closeShareQrCode = () => {
  showQrCode.value = false
}
const closeOverlay = () => {
  showMovie.value = false
}

const handleClickToBuyMovie = async (item: any) => {
  movieObj.value = await $deepcopy(item)
  showMovie.value = true
}
onMounted(async () => {
  // let hash = localStorage.getItem('hashCode')
  // if (!hash) {
  //   localStorage.setItem('hashCode', createHash(16))
  // }
  setInterval(() => {
    percentageSecond.value++
    if (percentageSecond.value <= 100) {
      console.log(percentage, percentageSecond.value)
      percentage.value = percentageSecond.value
      if (percentage.value == 100) {
        flag.value = true
        getUserInfo()
      }
    }
  }, 80)
})
const handleClickToGoHome = () => {
  percentageSecond.value = 100
  flag.value = true
  getUserInfo()
}
const getUserInfo = () => {
  let params = {
    node_type: 'Common',
    hash: '0992cac79ea1bd8ce5d14ffc2e5f458f',
    up_node_hash: 'fxhj3226'
  }
  updateUserInfo(params).then((res) => {
    console.log(res, '我杀返回的res')
  })
}
const loadData = async () => {}
</script>

<style lang="scss" scoped>
.van-notice-bar {
  --van-notice-bar-height: 25px;
}
.loading {
  display: flex;
  align-items: center;
  flex-direction: column;
  .loading-text {
    width: 342px;
    height: 57px;
    color: rgba(61, 186, 61, 1);
    font-size: 40px;
    font-family: PingFangSC-regular;
    text-align: center;
    margin-bottom: 35px;
    margin-top: 69px;
  }
  .annular {
    width: 175px;
    height: 161px;
    line-height: 161px;
    border-radius: 100px;
    background-color: rgba(2, 138, 88, 1);
    color: rgba(255, 253, 253, 1);
    font-size: 25px;
    text-align: center;
    font-family: Microsoft Yahei;
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .loading-progress {
    width: 356px;
    height: 20px;
    line-height: 20px;
    border-radius: 25px;
    background-color: rgba(224, 227, 234, 1);
    text-align: center;
    margin-bottom: 57px;
  }
}

.movie-list {
  padding: 6px 9px;
  display: flex;
  flex-direction: column;

  .van-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .list-item {
    position: relative;
    color: rgba(232, 13, 13, 1);
    font-size: 10px;
    text-align: left;
    font-family: PingFangSC-regular;
    padding: 3px;
    .item-watchTime {
      display: flex;
      position: absolute;
      top: 3px;
      background: #87928f;
      img {
        width: 14px;
        height: 14px;
      }
    }
    .item-number {
      position: absolute;
      bottom: 44px;
      height: 14px;
      line-height: 17px;
      opacity: 0.8;
      border-radius: 4px;
      background-color: rgb(226, 217, 233);
      color: rgba(10, 10, 10, 1);
      font-size: 12px;
      text-align: center;
      font-family: Arial;
      border: 1px solid rgba(187, 187, 187, 1);
    }
    .movie-cover {
      height: 110px;
      width: 172px;
      border-radius: 0px 4px 4px 4px;
    }
    .item-description {
      @include text-overflow(2);
      width: 165px;
      padding: 2px;
      height: 32px;
      line-height: 17px;
      border-radius: 4px;
      background-color: rgba(2, 138, 88, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
      text-align: left;
      font-family: Arial;
      border: 1px solid rgba(187, 187, 187, 1);
    }
  }
}
.search-form {
  display: flex;
  padding-top: 5px;
  .freeMovie {
    width: 96px;
    height: 29px;
    line-height: 29px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgba(228, 251, 31, 1);
    color: rgba(232, 13, 13, 1);
    font-size: 16px;
    text-align: center;
    font-family: Arial;
    margin-right: 7px;
    display: inline-block;
  }
  .search-frame {
    --van-search-input-height: 29px;
    width: 190px;
    -van-search-background: none;
    --van-search-padding: 0;
    border-radius: 8px;
    background: white;
    color: rgba(136, 136, 136, 1);
    font-size: 14px;
    text-align: left;
    font-family: Microsoft Yahei;
  }
  .search-ant {
    width: 53px;
    height: 29px;
    line-height: 29px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgba(2, 138, 88, 1);
    color: rgba(40, 255, 0, 1);
    font-size: 16px;
    text-align: center;
  }
}

.grid-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: #028958;
  color: white;
  padding: 10px;
  .item-list {
    width: 50px;
    height: 29px;
    line-height: 29px;
    border-radius: 10px 10px 10px 10px;
    color: white;
    font-size: 16px;
    text-align: center;
    font-family: Arial;
    margin-bottom: 5px;
  }
  .activeText {
    color: rgba(232, 13, 13, 1);
    background-color: #e4fb1f;
  }
}
</style>
