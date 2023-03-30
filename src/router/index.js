import Vue from 'vue'
import VueRouter from 'vue-router'

// Módulo Caminos
import AltaCamino from '@/views/Caminos/AltaCaminos.vue'
import Caminos from "@/views/Caminos/Caminos.vue"
import AltaCaminosWork from '@/views/Caminos/AltaCaminosWork.vue' // TODO: Cambiar nombre al componente
import EditarCamino from '@/views/Caminos/EditarCamino.vue'

// Residente de Camino
import TablaResidentes from '@/components/Residentes/TablaResidentes'
import AsignarResidente from '@/components/Residentes/AsignarResidente'
import EditarAsignacionResidente from '@/components/Residentes/EditarAsignacionResidente'



import BusquedaCaminos from '../views/BusquedaCaminos.vue' // TODO: Borrar BusquedaCaminos
import Presupuestos from '../views/Presupuestos.vue'
import AltaAF from '../views/AltaAFWork.vue'
import AnalysisWork from '../components/AnalysisWork.vue'
import convenio from '../components/convenio.vue'
import financieros from '../components/AltaDeCaminos/DatosFinancieros.vue'
import avancefinancieros from '../components/AltaDeCaminos/DatosAvanceFinancieros.vue'
import Login from '../views/Login.vue'
import store from "../store/index";
import PresupuestoBaseKilometro from "../views/PresupuestoBaseKilometro.vue"

//
import Assignments from '@/views/v2/Assignments.vue'
import PhysicalAdvances from '@/views/v2/PhysicalAdvances.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/asignaciones',
    name: 'Assignments',
    component: Assignments,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/caminos/:roadKey/avances-fisicos',
    name: 'PhysicalAdvances',
    component: PhysicalAdvances,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guest: true },
  }, 

  {
    path: "/sandbox",
    name: "Sandbox Test Component",
    component: AsignarResidente,
  },
  // Página Principal
  {
    path: "/caminos",
    name: "Caminos",
    component: Caminos,
    meta: { requiresAuth: true }
  },
  {
    path: '/busqueda',
    name: 'BusquedaCaminos',
    component: BusquedaCaminos,
    // meta: { requiresAuth: true }
  },
  {
    path: '/financiero',
    name: 'DatosFinancieros',
    component: financieros,
    meta: { requiresAuth: false }
  },
  {
    path: '/avancefinanciero',
    name: 'DatosAvanceFinancieros',
    component: avancefinancieros,
    meta: { requiresAuth: false }
  },
  {
    path: '/altacamino',
    name: 'AltaCamino',
    component: AltaCamino,
    // meta: { requiresAuth: true }
  },   
  {
    path: '/editcamino/:obraId',
    name: 'EditarCamino',
    component: EditarCamino,
    meta: { requiresAuth: false }
  },
  {
    path: '/editobra/:obraId',
    name: 'AltaCaminosWork',
    component: AltaCaminosWork,
    meta: { requiresAuth: false }
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
    component: Caminos,
    // meta: { requiresAuth: true }
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
