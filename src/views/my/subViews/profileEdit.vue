<template>
  <div class="profile-container no-tab-container">
    <van-form :disabled="!isEdit" ref="formRef">
      <van-cell-group :border="false">
        <van-field
          v-model.trim="state.userName"
          label="姓名"
          placeholder="请输入"
          size="large"
          maxlength="5"
          input-align="right"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model.number="state.age"
          type="number"
          label="年龄"
          placeholder="请输入"
          maxlength="2"
          size="large"
          input-align="right"
          :rules="[{ required: true, message: '请填写年龄', validator: validatorAge }]"
        />
        <van-field
          :model-value="getCompanyType"
          :is-link="isEdit"
          readonly
          name="picker"
          label="单位类型"
          size="large"
          placeholder="请选择"
          input-align="right"
          @click="handleTypeChange"
        />
        <van-field
          v-model.trim="state.company"
          label="单位名称"
          placeholder="请输入"
          size="large"
          maxlength="30"
          input-align="right"
          :rules="[{ required: true, message: '请填写单位名称' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            :columns="COMPANY_LIST"
            :columns-field-names="{ text: 'label' }"
            :default-index="pickerDefaultIndex"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <div class="footer">
        <div class="btn save" @click="handleSubmit">{{ isEdit ? '保存' : '编辑' }}</div>
        <div class="btn cancel" @click="onBack">取消</div>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { COMPANY_LIST } from '@/utils'
import { getUserInfo, updateUserInfo } from '@/api/my'
import { IUserInfo } from '@/api/types/my'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const showPicker = ref(false)
const state = ref<Partial<IUserInfo>>({})
const isEdit = ref(false)
const pickerDefaultIndex = ref(0)
const formRef = ref<HTMLFormElement | null>(null)
const router = useRouter()
onMounted(() => {
  loadData()
})
const getCompanyType = computed(() => {
  if (state.value.companyType) {
    // return COMPANY_LIST[state.value.companyType - 1]?.label
    return COMPANY_LIST.find((item) => item.id === state.value.companyType)?.label
  }
  return ''
})
const validatorAge = (val: number) => {
  if (val <= 0) {
    return '年龄不合法，请重新输入'
  }
}
const getPickerIndex = () => {
  if (state.value.companyType) {
    pickerDefaultIndex.value = COMPANY_LIST.findIndex(
      (company) => company.id === state.value.companyType
    )
  }
}
const loadData = async () => {
  const result = await getUserInfo()
  state.value = result.data
  getPickerIndex()
}
const handleSubmit = () => {
  if (!isEdit.value) {
    isEdit.value = true
    return
  }
  formRef.value?.validate().then(async () => {
    await updateUserInfo({
      age: state.value.age,
      company: state.value.company,
      companyType: state.value.companyType,
      userName: state.value.userName
    })
    Toast.success({
      message: '保存成功',
      onClose: () => {
        onBack()
      }
    })
  })
}
const handleTypeChange = () => {
  if (!isEdit.value) return
  showPicker.value = true
}
const onBack = () => {
  router.replace('/my')
}
const onConfirm = (e: { label: string; id: number }) => {
  state.value.companyType = e.id
  showPicker.value = false
}
</script>

<style scoped lang="scss">
.profile-container {
  background-color: #fff;
  /* height: 100%; */
  padding-top: 20px;

  --van-cell-border-color: rgba(151, 151, 151, 0.3);
  --van-cell-large-vertical-padding: 16px;
  --van-field-input-disabled-text-color: '#444';
  --van-field-disabled-text-color: '#444';
  --van-cell-value-color: '#9b9b9b';
  .footer {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    bottom: 50px;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .btn {
    width: 131px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;

    &.save {
      color: white;
      background: #0342b2;
    }
    &.cancel {
      border: 1px solid #0342b2;
      background: #f5f5f5;
      color: #0342b2;
    }
  }
}
</style>
