import { login, refreshToken } from '@/api/user'
import router from '@/router'
import jwtDecode from 'jwt-decode'

export default {
    namespaced: true,
    state: {
        user:null,
        userRol:null,
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
        },
        setUser: function(state, user) {
            state.user = user
        },         
        setUserRol: function(state, userRol) {
            state.userRol = userRol
        },
        setuserId: function(state, userId) {
            state.userId = userId
        },
    },
    actions: {
        async login({ commit }, userc) {

            try{
                let response  = await login(userc)

            if (response) {
                commit('setAccessToken', response.access)
                commit('setRefreshToken', response.access)
                let tmus = jwtDecode(response.access)
                commit('setuserId', tmus.icveusuario)
                commit('setUser', response.name)
                commit('setUserRol', response.perfil)
                commit('setAuthenticated', true)
                commit('setLoginError', false)
                if(response.perfil=="RESIDENTE"){
                    router.replace('/obras')
                }else{
                    router.replace("/caminos")
                }

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
        StateRol: state => state.userRol,
    }
}