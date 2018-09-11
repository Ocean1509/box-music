import Vue from 'vue'
import Router from 'vue-router'
import Home from 'src/components/Home'
import Play from 'src/components/Play'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/play/:id', name: 'play', component: Play }
  ]
})

export default router;