import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/index.scss'
import router from '@/routers'
import { Lazyload } from 'vant'

createApp(App).use(router).use(Lazyload).mount('#app')
