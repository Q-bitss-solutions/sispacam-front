import axios from 'axios'
import store from '@/store/'
import createAuthRefreshInterceptor from "axios-auth-refresh";

const service = axios.create({
  //baseURL: 'https://backcmqa.sct.gob.mx/api/v1', 
  baseURL: process.env.VUE_APP_SCT_SVC_BACK_BASE_URL, 
  timeout: 5000, // request timeou
})

//refresh
const refreshAuthLogic = failedRequest => service.post('/token', {
    token: getRefreshToken()
}).then(tokenRefreshResponse => {
    store.dispatch('user/setAccessToken', tokenRefreshResponse.accessToken)
    failedRequest.response.config.headers["Authorization"] = 'Bearer ' + tokenRefreshResponse.accessToken
  return Promise.resolve()
});

const statusCodes = {
  statusCodes: [ 401, 403 ] // default: [ 401 ]
}
createAuthRefreshInterceptor(service, refreshAuthLogic, statusCodes);


function getRefreshToken(){
  const camino = JSON.parse(localStorage.getItem('camino'))
  if(camino) return camino.user.refreshToken
  return ''
}

// request interceptor
function getAccessToken() {
    const camino = JSON.parse(localStorage.getItem('camino'))
    if(camino){
        console.log('camino.user.token')
        console.log(camino.user.token)
        return camino.user.token
    }         
    return ''
}

service.interceptors.request.use(request => {
  request.headers['Authorization'] = "Bearer " + getAccessToken();
  return request;
});


// response interceptor
service.interceptors.response.use(
    response => {
        if (response.status === 200  || response.status === 201  || response.status === 202) {
            return response.data;
        } else {    
          return Promise.reject();                    
        }
    },
    error => {

        let { response, message } = error
        if (error.response && error.response.data) {
          const { status, data } = response
          console.log(message + ' - ' +  status + ' ' + data)
          return Promise.reject(data)
        } else {

          if (message === 'Network Error') {
            message = 'Network Error'
          }
          if (message.includes('timeout')) {
            message = 'timeout'
          }
          if (message.includes('Request failed with status code')) {
            const code = message.substr(message.length - 3)
            message = 'Backend interface' + code + 'Exception'
          }
          console.log(message)
          return Promise.reject(message)
        }
    }
  )

export default service