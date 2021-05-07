import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import  createPersistedState  from  'vuex-persistedstate'
import { test } from '@/api/alta-camino'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      foo: 'root-foo',
      breadcrumb: []
    },
    mutations: {
        setBreadcrumb(state, dataBreadcrumb ) {
            state.breadcrumb = dataBreadcrumb
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
        user: auth
    },
    plugins: [createPersistedState({
        key: 'camino',
        paths: ['user']
    })]
})
  