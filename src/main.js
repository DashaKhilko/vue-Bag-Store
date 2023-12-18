import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const routes = [
  { path: '/vue-Bag-Store', name: 'home', component: Home },
  { path: '/vue-Bag-Store/favorites', name: 'favorites', component: Favorites }
]

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
