import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/LoginPage.vue')
    },
    {
      path: '/common-room',
      name: 'CommonRoom',
      component: () => import( './views/CommonRoom.vue')
    },
    {
      path: '/table',
      name: 'MyTable',
      component: () => import( './views/MyTable.vue')
    },
    // { path: '*', component: './components/NotFound' }
  ]
})
