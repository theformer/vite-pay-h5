<template>
  <div class="search-bar-container">
    <div class="search" @click="router.push('/search')">
      <div class="search-bar-input">
        <van-icon name="search" size="25" color="#9b9b9b" />
        <span class="search-text">请输入你想搜索的</span>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-list">
        <div class="filter-item" :style="filterWidth">{{ fileCountText }}</div>
        <div class="filter-item" @click="showPopup" :style="filterWidth">
          <van-space>
            <span>{{ queryParam.annualName }}</span>
            <van-icon name="arrow-down" />
          </van-space>
        </div>
        <div class="filter-item" @click="systemClassifyRef = true" v-if="showFilter !== 1">
          <van-space>
            <span>会议分类</span>
            <van-icon name="arrow-down" />
          </van-space>
        </div>
      </div>
    </div>
    <DropDown @change="handleAnnualChange" v-model:show="show" />
    <van-overlay :show="show" @click="show = false" />
  </div>

  <van-popup
    v-model:show="systemClassifyRef"
    position="right"
    :style="{ height: '100%', width: '80%' }"
  >
    <MeetingClassify @change="handleClassifyChange" />
  </van-popup>
</template>

<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue'
import DropDown from '../DropDown/index.vue'
import MeetingClassify from '../MeetingClassify/index.vue'
import { IAnnual } from '@/utils'
import { useRouter } from 'vue-router'
import { IFileCount } from '@/api/types/classify'

/*export interface Props {
  showFilter: number
  fileCount: {
    type: Object as PropType<IFileCount>
  }
}*/

export interface QueryParamProps {
  annual?: number
  annualName?: string
  meetingId?: number | string
}

const router = useRouter()
const props = defineProps({
  showFilter: Number,
  fileCount: {
    type: Object as PropType<IFileCount>
  }
})
const emits = defineEmits<{
  (e: 'change', value: QueryParamProps): void
}>()

const show = ref(false)
const systemClassifyRef = ref(false)
const queryParam = reactive<QueryParamProps>({
  annualName: '届次选择'
})
const filterWidth = computed(() => (props.showFilter !== 1 ? { width: '33%' } : { width: '50%' }))
const fileCountText = computed(() => {
  if ([0, 2].includes(props.showFilter || 0)) {
    const count =
      props.showFilter === 0 ? props.fileCount?.reporterTotal : props.fileCount?.articleTotal
    // 显示多少份文件
    return `共有${count || 0}份文件`
  } else {
    // 显示多少人
    return `共有${props.fileCount?.guestsTotal || 0}位专家`
  }
})
const showPopup = () => {
  show.value = !show.value
}

// 切换届份回调
const handleAnnualChange = (e: IAnnual) => {
  queryParam.annual = e.id
  queryParam.annualName = e.label
  queryChange()
}

// 会议分类变更回调
const handleClassifyChange = (e: number | string) => {
  systemClassifyRef.value = false
  queryParam.meetingId = e
  queryChange()
}

const queryChange = () => {
  emits('change', queryParam)
}
</script>

<style scoped lang="scss">
@import 'index';
</style>
