import './assets/main.css'
import 'vue3-carousel/carousel.css'
import 'gitart-vue-dialog/dist/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(dialogPlugin)
app.use(router)

app.mount('#app')
