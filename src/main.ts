import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import axios from 'axios';

axios.defaults.baseURL = 'https://8080-mineda-springboot3app-g9ny0bwvgyx.ws-us104.gitpod.io/';

axios.defaults.baseURL = 'https://8080-larissasouz-springboot3-j8cays7s6d3.ws-us106.gitpod.io';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
