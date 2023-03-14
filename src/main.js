import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from "vuelidate"
import IdleVue from 'idle-vue'
import router from './router'
import store from './store'
import "@/assets/css/SCT.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { ComboBoxPlugin, MultiSelectPlugin } from "@syncfusion/ej2-vue-dropdowns";
import { ContextMenuPlugin } from "@syncfusion/ej2-vue-navigations";
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";

Vue.use(ElementUI);
Vue.use(ContextMenuPlugin);
Vue.use(ButtonPlugin);
enableRipple(true);
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

Vue.use(ComboBoxPlugin);
Vue.use(MultiSelectPlugin);

new Vue({
  router,
  store,
  render: h => h(App),  
}).$mount('#app')
