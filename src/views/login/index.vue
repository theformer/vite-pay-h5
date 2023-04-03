<template>
  <div class="login">
    <img src="../../assets/images/login/bg.png" alt="" />
    <img class="header" src="../../assets/images/login/login.png" alt="" />
    <div class="main" :class="{ h_420: active == 2, pt_30: active != 2 }">
      <div class="title">中国科协年会学术资源平台</div>
      <div class="tabs-list" v-if="!registerFlag">
        <div
          v-for="(item, index) in list"
          :class="active == index ? 'text_active' : ''"
          class="active-item"
          :key="index"
          @click="handleClickToChangeTabs(item, index)"
        >
          {{ item.label }}
        </div>
      </div>
      <div v-else class="tabs-list">
        <div
          class="active-item"
          :class="!item.flag ? 'displayContents' : ''"
          v-for="(item, index) in registerArr"
          :key="index"
        >
          <template v-if="item.flag">
            {{ item.label }}
          </template>
        </div>
      </div>
      <van-form ref="loginFormRef" style="position: relative" :model="form" @submit="submit">
        <div class="form">
          <van-cell-group>
            <van-field
              v-model="form.mobile"
              placeholder="请输入手机号"
              class="input t-margin-bottom-26"
              name="mobile"
              type="tel"
              maxlength="11"
              :rules="[{ required: true, message: '请输入手机号' }, { validator: validMobile }]"
            >
              <template #left-icon>
                <img
                  class="phones"
                  v-if="active != 2"
                  src="../../assets/images/login/phone.png"
                  alt=""
                />
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group v-if="active != 1">
            <van-field
              class="input btn t-margin-bottom-26"
              v-model="form.code"
              name="code"
              maxlength="6"
              center
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }, { validator: validCode }]"
            >
              <template #left-icon>
                <img
                  class="yanzheng"
                  v-if="active != 2"
                  src="../../assets/images/login/verify.png"
                  alt=""
                />
              </template>
              <template #button>
                <div v-if="!gcode" @click="getCode" class="btn-text">{{ time_count }}s</div>
                <div v-else @click="handleSendCode" class="btn-text">获取验证码</div>
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group v-if="active == 1 || active == 2">
            <van-field
              v-model="form.pwd"
              name="pwd"
              class="input t-margin-bottom-26"
              :type="passwordType1"
              :placeholder="active == 1 ? '请输入密码' : '请输入新密码'"
              :rules="[{ required: true, message: '请输入密码' }, { validator: pwd }]"
            >
              <template #left-icon>
                <img
                  class="yanzheng"
                  v-if="active != 2"
                  src="../../assets/images/login/verify.png"
                  alt=""
                />
              </template>
              <template #right-icon>
                <div @click="switchPasswordType(0)">
                  <van-icon name="eye-o" v-if="passwordType1 === 'password'" />
                  <van-icon name="closed-eye" v-else />
                </div>
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group v-if="active == 2">
            <van-field
              v-model="form.pwd1"
              name="pwd1"
              class="input t-margin-bottom-26"
              :type="passwordType2"
              placeholder="请确认密码"
              :rules="[{ required: true, message: '请输入密码' }, { validator: pwd2 }]"
            >
              <template #left-icon>
                <img
                  class="yanzheng"
                  v-if="active != 2"
                  src="../../assets/images/login/verify.png"
                  alt=""
                />
              </template>
              <template #right-icon>
                <div @click="switchPasswordType(1)">
                  <van-icon name="eye-o" v-if="passwordType2 === 'password'" />
                  <van-icon name="closed-eye" v-else />
                </div>
              </template>
            </van-field>
          </van-cell-group>
          <div class="register" v-if="active != 2" :class="active == 0 ? 'justify_end' : ''">
            <div v-if="active == 1" @click="handleClickToPass(1)">忘记密码</div>
            <div @click="handleClickToPass(0)">新用户注册</div>
          </div>
          <div v-if="active == 2" style="display: flex; justify-content: space-between">
            <van-button round block class="back" native-type="submit" @click="handleClickResetForm">
              取消</van-button
            >
            <van-button
              round
              block
              :disabled="!checked"
              class="submitRegister"
              type="primary"
              native-type="submit"
            >
              确认</van-button
            >
          </div>
          <van-button
            v-else
            round
            block
            type="primary"
            class="submit"
            native-type="submit"
            :disabled="!checked"
          >
            登录</van-button
          >
        </div>
        <van-field name="checkbox" class="pt_50">
          <template #input>
            <van-checkbox label-disabled v-model="checked" shape="square"></van-checkbox>
          </template>
        </van-field>
        <div style="position: absolute" class="userInfo" :class="active === 2 ? 'active2' : ''">
          我已阅读并同意
          <span @click.stop="handleClickToUser" style="color: #3771d9">《平台网络服务协议》</span>
        </div>
      </van-form>
    </div>
    <div class="footer" @click="router.push('/')">
      <img src="../../assets/images/shouye.png" alt="" />
      <span>进入首页</span>
    </div>
  </div>
  <LoginTips :show="loginShow" @close="closeTips" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
import { getValidCode, h5Login, updatePwd, register } from '../../api'
import { $deepcopy } from '@/utils/getAssetsImageUrl'
import LoginTips from './components/LoginTips.vue'
let form = ref({
  mobile: '',
  code: '',
  loginType: 2,
  pwd: '',
  pwd1: '',
  type: 1
})
let list = ref([
  { label: '手机验证登录', type: 1 },
  { label: '账号密码登录', type: 2 }
])
let registerArr = ref([
  { label: '新用户注册', type: 3, flag: false },
  { label: '忘记密码', type: 4, flag: false }
])
let loginShow = ref(false)
const validCode = (value) => {
  if (value.length != 6) {
    return '验证码长度为6位'
  }
}
const pwd = (value) => {
  if (value && value.length < 6) {
    return '密码长度为6位'
  } else return
}
const pwd2 = (value) => {
  if (form.value.pwd != value) {
    return '俩次密码不一样。'
  } else if (value && value.length < 6) {
    return '密码长度为6位'
  } else return
}
const validMobile = (value) => {
  let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
  if (!reg.test(value)) {
    return '请输入正确格式的手机号'
  } else return
}
const loginFormRef = ref(null)
let gcode = ref(true)
let active = ref(0)
let time_count = ref(60)
let checked = ref(false)
let timer = ref(null)
let passwordType1 = ref('password')
let passwordType2 = ref('password')
let registerFlag = ref(false)
const handleClickToPass = (value) => {
  resetForm()
  active.value = 2
  registerFlag.value = true
  registerArr.value.forEach((e) => {
    e.flag = false
  })
  registerArr.value[value].flag = true
}
onMounted(() => {
  loginShow.value = localStorage.getItem('loginStatus') == 'false' ? false : true
})
const closeTips = () => {
  loginShow.value = false
  localStorage.setItem('loginStatus', false)
}
const handleClickToChangeTabs = (item, index) => {
  resetForm()
  active.value = index
  console.log(item, '我是返回的item')
}
const switchPasswordType = (value) => {
  if (value == 1) {
    passwordType2.value = passwordType2.value == 'password' ? 'text' : 'password'
  } else {
    passwordType1.value = passwordType1.value == 'password' ? 'text' : 'password'
  }
}
const resetForm = () => {
  console.log(loginFormRef, '我是返回的loginFormRef')
  loginFormRef.value.resetValidation()
  form.value = {}
}
const getCode = async () => {
  gcode.value = false
  getValidCodeValue()
  if (!timer.value) {
    timer.value = setInterval(() => {
      if (time_count.value > 0) {
        gcode.value = false
        time_count.value--
      } else {
        gcode.value = true
        clearInterval(timer.value)
        timer.value = null
        time_count.value = 60
      }
    }, 1000)
  }
}
const handleSendCode = () => {
  let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
  if (reg.test(form.value.mobile)) {
    gcode.value = true
    getCode()
  } else {
    Toast.fail('请输入正确格式的手机号')
  }
}
const loginIn = (data) => {
  localStorage.setItem('token', data.token)
  router.push({ path: '/' })
}
const submit = async () => {
  let params = $deepcopy(form.value)
  if (active.value == 2) {
    let type
    registerArr.value.find((e) => {
      if (e.flag) {
        type = e.type
      }
    })
    if (type == 3) {
      const { code, data } = await register(params)
      if (code == 200) {
        Toast.success('注册成功')
        loginIn(data)
      }
    } else {
      const { code, data } = await updatePwd(params)
      if (code == 200) {
        Toast.success('修改密码成功')
        loginIn(data)
      }
    }
  } else {
    if (active.value == 0) {
      params.loginType = 2
    } else {
      params.loginType = 1
    }
    const { data, code } = await h5Login(params)
    if (code == 200) {
      loginIn(data)
    }
  }
}
const getValidCodeValue = async () => {
  let data = await getValidCode({
    mobile: form.value.mobile,
    type: active.value == 2 ? 2 : active.value == 0 || active.value == 1 ? 1 : 3
  })
}
const handleClickToUser = () => {
  router.push({ path: '/document' })
  console.log(11111111111)
}
const handleClickResetForm = () => {
  resetForm()
  active.value = 0
  registerFlag.value = false
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  img {
    width: 100%;
    height: 120px;
  }
  .tabs-list {
    display: flex;
    padding: 0 50px;
    justify-content: space-between;
    padding-top: 26px;
    margin-bottom: 26px;
  }
  .header {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    width: 89px;
    height: 89px;
    //background: #ffffff;
    //box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    border-radius: 50%;
  }

  .main {
    width: 335px;
    height: 440px;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(2, 78, 207, 0.26);
    margin: 0 auto;
    margin-top: 53px;
    margin-bottom: 100px;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #1b1b1b;
      line-height: 28px;
      text-align: center;
      padding-top: 31px;
    }
    //padding: 0 50px;
    :deep(.van-tabs__line) {
      display: none;
    }
    :deep(.van-tab) {
      justify-content: space-between;
      padding: 0;
      flex: none;
    }
    :deep(.van-tab--line) {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1b1b1b;
      line-height: 22px;
      padding-top: 35px;
    }

    :deep(.van-tabs__nav) {
      padding: 0 50px;
      display: flex;
      justify-content: space-between;
    }
    .submit {
      width: 236px;
      height: 50px;
      background: #3771d9;
      border-radius: 4px;
      margin: 0 auto;
    }
    .submitRegister {
      width: 108px;
      height: 50px;
      background: #3771d9;
      border-radius: 4px;
    }
    .back {
      width: 108px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid #3771d9;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3771d9;
      line-height: 22px;
    }
    :deep(.van-button) {
    }
    .phones {
      width: 16px;
      height: 24px;
      margin-right: 12px;
    }
    ::v-deep {
      .btn-text {
        width: 75px;
        height: 26px;
        background: #ffffff;
        border-radius: 13px;
        border: 1px solid #3771d9;
        border-radius: 13px;
        font-size: 12px;
        color: #3771d9;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .van-hairline--top-bottom::after {
        display: none;
      }

      .van-field__left-icon {
        display: flex;
        margin: 0;
        align-items: center;
        .yanzheng {
          width: 18px;
          height: 17px;
          display: block;
          margin: auto 0;
          margin-right: 12px;
        }
      }

      .van-field__body {
        height: 100%;
        margin: auto 0;
      }

      .van-field__control {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        //color: #ffffff;
        line-height: 14px;
      }

      .van-cell::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 47px;
        bottom: 0;
        left: 47px;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        display: none;
      }
      .van-tabs__wrap {
        margin-bottom: 26px;
        height: 57px;
      }
      .van-cell-group {
        background-color: transparent;
      }
      .van-field__left-icon {
        display: flex;
        margin: 0;

        .yanzheng {
          width: 18px;
          height: 17px;
          display: block;
          margin: auto 0;
          margin-right: 12px;
        }
      }
      .input {
        height: 50px;
        background-color: transparent;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        //color: #ffffff;
        line-height: 20px;
        padding: 0;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(155, 155, 155, 0.41);
        .van-cell__value--alone {
          margin: auto 0;
        }
      }
      .van-checkbox {
        display: flex;
        align-items: center;
        margin-top: 29px;
        margin-left: 3px;
      }
    }

    //:deep(.van-tabs__nav) {
    //  padding-top: 35px;
    //  align-items: normal;
    //}
  }
}
.register {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3771d9;
  line-height: 18px;
  //padding: 0 50px;
  text-align: end;
  margin: 12px 0 29px 0;
}
.t-margin-bottom-26 {
  margin-bottom: 23px;
}
.h_420 {
  height: 540px !important;
  margin-bottom: 20px !important;
}
.text_active {
  color: #3771d9 !important;
}
.active-item {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1b1b1b;
  line-height: 22px;
}
.form {
  padding: 0 50px;
}
.justify_end {
  justify-content: end;
}
.displayContents {
  display: contents;
}
.active2 {
}
.userInfo {
  left: 82px;
  bottom: 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #9b9b9b;
  line-height: 17px;
}
.pt_50 {
  padding: 0 50px;
}
.pt_30 {
  margin-bottom: 20px !important;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 55px;
  img {
    margin-right: 10px;
    width: 22px;
    height: 22px;
  }
  span {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3771d9;
    line-height: 22px;
    letter-spacing: 1px;
    text-decoration: underline;
    display: block;
  }
}
</style>
