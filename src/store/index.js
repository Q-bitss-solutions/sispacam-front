import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import presupuesto from "./modules/presupuesto";
import  createPersistedState  from  'vuex-persistedstate'
import { test } from '@/api/alta-camino'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        camino:{
            id:null,
            ancho:null,
            id_convenio:null,
            presupuesto:{
                edit_mode:false
            }
        },
      foo: 'root-foo',
      breadcrumb: [],
      cancel: {
          id:null
      },
      cancelConvenio: {
        id:null
    }
    },
    mutations: {
        setBreadcrumb(state, dataBreadcrumb ) {
            state.breadcrumb = dataBreadcrumb
        },
        setIdCancelacion(state, idObraCancelacion) {
            state.cancel.id = idObraCancelacion
        },
        setIdCancelacionConvenio(state, idConvenio) {
            state.cancelConvenio.id = idConvenio
        },
        setAnchoCamino(state, ancho){
            state.camino.ancho = ancho
        },
        setIdConcevenio(state, convenio){
            state.camino.id_convenio = convenio
        },
        setEditMode(state, edit_mode){
            state.camino.presupuesto.edit_mode = edit_mode
        }        

    },
    getters: {
    
    },
    actions: {
        async test({ commit }, user) {
            const data = await test(user)
        }        
    }, 
    modules: {
        user: auth,
        presupuesto:presupuesto
    },
    plugins: [createPersistedState({
        key: 'camino',
        paths: ['user']
    })]
})
  