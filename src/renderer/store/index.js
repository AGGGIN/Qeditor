import Vue from 'vue'
import Vuex from 'vuex'
import db from '../datastore'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'
//
// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputDialogVisible: false,
    nowDoc: {
      content: '',
      date: '',
      title: ''
    }
  },
  mutations: {
    showInputDialog (state) {
      state.inputDialogVisible = true
    },
    hideInputDialog (state) {
      state.inputDialogVisible = false
    },
    addDoc (state, oDoc) {
      db.insert(oDoc, (err, ret) => {
        if (err) throw err
      })
      state.nowDoc = oDoc
    },
    setNowDoc (state, doc) {
      state.nowDoc = doc
    }
  },
  actions: {}
})
