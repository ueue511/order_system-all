import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Subtotal from '../views/Subtotal.vue'
import TebleGesto from '../views/TebleGesto.vue'
import Adminster from '../views/Adminster.vue'
import AdminsterAdd from '../views/AdminsterAdd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Subtotal',
    name: 'Subtotal',
    component: Subtotal
  },
  {
    path: '/TebleGesto',
    name: 'TebleGesto',
    component: TebleGesto
  },
  {
    path: '/Adminster',
    name: 'Adminster',
    component: Adminster
  },
  {
    path: '/AdminsterAdd',
    name: 'AdminsterAdd',
    component: AdminsterAdd
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
