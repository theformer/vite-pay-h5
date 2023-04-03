<template>
  <div class="history-container">
    <div class="header-tab">
      <span
        v-for="(tab, index) in tabList"
        :class="{ active: tabIndex === index }"
        @click="tabIndex = index"
        >{{ tab }}
      </span>
    </div>
    <div class="list-container">
      <component :is="getCurrentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Overview from '../components/Overview.vue'
import Report from '../components/Report.vue'
import Expert from '../components/Expert.vue'
const tabList = ['学术报告', '学术专家', '学术综述']
const tabIndex = ref(0)
const getCurrentComponent = computed(() => {
  const components: { [key: number]: any } = {
    0: Report,
    1: Expert,
    2: Overview
  }
  return components[tabIndex.value]
})
</script>

<style scoped lang="scss">
.history-container {
  background-color: #fff;
  min-height: 100vh;
}

.header-tab {
  background-color: #fff;
  padding: 30px 15px;

  span {
    font-size: 15px;
    color: $text-color;
    margin-right: 37px;

    &.active {
      color: $theme-color;
    }
  }
}
.list-container {
  flex: 1;
}
</style>
