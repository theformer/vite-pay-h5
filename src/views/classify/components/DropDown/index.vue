<template>
  <transition name="van-slide-down">
    <div class="dropdown" v-show="props.show">
      <div class="dropdown-item">
        <van-radio-group v-model="checked" v-show="props.show">
          <van-cell-group inset>
            <van-cell
              :title="annual.fullName"
              clickable
              v-for="annual in reverseAnnual"
              @click="handleRadioChange(annual)"
            >
              <template #right-icon>
                <van-radio :name="annual.id"></van-radio>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ANNUAL_LIST, IAnnual } from '@/utils'
const reverseAnnual = ANNUAL_LIST.reverse()
const props = defineProps<{
  show: boolean
}>()
const checked = ref(0)

const emits = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'change', value: IAnnual): void
}>()
const handleRadioChange = (val: IAnnual) => {
  checked.value = val.id
  emits('update:show', false)
  emits('change', val)
}
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  width: 100%;
  z-index: 2;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
