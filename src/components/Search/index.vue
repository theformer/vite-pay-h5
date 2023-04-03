<template>
  <div class="search">
    <van-search
      class="search-input"
      v-model="value"
      placeholder="请输入你想搜索的"
      @search="onSearch"
      @cancel="onCancel"
      @click-input="handleBlurClick"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const value = ref('')
    const router = useRouter()
    const onSearch = (val) => Toast(val)
    const onCancel = () => Toast('取消')
    const handleBlurClick = () => {
      router.push('/search')
    }
    return {
      value,
      onSearch,
      onCancel,
      handleBlurClick
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  background: #ffffff;
  padding-top: 10px;
  margin-bottom: 16px;
  //margin: 10px 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .search-input {
    width: 343px;
    height: 32px;
    background: #f0f0f2;
    border-radius: 16px;
    text-align: center;
  }
  ::v-deep {
    .van-search__content {
      background: none;
    }
  }
}
</style>
