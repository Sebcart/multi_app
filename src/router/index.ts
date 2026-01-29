import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CurrencyView from '@/views/CurrencyView.vue'
import TodoView from '@/views/TodoView.vue'
import GameView from '@/views/GameView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Vue Learning - Strona Główna' }
  },
  {
    path: '/currency-converter',
    name: 'currency-converter',
    component: CurrencyView,
    meta: { title: 'Przelicznik Walut - Vue Learning' }
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView,
    meta: { title: 'Lista Zadań - Vue Learning' }
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
    meta: { title: 'Gra - Vue Learning' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard - Vue Learning' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Vue Learning'
  next()
})

export default router
