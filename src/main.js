import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import './styles/global.scss'

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/interview-challenge-accuweather-api/" : "/",
};

Vue.use(require('vue-moment'));
Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
