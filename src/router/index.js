import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login'
import CustomerLogin from '../components/auth/CustomerLogin'
import SetContact from '../components/auth/SetContact'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/customerlogin',
    name: 'CustomerLogin',
    component: CustomerLogin,
    props:true
  },  
  {
    path: '/setcontact',
    name: 'SetContact',
    component: SetContact,
    props:true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
