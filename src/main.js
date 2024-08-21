import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import '@/router/guards'
import 'normalize.css'
import '@/style/index.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
