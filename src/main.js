import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/app.scss';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)


import VueDataTables from 'vue-data-tables'
Vue.use(VueDataTables)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'Dashboard',
      })
    } else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
