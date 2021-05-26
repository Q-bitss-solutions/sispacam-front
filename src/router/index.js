import Vue from 'vue'
import VueRouter from 'vue-router'
import BusquedaCaminos from '../views/BusquedaCaminos.vue'
import AltaCamino from '../views/AltaCaminosWork.vue'
import AnalysisWork from '../components/AnalysisWork.vue'
import convenio from '../components/convenio.vue'
import Login from '../views/Login.vue'
import store from "../store/index";
import GridResultObra from "../views/GridResultBusqueda.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guest: true },
  }, 
  {
    path: '/busqueda',
    name: 'BusquedaCaminos',
    component: BusquedaCaminos,
    meta: { requiresAuth: true }
  },
  {
    path: '/altacamino',
    name: 'AltaCamino',
    component: AltaCamino,
    meta: { requiresAuth: true }
  },   
  {
    path: '/editcamino/:obraId',
    name: 'AltaCaminoEdit',
    component: AltaCamino,
    meta: { requiresAuth: true }
  },  
  {
    path: '/analisis-de-obra',
    name: 'analisisdeobra',
    component: AnalysisWork,
    meta: { requiresAuth: true }
  },
  {
    path: '/convenio',
    name: 'convenio',
    component: convenio,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras',
    name: 'Obras',
    component: GridResultObra,
    meta: { requiresAuth: true }
  }    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.state.user.isAuthenticated
  console.log(requiresAuth)
  console.log(isAuthenticated)
  if (requiresAuth && !isAuthenticated) {
    console.log('login')
    next('/')
  } else {
    console.log('else')
    next()
  }
})


export default router
