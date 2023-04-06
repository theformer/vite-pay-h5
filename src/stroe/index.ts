import { createStore } from 'vuex'
import { stateInt } from './storeInterface'
import { enc, unzip, XorDec } from '@/utils'
import md5 from 'js-md5'
const state: stateInt = {
  //推送消息
  data: {},
  webSocket: null,
  goHomeStatus: null
}
export default createStore({
  state,
  mutations: {
    //websocket初始化
    initWebsocket(state) {
      const hash = localStorage.getItem('hash')
      state.webSocket = new WebSocket(
        // 此处填写你要连接的ws地址
        `ws://114.96.79.222:3001/api/v1/ws?hash=${hash}`
      )
      //建立连接
      state.webSocket.onopen = function () {
        /*
         * 连接成功
         * */
        console.log('通讯开始')
        const ping = {
          command: 'ping',
          nowTime: new Date().getTime()
        }
        // 发送心跳防止ws协议自动断联
        setInterval(() => {
          state.webSocket.send(enc(JSON.stringify(ping)))
        }, 1000 * 5)
      }
      //接收服务端消息
      state.webSocket.onmessage = function (e) {
        /*
         * 收到消息时回调函数
         * */
        const blob = e.data
        const file = new FileReader()
        file.readAsArrayBuffer(blob)
        file.onload = function () {
          const GzipDec = unzip(file.result)
          const XorDecData = XorDec(GzipDec, md5(localStorage.getItem('hash')))
          const { code } = JSON.parse(XorDecData)
          if (code == 0) state.goHomeStatus = code
          // localStorage.setItem('goHomeStatus',code)
          console.log(code, 2222)
        }
      }
      state.webSocket.onerror = function () {
        /*
         * 通讯异常
         * */
        console.log('通讯异常')
      }
      state.webSocket.onclose = function (e) {
        /*
         * 关闭连接时回调函数
         * */
        console.log('连接已断开')
      }
    }
  },
  actions: {},
  modules: {}
})
