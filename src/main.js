import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入echarts
import * as echarts from 'echarts';
// axios
import axios from 'axios'

import utils from './utils/utils.js'
import moment from 'moment'//导入文件 
import "lib-flexible"
import 'echarts-liquidfill'
Vue.prototype.$moment = moment;//赋值使用

Vue.prototype.axios = axios;
Vue.prototype.utils = utils;



Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

