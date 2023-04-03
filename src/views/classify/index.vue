<template>
  <div class="classify-container">
    <SearchBar :show-filter="tabIndex" @change="handleQueryChange" :file-count="fileCount" />
    <div class="list-container">
      <ul class="left-nav">
        <li
          :class="{ active: tabIndex === index }"
          v-for="(nav, index) in tabNavList"
          :key="index"
          @click="handleNavChange(index, nav)"
        >
          <div style="z-index: 100; overflow: hidden">
            <div class="label">
              <span>{{ nav.label }}</span>
            </div>
            <div v-if="nav.children">
              <transition name="van-slide-down">
                <div v-show="tabIndex === 0">
                  <div
                    v-for="child in nav.children"
                    @click="handleNavChange(index, child)"
                    :class="['child', { active: tabId === child.id }]"
                  >
                    {{ child.label }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <!--          分类下的子分类-->
        </li>
      </ul>
      <div class="right-list" ref="rightListRef">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadData"
          :immediate-check="false"
        >
          <component :is="getCurrentComponent()" :list="list" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar, { QueryParamProps } from '@/views/classify/components/SearchBar/index.vue'
import Overview from '@/views/classify/components/Overview/index.vue'
import Report from '@/views/classify/components/Report/index.vue'
import Expert from '@/views/classify/components/Expert/index.vue'
import PPT from '@/views/classify/components/PPT/index.vue'
import { computed, onActivated, onMounted, reactive, ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import {
  getArticleClassify,
  getExertClassify,
  getFileCount,
  getReportClassify
} from '@/api/classify'
import { IFileCount, listKeyProps } from '@/api/types/classify'
import { useKeepPage } from '@/hooks/useKeepPage'

interface ComponentProps {
  [key: number]: any
}

interface TabNavProps {
  id: number
  label: string
  api?: any
  canClick: boolean
  children?: TabNavProps[]
  defaultParam?: {
    [key: string]: string | number
  }
}
const route = useRoute()
const router = useRouter()
// 左侧导航索引
const tabIndex = ref(0)
const tabId = ref(1) // 当前点击的Id值
const tabNavList: TabNavProps[] = [
  {
    id: 1,
    label: '学术报告',
    api: getReportClassify,
    canClick: false,
    children: [
      {
        id: 1,
        label: '视频报告',
        canClick: true,
        defaultParam: {
          reporterType: 1
        }
      },
      {
        id: 4,
        label: '报告文件',
        canClick: true,
        defaultParam: {
          reporterType: 2
        }
      }
    ]
  },
  { id: 2, label: '学术专家', api: getExertClassify, canClick: true },
  { id: 3, label: '学术综述', api: getArticleClassify, canClick: true }
]
const rightListRef = ref<HTMLElement | null>(null)
const scrollY = ref(0)
const queryParam = ref<QueryParamProps>({})

const list = ref<listKeyProps>({
  hot: [],
  annual23: [],
  annual24: []
})
const fileCount = ref<IFileCount>({
  reporterTotal: 0,
  articleTotal: 0,
  guestsTotal: 0
})
// 分页
const loading = ref(false)
const finished = ref(false)
const pagePagination = reactive({
  ps: 10,
  pn: 1
})
const getCurrentComponent = () => {
  const components: ComponentProps = {
    1: Report,
    2: Expert,
    3: Overview,
    4: PPT
  }
  return components[tabId.value]
}
const getCurrentFileCount = computed(() => {
  interface tabCountProps {
    [key: number]: string
  }
  const tabCount: tabCountProps = ['reporterTotal', 'guestsTotal', 'articleTotal']
  return fileCount.value[tabCount[tabIndex.value]]
})
const getCurrentTab = () => {
  for (let i = 0; i < tabNavList.length; i++) {
    const tab = tabNavList[i]
    if (tab?.children?.length) {
      return tab.children.find((child) => child.id === tabId.value)
    } else {
      return tab
    }
  }
}
if (route.query.home !== undefined) {
  console.log(route.query)
  tabIndex.value = Number(route.query.home)
  tabId.value = Number(route.query.typeId)
}
onMounted(() => {
  loadData()
})
useKeepPage(['overviewDetail', 'expertDetail'])
const loadData = async () => {
  // list.value = {}
  let query: { [key: string]: any } = {
    ...queryParam.value,
    // id是0等于全部 ，或者选择了学术专家全部改成空字符串
    meetingId:
      queryParam.value.meetingId === 0
        ? ''
        : tabIndex.value !== 1
        ? queryParam.value.meetingId
        : '',
    ...pagePagination
  }
  if ([1, 4].includes(tabId.value)) {
    query = { ...query, ...getCurrentTab()?.defaultParam }
  }

  await loadFileCount()
  const articleList = await tabNavList[tabIndex.value].api(query)
  for (const articleListKey in articleList.data) {
    // hot列表有数据，不追加数据
    if (articleListKey === 'hot') {
      list.value.hot = articleList.data.hot
    } else {
      list.value[articleListKey] = list.value[articleListKey].concat(
        articleList.data[articleListKey]
      )
    }
  }
  loading.value = false
  if (getCurrentFileCount.value <= list.value.annual24.length + list.value.annual23.length) {
    finished.value = true
  }
  pagePagination.pn++
}
const loadFileCount = async () => {
  let query = {
    ...queryParam.value,
    // id是0等于全部 ，或者选择了学术专家全部改成空字符串
    meetingId:
      queryParam.value.meetingId === 0 ? '' : tabIndex.value !== 1 ? queryParam.value.meetingId : ''
  }
  if ([1, 4].includes(tabId.value)) {
    query = { ...query, ...getCurrentTab()?.defaultParam }
  }

  const result = await getFileCount(query)
  fileCount.value = result.data
}
const handleNavChange = async (
  value: number,
  nav: { id: number; label: string; canClick: boolean }
) => {
  tabIndex.value = value
  if (!nav.canClick) return
  clearData()
  tabId.value = nav.id
  await loadData()
}

const handleQueryChange = (e: QueryParamProps) => {
  clearData()
  queryParam.value = e
  loadData()
}
const clearData = () => {
  for (const valueKey in list.value) {
    list.value[valueKey] = []
  }
  pagePagination.pn = 1
  finished.value = false
}
// 为了保存右侧列表滚动条
onBeforeRouteLeave((to, from, next) => {
  scrollY.value = (rightListRef.value as HTMLElement).scrollTop
  next()
})
onActivated(() => {
  ;(rightListRef.value as HTMLElement).scrollTop = scrollY.value
})
</script>

<style scoped lang="scss">
@import 'index';
</style>
