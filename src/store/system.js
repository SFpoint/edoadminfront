export default {
  namespaced: true,

  state: {
    techMessageHeight: 0
  },

  getters: {
    techMessageHeight: state => state.techMessageHeight
  },

  mutations: {
    setTechMessageHeight(state, payload) {
      state.techMessageHeight = payload
    }
  },

  actions: {
    setTechMessageHeight({ commit }, payload) {
      commit('setTechMessageHeight', payload)
    }
  }
}