<template>
  <div class="pdf-preview" id="pdf">
    <div class="pdf-wrap">
      <vue-pdf-embed
        :source="url"
        :page="pageCount"
        class="vue-pdf-embed"
        @rendered="Toast.clear()"
      />
    </div>
    <div class="actions">
      <span @click="pageCount--">上一页</span>
      <span @click="pageCount++">下一页</span>
    </div>
  </div>
  <IpengWatermark
    el="#pdf"
    txt="版权属于中国科协学会服务中心所有, 未经授权禁止复制使用"
    :yGap="130"
    :size="13"
    :opacity="0.7"
  />
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import IpengWatermark from 'ipeng-watermark'

import { Toast } from 'vant'
import { ref } from 'vue'

defineProps({
  url: {
    type: String,
    required: true
  }
})
const pageCount = ref(1)
Toast.loading('加载中...')
</script>

<style scoped lang="scss">
.pdf-preview {
  display: flex;
  align-items: center;
  height: calc(100vh);
  box-sizing: border-box;
  background-color: #e9e9e9;
  overflow: auto;
}

.pdf-wrap {
  min-width: 100%;
  overflow: auto;
}

.vue-pdf-embed {
  text-align: center;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}

:deep(.vue-pdf-embed > div) {
  margin-bottom: 15px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

.actions {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  background-color: #686868;
  padding: 10px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  color: white;

  span:first-child {
    margin-right: 20px;
  }
}
</style>
