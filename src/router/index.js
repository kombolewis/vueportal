import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login'
import CustomerLogin from '../components/auth/CustomerLogin'
import SetContact from '../components/auth/SetContact'
import SetPassword from '../components/auth/SetPassword'
import ResetPassword from '../components/auth/ResetPassword'
import Dashboard from '../components/Dashboard'

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
  {
    path: '/setpassword',
    name: 'SetPassword',
    component: SetPassword,
    props:true
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPassword,
    props:true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    props:true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
