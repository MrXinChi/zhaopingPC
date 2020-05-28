import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 获取服务端数据
import "@/service/index.js";

// VueJsonp
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.config.productionTip = false

import '@/components/index' // 全局组件
import '@/plugins/index' // 第三方组件
import '@/style/index' // 公用css
import '@/utils/common' // 公用助手函数 


Vue.config.silent = true;
//去掉警告

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')