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
      _id: '',
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
      if (!oDoc) {
        db.update({_id: state.nowDoc._id}, {$set: {date: Date.now()}}, {},
          (err, ret) => {
            if (err) throw err
          })
      } else {
        db.insert(oDoc, (err, ret) => {
          if (err) throw err
        })
        state.nowDoc = oDoc
      }
    },
    setNowDoc (state, doc) {
      state.nowDoc = doc
    }
  },
  actions: {}
})
