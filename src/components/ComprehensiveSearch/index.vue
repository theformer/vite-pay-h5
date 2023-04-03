<template>
  <div class="comprehensive-search">
    <div
      style="min-height: 80vh"
      v-if="
        (props.articles && props.articles.length > 0) ||
        (props.reporters && props.reporters.length > 0) ||
        (props.guests && props.guests.length > 0)
      "
    >
      <div class="search-study" v-if="props.articles && props.articles.length > 0">
        <SearchTitle title="学术综述系列" />
        <div
          class="search-item"
          v-for="(item, index) in props.articles"
          :key="index"
          @click="handleCheckDetail(item.id, 1)"
        >
          <div class="left-avatar">
            <slot>
              <div class="avatar">综述</div>
            </slot>
          </div>
          <div class="item-box" style="width: 300px">
            <div class="item-title">{{ item.meetingName }}</div>
            <div class="item-type">{{ OVERVIEW_TYPE[item.type - 1].label }}</div>
            <div class="item-type">{{ item.createTime && item.createTime.slice(0, 10) }}</div>
          </div>
        </div>
      </div>
      <div class="search-report" v-if="props.reporters && props.reporters.length > 0">
        <SearchTitle title="学术报告系列" />
        <div
          class="report-text"
          v-if="props.reporters.filter((e) => e.reporterType == 1)?.length > 0"
        >
          报告视频
        </div>
        <div
          v-for="(item, index) in props.reporters.filter((e) => e.reporterType == 1)"
          :key="index"
          class="report-item"
          @click="handleClickToLink(item)"
        >
          <img :src="item.reporterCover" alt="" />
          <div class="item-text">
            <div class="text-title">{{ item.title }}</div>
            <div class="item-name">报告人：{{ item.reporterName }}</div>
          </div>
        </div>
        <div
          class="report-text"
          v-if="props.reporters.filter((e) => e.reporterType == 2)?.length > 0"
        >
          报告文件
        </div>
        <div
          v-for="(item, index) in props.reporters.filter((e) => e.reporterType == 2)"
          :key="index"
          class="report-item"
          @click="handleClickToLink(item)"
        >
          <img :src="item.reporterCover" alt="" />
          <div class="item-text">
            <div class="text-title">{{ item.title }}</div>
            <div class="item-name">报告人：{{ item.reporterName }}</div>
          </div>
        </div>
      </div>
      <div class="search-specialist" v-if="props.guests && props.guests.length > 0">
        <SearchTitle title="学术专家系列" />
        <div
          v-for="(item, index) in props.guests"
          :key="index"
          class="specialist-item"
          @click="handleCheckDetail(item.id, 3)"
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
    </div>
    <div v-else style="min-height: 65vh">
      <img class="nodata" src="../../assets/images/nodata.png" alt="" />
      <div class="nodata-text">没有更多了</div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script setup>
import SearchTitle from './components/SearchTitle.vue'
import { OVERVIEW_TYPE } from '@/utils'
const props = defineProps(['articles', 'guests', 'reporters'])
import { useRouter } from 'vue-router'
import useAuthLogin from '@/hooks/useAuthLogin'
import { getReportDetail } from '@/api'
const router = useRouter()
const handleClickToLink = (item) => {
  useAuthLogin().then(() => {
    if (item.reporterType == 1) {
      getReportDetail({ id: item.id }).then((res) => {
        if (res.code == 200) {
          window.location.href = item.detailsLink
        }
      })
    } else {
      router.push({ name: 'pdfPreview', params: { url: item.fileUrl } })
    }
  })
}
const handleCheckDetail = (id, number) => {
  console.log(id, number, '111111')
  if (number == 1) {
    router.push({ path: '/overviewDetail', query: { id } })
  } else if (number == 3) {
    router.push({ name: 'expertDetail', query: { id } })
  }
}
</script>

<style scoped lang="scss">
.comprehensive-search {
  padding: 5px 16px;
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
  .search-study {
    //padding-bottom: 13px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.21);
    margin-bottom: 20px;
  }

  .search-item {
    display: flex;
    margin-bottom: 20px;
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
  .search-report {
    margin-bottom: 20px;
    //height: 187px;
  }
  .report-item {
    position: relative;
    margin-bottom: 20px;
    height: 187px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
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
      //margin: 0 auto;

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
        line-height: 16px;
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
      //width: 100%;
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
        width: 200px;
        height: 22px;
        @include text-overflow(1);
      }
      .item-details {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3771d9;
        line-height: 20px;
        height: 22px;
        width: 60px;
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
}
.nodata {
  width: 197px;
  height: 128px;
  display: block;
  margin: 0 auto;
  margin-top: 109px;
}
.nodata-text {
  color: var(--van-list-text-color);
  font-size: var(--van-list-text-font-size);
  line-height: var(--van-list-text-line-height);
  text-align: center;
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
