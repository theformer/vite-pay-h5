<template>
  <div :class="{ 'app-container': showTab }">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
      <Dialog ref="dialog" @close="close" :diaShow="diaShow" />
    </router-view>
    <Tabbar v-if="showTab" />
  </div>
</template>

<script lang="ts" setup>
import Tabbar from './Tabbar.vue'
import { useRoute } from 'vue-router'
import { computed, onBeforeMount, onMounted } from 'vue'
import Dialog from '@/views/home/components/Dialog.vue'
import emitter from '@/utils/bus'
let dialog = ref(null)
import { ref } from 'vue'
const route = useRoute()
let diaShow = ref(false)

const showTab = computed(() => {
  return route.meta.showTab
})
const close = () => {
  diaShow.value = false
}

onMounted(() => {
  emitter.on('why', (val) => {
    diaShow.value = val.flag
  })
})

onBeforeMount(() => {
  emitter.off('why')
})
</script>

<style scoped></style>
