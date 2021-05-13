import { login, refreshToken } from '@/api/user'
import router from '@/router'

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
            console.log('state')
            console.log(state)
            state.user = user
        },         
        setUserRol: function(state, userRol) {
            state.userRol = userRol
        },                           
    },
    actions: {
        async login({ commit }, userc) {
            console.log('user store')
            console.log(user)

            try{
                const  { user }  = await login(userc)
                console.log(user)
            if (user) {
                // commit('setAccessToken', accessToken)
                // commit('setRefreshToken', refreshToken)
                commit('setUser', JSON.parse(JSON.stringify(user)))
                commit('setUserRol', user.icveusuario==14592?'Normativo':'Residente')
                commit('setAuthenticated', true)
                commit('setLoginError', false)
                if(user.icveusuario==14592){
                    router.replace("/busqueda")
                }else{
                    router.replace('/obras')
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
        StateUser: state => JSON.parse(JSON.stringify(state.user)),
    }
}