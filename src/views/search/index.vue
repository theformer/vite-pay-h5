<template>
  <div class="index">
    <van-search
      class="search-input"
      show-action
      v-model.trim="value"
      maxlength="30"
      placeholder="请输入你想搜索的"
      @search="onSearch"
      @cancel="onCancel"
    >
      <template #action>
        <div @click="onSearch" class="search-text">搜索</div>
      </template>
      <template #right-icon>
        <img
          @click="onCancel"
          class="right-icon"
          src="../../assets/icon/search.png"
          style="width: 21px; height: 21px"
          :class="value ? 'display-block' : ''"
          alt=""
        />
      </template>
    </van-search>
    <div class="tabs">
      <div
        v-for="(item, index) in tabs"
        :class="activeName == index ? 'tabs-active' : ''"
        class="tabs-item"
        :key="index"
        @click="handleChangeTabs(index)"
      >
        {{ item.label }}
      </div>
    </div>

    <!--    <van-tabs v-model:active="activeName" @change="handleChangeTabs">-->
    <!--      <van-tab v-for="(item, index) in tabs" :key="index" :title="item.label" :name="item.value">-->
    <ComprehensiveSearch
      v-if="activeName == 0"
      ref="comprehensiveSearch"
      :articles="articlesArr && articlesArr.length > 0 ? articlesArr : []"
      :guests="guestsArr && guestsArr.length > 0 ? guestsArr : []"
      :reporters="reportersArr && reportersArr.length > 0 ? reportersArr : []"
    />
    <OverviewSearch
      v-else
      :searchVal="searchValue"
      :reporterType="reporterType"
      :tabsVal="activeName"
      ref="overView"
    />
    <!--      </van-tab>-->
    <!--    </van-tabs>-->
  </div>
</template>

<script setup lang="ts">
import ComprehensiveSearch from '@/components/ComprehensiveSearch/index.vue'
import OverviewSearch from '@/components/OverviewSearch/index.vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { getSearchList } from '@/api'
const tabs = reactive([
  {
    label: '综合',
    value: 0
  },
  {
    label: '学术报告',
    value: 1
  },
  {
    label: '学术专家',
    value: 2
  },
  {
    label: '学术综述',
    value: 3
  }
])
let overView = ref(null)
const value = ref('')
const searchValue = ref('')
const activeName = ref(0)
const reporterType = ref('')
let searchParams = ref({
  ps: 10,
  pn: 1,
  type: activeName,
  keywords: value,
  reporterType: reporterType
})
let articlesArr = ref([])
let guestsArr = ref([])
let reportersArr = ref([])
const onSearch = () => {
  searchValue.value = value.value
  nextTick(() => {
    if (activeName.value != 0) {
      overView.value.onRefresh()
    } else {
      getList()
    }
  })
}
const onCancel = () => {
  searchParams.value.keywords = ''
  searchValue.value = ''
  searchParams.value.reporterType = ''
  console.log(searchValue.value, '我走的是这个，搜索值为空')
  if (activeName.value == 0) {
    getList()
  } else {
    nextTick(() => {
      overView.value.onRefresh()
    })
  }
}
const handleChangeTabs = (index) => {
  searchParams.value.pn = 1
  activeName.value = index
  if (activeName.value == 0) {
    getList()
  } else {
    nextTick(() => {
      console.log(overView.value, '我是2222222是啊')
      // overView.value.onLoad()
    })
  }
}
const getList = async () => {
  searchParams.value.pn = 1
  let { data } = await getSearchList(searchParams.value)
  articlesArr.value = data.articles && data.articles
  guestsArr.value = data.guests && data.guests
  reportersArr.value = data.reporters && data.reporters
}

onMounted(async () => {
  console.log(overView, '我是是3333啊')
  await getList()
})
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  background: #ffffff;
  height: 100vh;
  overflow-x: hidden;
  .tabs {
    display: flex;
    padding: 0 16px;
    margin-bottom: 24px;
    .tabs-active {
      font-weight: 500 !important;
      color: #3771d9 !important;
    }
    .tabs-item {
      font-weight: 400;
      color: #9b9b9b;
      font-size: 15px !important;
      line-height: 21px !important;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-right: 30px;
    }
  }

  ::v-deep {
    .van-tab--active {
      font-weight: 500 !important;
      color: #3771d9 !important;
      //line-height: 21px;
    }
    .van-tabs__nav {
      padding: 0 16px;
    }
    .van-tabs__wrap {
      margin-bottom: 12px;
    }
    .van-tab {
      flex: none;
      margin-right: 30px;
      padding: 0;
      font-weight: 400;
      color: #9b9b9b;
      font-size: 15px !important;
      line-height: 21px !important;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .van-field__right-icon .van-icon {
      display: none;
    }
    .van-field__right-icon {
      display: flex;
      align-items: center;
    }
    .van-tabs__line {
      display: none;
    }
    .van-field__left-icon {
      .van-icon {
        font-size: 25px;
      }
    }
    .van-icon-clear {
      display: none;
    }
    .van-search__content {
      border-radius: 16px;
    }
    .search-text {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3771d9;
      line-height: 20px;
    }
  }
  .right-icon {
    display: none;
  }
  .display-block {
    display: block !important;
  }
  .search-input {
    z-index: 3;
    margin-bottom: 19px;
    padding-bottom: 0;
  }
}
</style>
