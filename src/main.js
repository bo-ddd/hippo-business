import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'



createApp(App).use(store).use(router).use(ElementPlus).use(dataV).mount('#app')