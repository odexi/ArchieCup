import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/dist/vuetify.min.js'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
