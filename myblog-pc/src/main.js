import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import http from './utils/http'

Vue.config.productionTip = false

// Vue.use(VueAxios, axios)

Vue.prototype.$http = http;

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//导出vue实例化对象
export default app 