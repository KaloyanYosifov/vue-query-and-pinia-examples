import './app.css';
import App from './App.vue'
import { createApp } from 'vue'
import router from './router.js';
import { VueQueryPlugin } from '@tanstack/vue-query'

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .mount('#app')
