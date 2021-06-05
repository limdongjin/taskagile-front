import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import axios from 'axios'

// Font , Icon 관련 라이브러리
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

axios.defaults.baseURL = '/api'
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  }
)
axios.defaults.headers.HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = 'http://localhost:8080'

faLibrary.add(faHome)
faLibrary.add(faSearch)
faLibrary.add(faPlus)

const app = createApp(App).use(router).use(store).mount('#app')
