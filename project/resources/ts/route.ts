import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GAnalys from './views/GAnalys.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/app/index',
    name: 'index',
    component: GAnalys,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
