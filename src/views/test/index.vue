<template>
  <div v-if="flag">
    <TestNoticeBar :text="videoBasic.announcement" />
    <div class="grid-list">
      <div
        class="item-list list-text"
        :class="gridText == index ? 'activeText' : ''"
        v-for="(item, index) in videoBasic.searchClassify"
        :key="index"
        @click="handleClickGridText(index, item)"
      >
        {{ item }}
      </div>
      <div class="search-form">
        <span class="freeMovie" @click="showQrCode = true">免费电影</span>
        <van-search class="search-frame" v-model="searchVal" placeholder="请输入搜索关键词" />
        <span class="search-ant" @click="handleClickToSearch">搜索</span>
      </div>
    </div>
    <div v-if="moviePlayStatus" class="">
      <AccounBbinding :url="posterPlayUrl" :title="movieObj.title" />
    </div>
    <div v-if="!complaintStatus">
      <div class="video-play"></div>
      <div class="movie-list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :offset="100"
          finished-text="没有更多了"
          @load="loadData"
        >
          <div class="list-item" v-for="(item, index) in movieList" :key="index">
            <div class="item-watchTime">
              <img style="margin-right: 3px" src="@/assets/icon/watch.png" alt="" />
              <span style="padding-right: 2px">{{ secTotime(item.duration) }}</span>
            </div>
            <div class="item-number" v-if="item.exp == 0">
              <span>{{ `已有${item.view}人付费` }}</span>
              <span style="color: red">{{ item?.buyInfo.useMoney }}</span
              >元观看
            </div>
            <div v-else class="item-number" style="text-align: center; color: red; width: 95%">
              有效日期 ：{{ item.exp }}日失效
            </div>
            <img @click="handleClickToBuyMovie(item)" class="movie-cover" :src="item.url" />
            <div class="item-description">{{ item.title }}</div>
          </div>
        </van-list>
        <BuyMovieOverlay
          v-if="showMovie"
          :show="showMovie"
          :title="movieObj.title"
          :img-url="movieObj.url"
          :user-money="movieObj.buyInfo?.useMoney"
          :user-gold="movieObj.buyInfo?.useGold"
          :user-all-gold="userGold"
          @see-movie="handleClickSeeMovie"
          @to-vip="handleClickToVip"
          @close="closeOverlay"
        />
        <ShareQrCode v-if="showQrCode" :show="showQrCode" @close="closeShareQrCode" />
      </div>
    </div>
    <div v-else>
      <div class="complaint background-list">
        <div
          style="font-weight: 600"
          class="list-text border-right"
          @click="handleClickComplaint(index, item)"
          v-for="(item, index) in complaintList"
          :class="complaintIndex == index ? 'activeText' : ''"
        >
          {{ item.title }}
        </div>
      </div>
      <component :is="tabs[complaintText]" class="tab"></component>
    </div>
    <Tabbar v-if="showTab" @update="handleClickToChangeComplaintStatus" />
  </div>

  <div v-else class="loading">
    <div class="loading-text">正在加载中</div>
    <van-progress class="loading-progress" troke-width="8" :percentage="percentage" />
    <div class="annular" @click="handleClickToGoHome">点我手动加载</div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed, onBeforeMount, onUnmounted } from 'vue'
const route = useRoute()
import TestNoticeBar from '@/views/test/components/TestNoticeBar.vue'
import BuyMovieOverlay from '@/views/test/components/BuyMovieOverlay.vue'
import ShareQrCode from '@/views/test/components/ShareQrCode.vue'
import OrderComplaint from '@/views/test/components/OrderComplaint.vue'
import VIPPay from '@/views/test/components/VIPPay.vue'
import GoldPay from '@/views/test/components/GoldPay.vue'
import MessageList from '@/views/test/components/MessageList.vue'
import AccountInfo from '@/views/test/components/AccountInfo.vue'
import AccounBbinding from '@/views/test/components/AccounBbinding.vue'
import { MovieObjProps, VideoBasic } from '@/api/types/test'
import { $deepcopy, createHash, secTotime } from '@/utils'
import { updateUserInfo, getConfigNode, getQueryNode, getQueryVideo } from '@/api/test'
import Tabbar from '@/components/Layout/Tabbar.vue'
import { useStore } from 'vuex'
const store = useStore()
const complaintStatus = ref(false)
const moviePlayStatus = ref(false)
let gridText = ref(0)
let complaintIndex = ref(0)
const posterPlayUrl = ref('')
let movieObj = ref<MovieObjProps>({
  title: '',
  url: '',
  poster: ''
})
const tabs = {
  OrderComplaint,
  VIPPay,
  GoldPay,
  MessageList,
  AccountInfo
}
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
const classifyKeyWord = ref('')
const videoBasic = ref<VideoBasic>({
  announcement: '',
  searchClassify: []
})
const videoQuery = ref({})
const complaintText = ref('OrderComplaint')
const userGold = ref(0)
const complaintList = ref([
  { title: '订单', name: 'OrderComplaint' },
  { title: 'VIP充值', name: 'VIPPay' },
  { title: '金币充值', name: 'GoldPay' },
  { title: '消息', name: 'MessageList' },
  { title: '账户', name: 'AccountInfo' }
])
const searchQuery = {
  count: 1,
  row: 20,
  hash: localStorage.getItem('hash'),
  keywords: searchVal.value,
  classifyKeyWord: ''
}
let movieList = ref([])
let percentageSecond = ref(0)
const handleClickToChangeComplaintStatus = () => {
  complaintStatus.value = !complaintStatus.value
}
const handleClickGridText = (index: number, item: string) => {
  if (complaintStatus.value) {
    complaintStatus.value = !complaintStatus.value
  }
  gridText.value = index
  classifyKeyWord.value = item
  handleClickToSearch()
}
const handleClickComplaint = (index: number, item: { name: string }) => {
  console.log(index, item, '我是返回值')
  complaintIndex.value = index
  complaintText.value = item.name
}
const closeShareQrCode = () => {
  showQrCode.value = false
}
const closeOverlay = () => {
  showMovie.value = false
}
const handleClickSeeMovie = () => {
  moviePlayStatus.value = true
  posterPlayUrl.value = movieObj.poster
  closeOverlay()
}
const handleClickToVip = () => {
  showMovie.value = false
  complaintStatus.value = !complaintStatus.value
  complaintIndex.value = 1
  complaintText.value = 'VIPPay'
}
const handleClickToBuyMovie = async (item: any) => {
  movieObj.value = await $deepcopy(item)
  showMovie.value = true
}
onBeforeMount(() => {
  // let url = window.location.href
  const { hash, up_node_hash } = route.query
  localStorage.setItem('hash', hash || createHash(16))
  localStorage.setItem('up_node_hash', up_node_hash)
  initSocket()
})
const initSocket = () => {
  store.commit('initWebsocket')
}

onUnmounted(() => {
  store.state.webSocket.close()
})
onMounted(async () => {
  setInterval(() => {
    percentageSecond.value++
    if (percentageSecond.value <= 100) {
      percentage.value = percentageSecond.value
      if (percentage.value == 100 && store.state.goHomeStatus == 0) {
        flag.value = true
        getUserInfo()
      }
    }
  }, 80)
})
const handleClickToGoHome = () => {
  if (store.state.goHomeStatus == 0) {
    flag.value = true
    percentageSecond.value = 100
    getUserInfo()
  }
}
const getUserInfo = async () => {
  let params = {
    node_type: 'Common',
    hash: localStorage.getItem('hash'),
    up_node_hash: localStorage.getItem('up_node_hash')
  }
  const { code } = await updateUserInfo(params)
  await getConfigNodeObj()
  await getQueryNodeObj()
}
const getConfigNodeObj = async () => {
  let param = {
    hash: localStorage.getItem('hash')
  }
  const { code, data } = await getConfigNode(param)
  if (code == 0) {
    data.basic.searchClassify = ['全部', ...JSON.parse(data.basic?.searchClassify)]
    videoBasic.value = data.basic
  }
}
const getQueryNodeObj = async () => {
  let param = {
    hash: localStorage.getItem('hash')
  }
  const { code, data } = await getQueryNode(param)
  if (code == 0) videoQuery.value = data
  userGold.value = data.gold
  localStorage.setItem('userInfo', JSON.stringify(data))
}
const handleClickToSearch = () => {
  movieList.value = []
  searchQuery.keywords = searchVal.value
  searchQuery.classifyKeyWord =
    classifyKeyWord.value == '' || classifyKeyWord.value == '全部' ? '' : classifyKeyWord.value
  searchQuery.count = 1
  loadData()
}
const loadData = async () => {
  finished.value = false
  loading.value = true
  console.log(searchQuery, '11111')
  const { code, data } = await getQueryVideo(searchQuery)
  if (code == 0 && data.length != 0) {
    movieList.value = movieList.value.concat(data)
    loading.value = false
    searchQuery.count++
    console.log(data.length, '我是返回过来的长度')
    if (data.length < 20) finished.value = true
  } else {
    finished.value = true
    loading.value = false
    movieList.value = []
  }
}
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
  height: 65vh;
  //overflow-y: auto;
  .van-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ::v-deep {
      .van-list__finished-text {
        width: 100%;
      }
    }
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
}
.complaint {
  display: flex;
  justify-content: space-around;
  border: 2px solid #bababb;
  div {
    flex-grow: 1;
  }
  &:last-child {
    border-right: 0;
  }
}
.item-list {
  width: 50px;
  height: 29px;
  line-height: 29px;
  border-radius: 10px 10px 10px 10px;
}
.list-text {
  border-radius: 10px 10px 10px 10px;
  color: white;
  font-size: 16px;
  text-align: center;
  font-family: Arial;
  margin-bottom: 5px;
}
.border-right {
  margin-bottom: 0;
  padding: 10px 0;
  border-radius: 0;
  border-right: 2px solid #bababb;
}
.activeText {
  color: rgba(232, 13, 13, 1);
  background-color: #e4fb1f;
}
</style>
