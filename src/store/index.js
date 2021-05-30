import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import presupuesto from "./modules/presupuesto";
import  createPersistedState  from  'vuex-persistedstate'
import { test } from '@/api/alta-camino'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
            console.log('mutation')
            console.log(idObraCancelacion)
            state.cancel.id = idObraCancelacion
        },
        setIdCancelacionConvenio(state, idConvenio) {
            console.log('mutation')
            console.log(idConvenio)
            state.cancelConvenio.id = idConvenio
        }

    },
    getters: {
    
    },
    actions: {
        async test({ commit }, user) {
            console.log('user')
            console.log(user)
            const data = await test(user)
            console.log(data)
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
  