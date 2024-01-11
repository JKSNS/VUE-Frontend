import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue' // Make sure to import the Login component

// Import the authenticated method from '@/util'
import { authenticated } from '@/util'

const checkAuth = async (to, from, next) => {
  try {
    if (await authenticated()) next()
    else next({
      path: '/login',
      replace: true
    })
  } catch (error) {
    console.error(error.message)
    next({
      path: '/login',
      replace: true
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: checkAuth, // Use the checkAuth method for authentication
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView // Make sure to use the Login component
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
