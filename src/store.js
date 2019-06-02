import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [],
    groups: [],
    gameOn: false
  },
  mutations: {
    NEW_TEAM(state, team) {
      state.teams.splice(state.teams.length, 0, team)
    },
    EDIT_TEAM(state, payload) {
      Object.assign(state.teams.find(t => t.id === payload.id).player = payload.editedTeam.player);
      Object.assign(state.teams.find(t => t.id === payload.id).team = payload.editedTeam.team);
    },
    REMOVE_TEAM(state, id) {
      state.teams.splice(state.teams.findIndex(t => t.id === id), 1)
    },
    SET_GROUPS(state, groups) {
      state.groups = groups;
      state.gameOn = true;
    }
  },
  actions: {
    addTeam({ commit }, team) {
      commit(types.NEW_TEAM, team)
    },

    editTeam({ commit }, payload) {
      commit(types.EDIT_TEAM, payload)
    },

    removeTeam({ commit }, id) {
      commit(types.REMOVE_TEAM, id)
    },

    setTeamsToGroups({ commit }, groups) {
      commit(types.SET_GROUPS, groups)
    },
  },
  
})
