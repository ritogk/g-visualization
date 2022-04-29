import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//import GAnalys from './views/GAnalys.vue'
import GAnalys from './views/GAnalysTest.vue'
import Abb from './views/Abb.vue'

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
