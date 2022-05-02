//require('./bootstrap');

import { createApp } from 'vue'
import App from './App.vue'
import router from './route'

//createApp(App).mount("#app")

import 'bootstrap'

const app = createApp(App)
app.use(router)
app.mount('#app')
