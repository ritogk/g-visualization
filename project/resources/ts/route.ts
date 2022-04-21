import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GAnalys from './components/GAnalys.vue'
import Abb from './components/Abb.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'GAnalys',
    component: GAnalys,
  },
  {
    path: '/abb',
    name: 'Abb',
    component: Abb,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
