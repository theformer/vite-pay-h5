<template>
  <div class="advice-container">
    <van-form class="form" ref="formRef">
      <div class="form-item">
        <div class="form-label"><span class="star">*</span>留言标题：</div>
        <div class="form-input">
          <van-field
            v-model.trim="formData.title"
            :border="false"
            name="title"
            placeholder="请输入留言标题"
            :rules="[{ required: true, message: '请输入留言标题' }]"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-label"><span class="star">*</span>详细概况：</div>
        <div class="form-input">
          <van-field
            type="textarea"
            autosize
            name="question"
            rows="14"
            v-model.trim="formData.question"
            :border="false"
            placeholder="请输入您想说的话"
            :rules="[{ required: true, message: '请输入详细概况' }]"
          />
        </div>
      </div>
    </van-form>
    <van-button type="primary" block class="btn" native-type="submit" @click="onSubmit"
      >提交</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IAdvice } from '@/api/types/my'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { addMessage } from '@/api/my'
const router = useRouter()
const formData = ref<IAdvice>({
  title: '',
  question: ''
})
const formRef = ref<HTMLFormElement | null>(null)

const onSubmit = () => {
  formRef.value?.validate().then(async () => {
    await addMessage(formData.value)
    Toast.success({
      message: '提交成功',
      onClose: () => {
        router.replace('/my')
      }
    })
  })
}
</script>

<style scoped lang="scss">
.advice-container {
  background-color: #fff;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
  .form {
    overflow: hidden;
  }
  .form-item {
    margin-bottom: 25px;
    .star {
      color: #d0021b;
    }
    .form-label {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .form-input {
      border: 1px solid rgba(155, 155, 155, 0.41);
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      //padding: 13px 20px;
      box-sizing: border-box;
    }
  }
  --van-button-primary-background-color: #3771d9;
  --van-button-border-radius: 4px;
}
.van-cell {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.btn {
  margin-top: 15px;
}
</style>
