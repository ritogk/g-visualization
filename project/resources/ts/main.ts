//require('./bootstrap');

import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { i18n } from '@/libs/i18n'
import { getParam } from '@/libs/utility'
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

// i18n
i18n.global.locale.value = getParam('lang', location.href)
app.use(i18n)

app.mount('#app')
