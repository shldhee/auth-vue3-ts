import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Signin.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () =>
      import(
        /* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue'
      )
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
