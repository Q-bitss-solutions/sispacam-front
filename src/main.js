import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from "vuelidate"
import IdleVue from 'idle-vue'
import router from './router'
import store from './store'
import "@/assets/css/SCT.css"


axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.use(Vuelidate);
Vue.prototype.$residenteGroup = 411
Vue.prototype.$systemId = 201
Vue.config.productionTip = false
Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  idleTime: (20 * 60000)
});
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App),  
}).$mount('#app')
