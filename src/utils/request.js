import axios from 'axios'

const service = axios.create({
  baseURL: 'http://ccr-back.apps.lab.sct.gob.mx/', 
  timeout: 5000, // request timeou
})

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.status === 200  || response.status === 201) {
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