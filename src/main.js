import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Mixins from './mixins/mixins'
import VueProgressBar from 'vue-progressbar'
import VueConfirmDialog from 'vue-confirm-dialog'

const options = {
  color: '#57CAD5',
  failedColor: '#57CAD5',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.mixin(Mixins)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: el => {
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
