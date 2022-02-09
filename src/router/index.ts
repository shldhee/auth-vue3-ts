import { useAuth } from '@/store/auth'
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
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      const auth = useAuth()
      const result = await auth.fetchUserInfo()
      if (result !== 'success') {
        next({ name: 'Signin' })
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const auth = useAuth()
  if (auth.token && to.name === 'Signin') {
    return {
      path: '/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    }
  }
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/signin',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    }
  }
})

export default router
