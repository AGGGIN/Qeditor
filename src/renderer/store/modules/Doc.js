const state = {
  inputVisible: false
}

const mutations = {
  SHOW_INPUT_DIALOG (state) {
    state.inputVisible = true
  },
  Hide_INPUT_DIALOG (state) {
    state.inputVisible = false
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
