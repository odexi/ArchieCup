import Vue from 'vue'
import Router from 'vue-router'
import ContentArea from './views/ContentArea.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'setup',
      component: ContentArea
    },
  ]
})
