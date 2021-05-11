import Vue from 'vue'
import VueRouter from 'vue-router'
import BusquedaCaminos from '../views/BusquedaCaminos.vue'
import AltaCamino from '../views/AltaCaminosWork.vue'
import AnalysisWork from '../components/AnalysisWork.vue'
import Login from '../views/Login.vue'
import store from "../store/index";
import GridResultObra from "../views/GridResultBusqueda.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },  
  {
    path: '/',
    name: 'Home',
    //redirect: { name: 'BusquedaCaminos' },
    redirect: { name: 'Login' },
    meta: { requiresAuth: false }
  },
  {
    path: '/busqueda-obras',
    name: 'BusquedaCaminos',
    component: BusquedaCaminos,
    meta: { requiresAuth: false }
  },
  {
    path: '/altacamino',
    name: 'AltaCamino',
    component: AltaCamino,
    meta: { requiresAuth: false }
  },   
  {
    path: '/editcamino/:obraId',
    name: 'AltaCaminoEdit',
    component: AltaCamino,
    meta: { requiresAuth: false }
  },  
  {
    path: '/analisis-de-obra',
    name: 'analisisdeobra',
    component: AnalysisWork,
    meta: { requiresAuth: false }
  },
  {
    path: '/obras',
    name: 'Obras',
    component: GridResultObra,
    meta: { requiresAuth: false }
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
    next('/login')
  } else {
    console.log('else')
    next()
  }
})


export default router
