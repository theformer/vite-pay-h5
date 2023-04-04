import { createApp } from 'vue'
import App from './App.vue'
import store from './stroe'
import '@/assets/css/index.scss'
import router from '@/routers'
import { Lazyload } from 'vant'
createApp(App).use(router).use(Lazyload).use(store).mount('#app')
