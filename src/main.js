import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import Meta from 'vue-meta'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueTheMask)

Vue.use(Meta, {
  refreshOnceOnNavigation: true
})

Vue.use(VueToastr, {
  defaultPosition: 'toast-bottom-left',
  defaultType: 'info',
  defaultTimeout: 4000,
})

export const vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
