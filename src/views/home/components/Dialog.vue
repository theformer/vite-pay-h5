<template>
  <van-overlay
    :show="props.diaShow"
    style="z-index: 999; background: rgba(0, 0, 0, 0.3)"
    :lock-scroll="false"
  >
    <div class="loginDia">
      <div class="title">
        <div>填写个人信息</div>
        <img @click="handleClickToCloseDia" src="../../../assets/icon/close.png" alt="" />
      </div>
      <van-form ref="loginFormRef" :model="form" @submit="submit">
        <van-cell-group class="group">
          <van-field
            v-model="form.userName"
            placeholder="请输入姓名"
            class="input"
            label="姓名"
            name="userName"
            :rules="[{ required: true, message: '请输入姓名' }, { validator: validName }]"
          >
          </van-field>
        </van-cell-group>
        <van-cell-group class="group">
          <van-field
            v-model="form.age"
            placeholder="请输入年龄"
            class="input"
            label="年龄(岁)"
            type="number"
            maxlength="2"
            name="age"
            :rules="[{ required: true, message: '请输入年龄' }]"
          >
          </van-field>
        </van-cell-group>
        <van-cell-group class="group">
          <van-field
            v-model="form.companyTypeVal"
            is-link
            readonly
            name="companyTypeVal"
            label="单位类型"
            placeholder="请选择单位类型"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择单位名称' }]"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="companyTypeArr"
              :columns-field-names="companyTypeName"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group class="group">
          <van-field
            v-model="form.company"
            placeholder="请输入单位名称"
            class="input"
            label="单位名称"
            maxlength="50"
            name="company"
            :rules="[{ required: true, message: '请输入单位名称' }]"
          >
          </van-field>
        </van-cell-group>
        <van-button round block type="primary" class="submit" native-type="submit">
          提交</van-button
        >
      </van-form>
    </div>
  </van-overlay>
</template>

<script setup>
import { $deepcopy } from '@/utils'
import { onMounted } from 'vue'
const props = defineProps(['diaShow'])
const emit = defineEmits(['close'])

import { ref } from 'vue'
import { updateUser } from '@/api'
let companyTypeArr = ref([
  { label: '中国科协-机关部门', value: 5 },
  { label: '中国科协-直属单位', value: 6 },
  { label: '政府机关', value: 7 },
  { label: '省科协', value: 8 },
  { label: '省级科协', value: 9 },
  { label: '市科协', value: 10 },
  { label: '市级科协', value: 11 },
  { label: '国家级学会', value: 12 },
  { label: '省级学会', value: 13 },
  { label: '科研机构', value: 14 },
  { label: '高校', value: 15 },
  { label: '医院', value: 16 },
  { label: '投融资机构', value: 17 },
  { label: '企业', value: 18 },
  { label: '其他', value: 19 }
])
const companyTypeName = ref({ text: 'label', value: 'value' })
const show = ref(props.diaShow)
let showPicker = ref(false)
let form = ref({
  userName: '',
  age: '',
  companyTypeVal: '',
  company: ''
})
onMounted(() => {
  form.value = {}
})
const validName = (value) => {
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  if (!reg.test(value)) {
    return '请输入正确格式的姓名'
  } else return
}

const handleClickToCloseDia = () => {
  form.value = {}
  emit('close')
}
const onConfirm = (value) => {
  console.log(value, '我是确定返回的value')
  form.value.companyTypeVal = value.label
  showPicker.value = false
}
const submit = async (value) => {
  let params = $deepcopy(value)
  companyTypeArr.value.forEach((e) => {
    if (value.companyTypeVal == e.label) {
      params.companyType = e.value
    }
  })
  delete params.companyTypeVal
  const { code, data } = await updateUser(params)
  if (code == 200) {
    form.value = {}
    emit('close')
    localStorage.setItem('user', JSON.stringify(data))
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  //.van-overlay {
  //  z-index: 3;
  //  margin: 0 auto;
  //}
  .van-hairline--top-bottom:after {
    border: none;
  }
  .input {
    border: 1px solid #e0e0e0;
    width: 266px;
    height: 34px;
    background: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
  }
  .submit {
    height: 43px;
    background: #3771d9;
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 22px;
  }
  .van-cell__title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .van-field__body {
  }
  .van-cell__value {
    height: 58px;
  }
  .van-cell__right-icon {
    position: absolute;
    right: 12px;
    top: 36px;
    font-size: 24px;
    transform: rotate(90deg);
  }
  .van-cell {
    display: contents;
    .van-field__control {
      width: 100%;
      height: 34px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      padding-left: 14px;
      //margin-bottom: 24px;
    }
  }
  .loginDia {
    width: 270px;
    height: 447px;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(2, 78, 207, 0.26);
    border-radius: 6px;
    padding: 24px 18px 21px;
    margin: 0 auto;
    margin-top: 80px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #272727;
      line-height: 22px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      img {
        width: 14px;
        height: 14px;
      }
    }
    .group {
    }
  }
}
</style>
