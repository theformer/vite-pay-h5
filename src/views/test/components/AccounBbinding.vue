<template>
  <div class="container">
    <VideoPlay :url="props.url" :title="props.title" />
    <van-field
      v-model="value"
      center
      clearable
      label="账户"
      placeholder="点击输入你能记得住的账户进行绑定"
    >
      <template #button>
        <van-button size="small" type="primary">绑定</van-button>
      </template>
    </van-field>
    <div class="tips">
      <div class="tips-complaint">投诉</div>
      <div class="tips-like">猜你喜欢</div>
      <div class="tips-complaint">分享好友</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'vue3-video-play/dist/style.css'
import VideoPlay from '@/components/VideoPlay/index.vue'
const props = defineProps(['url', 'title'])
const value = ref('')
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  --van-field-label-width: 30px;
  .tips {
    height: 36px;
    border: 1px solid rgba(187, 187, 187, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    color: #fff;
    .tips-complaint {
      width: 148px;
      line-height: 28px;
      text-align: center;
      height: 28px;
      background: #028958;
      border-radius: 5px;
    }
    .tips-like {
      color: red;
      font-size: 14px;
      font-weight: bolder;
    }
  }
}
</style>
