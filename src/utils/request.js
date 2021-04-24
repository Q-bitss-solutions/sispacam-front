import axios from 'axios'

const service = axios.create({
  baseURL: 'http://ccr-back.apps.lab.sct.gob.mx/', 
  timeout: 5000, // request timeout
})

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
          console.log(error);    
          Promise.reject();                    
        }
    },
    error => {

        const { response, message } = error
        if (error.response && error.response.data) {
          const { status, data } = response
          handleCode(status, data.msg || message)
          return Promise.reject(error)
        } else {
          let { message } = error
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