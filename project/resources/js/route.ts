import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from './components/Main.vue';
import Abb from './components/Abb.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: Main,
      },
    {
        path: '/abb',
        name: 'Abb',
        component: Abb,
      },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;