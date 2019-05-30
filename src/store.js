import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: []
  },
  mutations: {
    addNew(state, team) {
      state.teams.splice(1, 0, team)
    },
  },
  actions: {
    addTeam({ commit }, team) {
      commit('addNew', team)
    },
  },
  
})
