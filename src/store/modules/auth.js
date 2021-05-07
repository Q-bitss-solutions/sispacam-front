import { login, refreshToken } from '@/api/user'
import router from '@/router'

export default {
    namespaced: true,
    state: {        
        user: null,
        userId: null,
        token: null,
        refreshToken: "",        
        isAuthenticated: false   
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
        }               
    },
    actions: {
        async login({ commit }, user) {
            console.log('user')
            console.log(user)

            try{
            const { accessToken, refreshToken } = await login(user)
            console.log(accessToken)
            console.log(refreshToken)
            if (accessToken) {
                commit('setAccessToken', accessToken)
                commit('setRefreshToken', refreshToken)
                commit('setAuthenticated', true)
                router.replace("/busqueda-obras");
            }
            }catch(e){
                router.replace("/busqueda-obras");
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