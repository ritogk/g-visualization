import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GAnalys1 from './views/GAnalys1.vue'
import GAnalys2 from './views/GAnalys2.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    component: GAnalys2,
  },
  {
    path: '/gbowl',
    name: 'GAnalays1',
    component: GAnalys1,
  },
  {
    path: '/gbar',
    name: 'GAnalays2',
    component: GAnalys2,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
