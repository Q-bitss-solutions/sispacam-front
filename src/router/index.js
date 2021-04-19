import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AltaCamino from '../views/AltaCaminosWork.vue'
import AnalysisWork from '../components/AnalysisWork.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/altacamino',
    name: 'AltaCamino',
    component: AltaCamino
  },  
  {
    path: '/analisis-de-obra',
    name: 'analisisdeobra',
    component: AnalysisWork
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
