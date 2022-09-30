import Vue from 'vue'
import VueRouter from 'vue-router'
import BusquedaCaminos from '../views/BusquedaCaminos.vue'
import Presupuestos from '../views/Presupuestos.vue'
import AltaCamino from '../views/AltaCaminos.vue'
import AltaAF from '../views/AltaAFWork.vue'
import AnalysisWork from '../components/AnalysisWork.vue'
import convenio from '../components/convenio.vue'
import financieros from '../components/AltaDeCaminos/DatosFinancieros.vue'
import avancefinancieros from '../components/AltaDeCaminos/DatosAvanceFinancieros.vue'
import Login from '../views/Login.vue'
import store from "../store/index";
import GridResultObra from "../views/GridResultBusqueda.vue"
import PresupuestoBaseKilometro from "../views/PresupuestoBaseKilometro.vue"


import EditarCamino from '../views/EditarCamino.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guest: true },
  }, 

  {
    path: "/sandbox",
    name: "Sandbox Test Component",
    component: EditarCamino,
  },
  {
    path: '/busqueda',
    name: 'BusquedaCaminos',
    component: BusquedaCaminos,
    meta: { requiresAuth: true }
  },
  {
    path: '/financiero',
    name: 'DatosFinancieros',
    component: financieros,
    meta: { requiresAuth: true }
  },
  {
    path: '/avancefinanciero',
    name: 'DatosAvanceFinancieros',
    component: avancefinancieros,
    meta: { requiresAuth: true }
  },
  {
    path: '/altacamino',
    name: 'AltaCamino',
    component: AltaCamino,
    meta: { requiresAuth: true }
  },   
  {
    path: '/editarcamino/:obraId',
    name: 'EditarCAmino',
    component: EditarCamino,
    meta: { requiresAuth: false }
  },

  {
    path: '/editcamino/:obraId',
    name: 'AltaCaminoEdit',
    component: AltaCamino,
    meta: { requiresAuth: true }
  },  
  {
    path: '/editAF/:obraId',
    name: 'AltaAF',
    component: AltaAF,
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
    name: 'Programacion',
    component: convenio,
    meta: { requiresAuth: true }
  },
  {
    path: '/obras',
    name: 'Obras',
    component: GridResultObra,
    meta: { requiresAuth: true }
  },
  {
    path: '/presupuesto/:obraId/:anio/:anchoId/:convenioId/:meta/',
    name: 'Presupuesto',
    component: Presupuestos,
    meta: { requiresAuth: false }
  },
  {
    path: '/presupuesto/base/kilometro',
    name: 'PresupuestoBaseKilometro',
    component: PresupuestoBaseKilometro,
    //meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.state.user.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})


export default router
