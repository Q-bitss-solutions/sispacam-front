import { login, refreshToken } from '@/api/user'
import router from '@/router'

export default {
    namespaced: true,
    state: {        
        user: null,
        userId: null,
        token: null,
        refreshToken: "",        
        isAuthenticated: false, 
        loginError: false
    },
    mutations: {
        setUser(state, username){
            state.user = username
        },
        LogOut(state){
            state.user = null
        },
        setAccessToken: function(state, token) {
            state.token = token;
          },   
        setRefreshToken: function(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        setAuthenticated: function(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        setLoginError: function(state, loginError) {
            state.loginError = loginError
        }                     
    },
    actions: {
        async login({ commit }, user) {
            console.log('user store')
            console.log(user)

            try{
                console.log('await--->')
                const resp = await login(user)
                console.log('aquiauauauauauaua')
                // console.log(accessToken)
                // console.log(refreshToken)
                console.log(resp.user)
            if (resp.user) {
                // commit('setAccessToken', accessToken)
                // commit('setRefreshToken', refreshToken)
                commit('setAuthenticated', true)
                commit('setLoginError', false)
                router.replace("/busqueda-obras");
            }
            }catch(e){
                console.log('catch erroro login')
                console.log(e)
                commit('setAccessToken', false)
                commit('setRefreshToken', false)
                commit('setAuthenticated', false)
                commit('setLoginError', true)
                return Promise.reject(e)
            }
        },        
        refreshToken: async ({ state, commit }) => {
            const { token } = await refreshToken( { token: state.refreshToken })
            if(token) {
                commit("setAccessToken", response.data.accessToken)
            }
        },
        setAccessToken({ commit }, token) {
            console.log('setAccesToken accion')
            commit('setAccessToken', token)
        }    
    },
    getters: {
        isAuthenticated: state => !!state.isAuthenticated,    
        StateUser: state => state.user,
    }
}