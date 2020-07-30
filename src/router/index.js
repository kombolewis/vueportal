import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login'
import CustomerLogin from '../components/auth/CustomerLogin'
import SetContact from '../components/auth/SetContact'
import SetPassword from '../components/auth/SetPassword'
import ResetPassword from '../components/auth/ResetPassword'
import Logout from '../components/auth/Logout'
import Dashboard from '../components/Dashboard'
import Accounts from '../components/accounts/Accounts'
import Statements from '../components/accounts/Statements'



import Home from '../views/Home'

Vue.use(VueRouter)

  const routes = [

  {
    path: '/customerlogin',
    name: 'CustomerLogin',
    component: CustomerLogin,
    props:true,
    meta:{
      requiresVisitor: true
    }
  },  
  {
    path: '/setcontact',
    name: 'SetContact',
    component: SetContact,
    props:true,
    meta:{
      requiresVisitor: true
    }
  },
  {
    path: '/setpassword',
    name: 'SetPassword',
    component: SetPassword,
    props:true,
    meta:{
      requiresVisitor: true
    }
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPassword,
    props:true,
    meta:{
      requiresVisitor: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    props:true,
    meta:{
      requiresAuth:true
    }
  },

  {
    path: '/home',
    name: 'Home',
    component:Home,
    children:[
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts,
      },
      {
        path: 'statements',
        name: 'Statements',
        component: Statements,
        props:true,

      },
    ],
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      requiresVisitor: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
