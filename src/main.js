import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/dist/vuetify.min.js'
import VuetifyToast from 'vuetify-toast-snackbar'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.use(VuetifyToast, {
  x: 'center', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'info',
  timeout: 5000, // default
  dismissable: true, // default
  autoHeight: false, // default
  multiLine: true, // default
  vertical: false, // default
  shorts: {
      error: {
        color: 'red'
      },
      success: {
        color: 'green'
      },
      warning: {
        color: 'orange'
      }
  },
  property: '$toast' // default
})

Vue.component(VueNumberInput.name, VueNumberInput);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
