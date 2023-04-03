<template>
  <div class="overview-search">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-if="props.tabsVal == 3">
          <div v-if="list.articles && list.articles.length > 0">
            <div
              class="search-item"
              v-for="(item, index) in list.articles"
              :key="index"
              :class="index != 0 ? 'pt_18' : ''"
              @click="handleCheckDetail(item.id, 1)"
            >
              <div class="left-avatar">
                <slot>
                  <div class="avatar">综述</div>
                </slot>
              </div>
              <div class="item-box">
                <div class="item-title">{{ item.meetingName }}</div>
                <div class="item-type">{{ OVERVIEW_TYPE[item.type - 1].label }}</div>
                <div class="item-type">{{ item.createTime && item.createTime.slice(0, 10) }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <img class="nodata" src="../../assets/images/nodata.png" alt="" />
          </div>
        </div>
        <div v-else-if="props.tabsVal == 1">
          <div class="report-classify">
            <div
              v-for="(item, index) in nav"
              :class="[index === 0 ? 'mt_0' : '', actived == index ? 'nav-btn' : '']"
              class="classify-item"
              :key="index"
              @click="handleClickNavText(index)"
            >
              {{ item.label }}
            </div>
          </div>
          <div v-if="list.reporters?.length > 0">
            <div
              class="report-text"
              v-if="list.reporters.filter((e) => e.reporterType == 1)?.length > 0"
            >
              报告视频
            </div>
            <div
              v-for="(item, index) in list.reporters.filter((e) => e.reporterType == 1)"
              @click="handleCheckToLink(item)"
              :key="index"
              class="report-item"
            >
              <img :src="item.reporterCover" alt="" />
              <div class="item-text">
                <div class="text-title">{{ item.title }}</div>
                <div class="item-name">报告人：{{ item.reporterName }}</div>
              </div>
            </div>
            <div
              class="report-text"
              v-if="list.reporters.filter((e) => e.reporterType == 2)?.length > 0"
            >
              报告文件
            </div>
            <div
              v-for="(item, index) in list.reporters.filter((e) => e.reporterType == 2)"
              @click="handleCheckToLink(item)"
              :key="index"
              class="report-item"
            >
              <img :src="item.reporterCover" alt="" />
              <div class="item-text">
                <div class="text-title">{{ item.title }}</div>
                <div class="item-name">报告人：{{ item.reporterName }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <img class="nodata" src="../../assets/images/nodata.png" alt="" />
          </div>
        </div>
        <div v-else>
          <div v-if="list.guests && list.guests.length > 0">
            <div
              v-for="(item, index) in list.guests"
              @click="handleCheckDetail(item.id, 3)"
              :key="index"
              class="specialist-item"
            >
              <img :src="item.imgUrl" alt="" />
              <div class="item-right">
                <div class="item-box">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-details">查看详情</div>
                </div>
                <div class="item-ant">{{ item.guests }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <img class="nodata" src="../../assets/images/nodata.png" alt="" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <Footer class="footer" />
  </div>
</template>

<script setup>
import { ref, defineExpose, watch, nextTick } from 'vue'
const props = defineProps(['tabsVal', 'searchVal', 'articles', 'guests', 'reporters'])
import { getReportDetail, getSearchList } from '@/api'
import { OVERVIEW_TYPE } from '@/utils'
import { useRouter } from 'vue-router'
import useAuthLogin from '@/hooks/useAuthLogin'
const nav = ref([
  { label: '全部', value: 0 },
  { label: '视频报告', value: 1 },
  { label: '报告文件', value: 2 }
])
const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const actived = ref(0)
let searchParams = ref({
  ps: 10,
  pn: 1,
  type: props.tabsVal,
  keywords: props.searchVal,
  reporterType: props.reporterType
})
let flag = ref(false)
let list = ref({})
watch(
  () => props.tabsVal,
  (count, prevCount) => {
    if (count) {
      searchParams.value.pn = 1
      onRefresh()
    }
    /* ... */
  }
)
const handleCheckDetail = (id, number) => {
  console.log(id, number, '111111')
  if (number == 1) {
    router.push({ path: '/overviewDetail', query: { id } })
  } else if (number == 3) {
    router.push({ name: 'expertDetail', query: { id } })
  }
}
const handleCheckToLink = (item) => {
  useAuthLogin().then(() => {
    if (item.reporterType == 1) {
      getReportDetail({ id: item.id }).then((res) => {
        if (res.code == 200) {
          window.location.href = item.detailsLink
        }
      })
    } else {
      router.push({ name: 'pdfPreview', params: { url: item.fileUrl } })
      // location.href = `https://view.xdocin.com/view?src=${item.fileUrl}&printable=false&title=${item.title}`
    }
  })
}
const onLoad = async (value) => {
  searchParams.value.type = props.tabsVal == 3 ? 1 : props.tabsVal == 2 ? 3 : 2
  searchParams.value.keywords = props.searchVal
  searchParams.value.reporterType = actived.value == 0 ? '' : actived.value
  console.log(searchParams.value, searchParams.value.reporterType, '我是返回的searchvalue')
  await getSearchList(searchParams.value).then((res) => {
    if (refreshing.value) {
      list.value = {}
      refreshing.value = false
    }
    if (
      (searchParams.value.pn == 1 && props.tabsVal == 3 && res.data.articles.length == 0) ||
      (props.tabsVal == 1 && res.data.reporters.length == 0) ||
      (props.tabsVal == 2 && res.data.guests.length == 0)
    ) {
      flag.value = true
    } else {
      flag.value = false
    }
    if (searchParams.value.pn == 1) {
      list.value = res.data
    } else {
      if (props.tabsVal == 1 && res.data.reporters.length > 0) {
        list.value.reporters = list.value.reporters.concat(res.data.reporters)
      } else if (
        props.tabsVal == 1 &&
        res.data.reporters.length == 0 &&
        list.value.reporters.length == 0
      ) {
        list.value.reporters = []
      }
      if (props.tabsVal == 2 && res.data.guests.length > 0) {
        list.value.guests = list.value.guests.concat(res.data.guests)
      } else if (
        props.tabsVal == 2 &&
        res.data.guests.length == 0 &&
        list.value.guests.length == 0
      ) {
        list.value.guests = []
      }
      if (props.tabsVal == 3 && res.data.articles.length > 0) {
        list.value.articles = list.value.articles.concat(res.data.articles)
      } else if (
        props.tabsVal == 3 &&
        res.data.articles.length == 0 &&
        list.value.articles.length == 0
      ) {
        list.value.articles = []
      }
      // list.value = list.value.concat(res.data)
    }
    loading.value = false
    if (
      (props.tabsVal == 1 && res.data.reporters.length < 10) ||
      (props.tabsVal == 2 && res.data.guests.length < 10) ||
      (props.tabsVal == 3 && res.data.articles.length < 10)
    ) {
      finished.value = true
    } else {
      searchParams.value.pn++
    }
  })
}
const onRefresh = () => {
  // 清空列表数据
  console.log(props.reporterType, '我是返回的值')
  searchParams.value.pn = 1
  finished.value = false
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  nextTick(() => {
    onLoad()
  })
}
const handleClickNavText = (index) => {
  actived.value = index
  searchParams.value.pn = 1
  onLoad()
}
defineExpose({
  onLoad,
  onRefresh
})
</script>

<style scoped lang="scss">
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
  margin-right: 10px;
}
.overview-search {
  padding: 0px 16px;
}
:deep(.van-search__field) {
  background-color: transparent !important;
}
:deep(.van-search__action) {
  color: #3771d9 !important;
  font-weight: 500 !important;
}
.pt_18 {
  padding-top: 18px;
}
.search-item:last-child {
  border-bottom: none;
}
.search-item {
  display: flex;
  padding-bottom: 17px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.21);
  img {
    display: block;
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }

  .item-title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4a4a4a;
    line-height: 22px;
    margin-bottom: 4px;
    @include text-overflow(1);
  }

  .item-type {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9b9b9b;
    line-height: 17px;
    margin-bottom: 4px;
    @include text-overflow(1);
  }
}
.report-item {
  position: relative;
  margin-bottom: 20px;
  //width: 331px;
  height: 187px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px 6px;
    display: block;
  }

  .item-text {
    position: absolute;
    //width: 296px;
    height: 33px;
    padding: 4px 19px;
    background: rgba(0, 0, 0, 0.72);
    border-radius: 0px 0px 6px 6px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    .text-title {
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #f3f5fa;
      line-height: 18px;
      @include text-overflow(1);
    }

    .item-name {
      font-size: 11px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #f3f5fa;
      width: 320px;
      line-height: 16px;
      height: 16px;
      @include text-overflow(1);
    }
  }
}
.specialist-item {
  display: flex;
  margin-bottom: 20px;
  .item-right {
    flex: 1;
    padding-right: 41px;
  }
  img {
    width: 70px;
    height: 104px;
    display: block;
    margin-right: 12px;
    border-radius: 6px;
  }
  .item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-name {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4a4a4a;
      line-height: 22px;
      margin-bottom: 7px;
      width: 100px;
      @include text-overflow(1);
    }
    .item-details {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3771d9;
      line-height: 20px;
      height: 16px;
      //width: 300px;
      @include text-overflow(3);
    }
  }
  .item-ant {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9b9b9b;
    line-height: 20px;
    @include text-overflow(3);
  }
}
:deep(.van-pull-refresh) {
  min-height: 80vh;
}
.nodata {
  width: 197px;
  height: 128px;
  display: block;
  margin: 0 auto;
  margin-top: 109px;
}
.report-classify {
  display: flex;
  padding-bottom: 24px;
  .classify-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 25px;
    background: rgba(155, 155, 155, 0.23);
    border-radius: 13px;
    margin-left: 16px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #a0a0a0;
    line-height: 20px;
  }
  .mt_0 {
    margin-left: 0;
  }
  .nav-btn {
    background: #9ab7eb !important;
    color: #3771d9 !important;
  }
}
.report-text {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4a4a4a;
  line-height: 20px;
  margin-bottom: 12px;
}
</style>
