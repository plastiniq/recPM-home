import Vue from 'vue'
import App from './App.vue'
import Main from './components/Main.vue'
import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip'
import '@/assets/css/tooltip.less';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VTooltip);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/:page',
      component: Main
    },
    {
      path: '/:page/:option',
      component: Main
    },
    {
      path: '*',
      redirect: '/growing'
    }
  ]
})

new Vue({
  router,
  render: createEle => createEle(App)
}).$mount('#app')
