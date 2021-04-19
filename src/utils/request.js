import axios from 'axios'

const service = axios.create({
    baseURL: process.env.VUE_APP_SCT_SVC_BACK_BASE_URL, // url = base url + request url
    timeout: 5000, // request timeout
})

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
            console.log(error);t();
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
          //Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
          console.log('hasta aqui')
          console.log(message)
          return Promise.reject(message)
        }
    }
  )

export default service