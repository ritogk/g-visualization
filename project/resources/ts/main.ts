//require('./bootstrap');

import { createApp } from 'vue'
import App from './App.vue'
import router from './route'

//createApp(App).mount("#app")

import 'bootstrap'

/* ピッチインピッチアウトによる拡大縮小を禁止 */
document.documentElement.addEventListener(
  'touchstart',
  function (e) {
    if (e.touches.length >= 2) {
      e.preventDefault()
    }
  },
  { passive: false }
)

const app = createApp(App)
app.use(router)
app.mount('#app')
