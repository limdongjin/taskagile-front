import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  }
)
axios.defaults.headers.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = 'http://localhost:8080'

createApp(App).use(store).use(router).mount('#app')
