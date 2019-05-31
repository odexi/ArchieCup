import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: []
  },
  mutations: {
    ADD_NEW(state, team) {
      state.teams.splice(1, 0, team)
    },
    EDIT_TEAM(state, payload) {
      Object.assign(state.teams.find(t => t.id === payload.id).player = payload.editedTeam.player);
      Object.assign(state.teams.find(t => t.id === payload.id).team = payload.editedTeam.team);
    },
    REMOVE_TEAM(state, id) {
      state.teams.splice(state.teams.findIndex(t => t.id === id), 1)
    },
  },
  actions: {
    addTeam({ commit }, team) {
      commit('ADD_NEW', team)
    },

    editTeam({ commit }, payload) {
      commit('EDIT_TEAM', payload)
    },

    removeTeam({ commit }, id) {
      commit('REMOVE_TEAM', id)
    }
  },
  
})
