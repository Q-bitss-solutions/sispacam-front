import axios from 'axios'
import store from '@/store/'
import createAuthRefreshInterceptor from "axios-auth-refresh";

const service = axios.create({
  baseURL: 'https://backcmqa.sct.gob.mx/api/v1', 
  //baseURL: 'http://localhost:8001/api/v1', 
  timeout: 5000, // request timeou
})

//refresh
const refreshAuthLogic = failedRequest => service.post('/token', {
  token: getRefreshToken()
}).then(tokenRefreshResponse => {
  console.log('tokenRefreshResponse')
  console.log(tokenRefreshResponse)
  store.dispatch('user/setAccessToken', tokenRefreshResponse.accessToken)
  failedRequest.response.config.headers["Authorization"] = 'Bearer ' + tokenRefreshResponse.accessToken
  return Promise.resolve()
});

const statusCodes = {
  statusCodes: [ 401, 403 ] // default: [ 401 ]
}
createAuthRefreshInterceptor(service, refreshAuthLogic, statusCodes);


function getRefreshToken(){
  console.log('refreshhhhhhhhh')
  const camino = JSON.parse(localStorage.getItem('camino'))
  if(camino) return camino.user.refreshToken
  return ''
}

// request interceptor
function getAccessToken() {
  console.log('gettttt')
  console.log(JSON.parse(JSON.stringify(localStorage.getItem('camino'))))
  const camino = JSON.parse(localStorage.getItem('camino'))
  console.log(camino)
  if(camino) return camino.user.token
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