import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'
//
// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputDialogVisible: false
  },
  mutations: {
    showInputDialog (state) {
      state.inputDialogVisible = true
    },
    hideInputDialog (state) {
      state.inputDialogVisible = false
    }
  },
  actions: {}
})
