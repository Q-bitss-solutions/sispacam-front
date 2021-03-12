import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from "vuelidate";
import IdleVue from 'idle-vue'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.use(Vuelidate);
Vue.config.productionTip = false
Vue.use(IdleVue, {
  eventEmitter: new Vue(),
  idleTime: (20 * 60000)
});
Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App),
}).$mount('#app')
