import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
    // component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationPage
    // component: () => import('../views/RegistrationPage.vue')
  },
  {
    path: '/board',
    name: 'Board',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
