import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Subtotal from '../views/Subtotal.vue'
import TebleGesto from '../views/TebleGesto.vue'
import Adminster from '../views/Adminster.vue'
import AdminsterAdd from '../views/AdminsterAdd.vue'
import AdminsterChange from '../views/AdminsterChange.vue'
import AdminsterDeleto from '../views/AdminsterDeleto.vue'

//store
import Store from '../store/index.js'
//-------

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    //-----
    meta: {
      isPublic: true
    }
    //-----
  },
  {
    path: '/Subtotal',
    name: 'Subtotal',
    component: Subtotal,
    //-----
    meta: {
      isPublic: true
    }
    //---
  },
  {
    path: '/TebleGesto',
    name: 'TebleGesto',
    component: TebleGesto,
    //-----
    meta: {
      isPublic: true
    }
    //-----
  },
  {
    path: '/Adminster',
    name: 'Adminster',
    component: Adminster,
    //-----
    meta: {
      isPublic: true
    }
    //-----
  },
  {
    path: '/AdminsterAdd',
    name: 'AdminsterAdd',
    component: AdminsterAdd
  },
  {
    path: '/AdminsterChange',
    name: 'AdminsterChange',
    component: AdminsterChange
  },
  {
    path: '/AdminsterDeleto',
    name: 'AdminsterDeleto',
    component: AdminsterDeleto,
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//-----
router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.isPublic) || Store.state.token) next()
  else next("/Adminster")
})
//------

export default router
