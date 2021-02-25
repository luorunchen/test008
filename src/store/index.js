import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initStatus: ''
  },
  mutations: {
    changeStatus(state, status) {  //  重复赋值
      state.initStatus = status;
    },
  },
  actions: {
  },
  modules: {
  }
})
