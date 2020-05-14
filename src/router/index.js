import Vue from 'vue'
import VueRouter from 'vue-router'
import Timer from '../views/Timer.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    meta: {title:"Klik-Klok Timer"},
    name: 'Timer',
    component: Timer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
