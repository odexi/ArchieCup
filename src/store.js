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
    },
    MIX_TEAMS(state, newTeams) {
      state.teams = newTeams;
    },
    GENERATE_MATCH(state, payload) {
      state.groups.find(g => g.id === payload.groupId).matches.splice(
        state.groups.find(g => g.id === payload.groupId).matches.length, 0,
        payload.match
      )
    },
    SUBMIT_SCORE(state, matchResult) {
      state.groups.find(g => g.id === matchResult.groupId).matches
      .find(m => m.id === matchResult.matchId).matchResult = matchResult;

      let winner = state.groups.find(g => g.id === matchResult.groupId).teams
      .find(t => t.id === matchResult.winner);

      let loser = state.groups.find(g => g.id === matchResult.groupId).teams
      .find(t => t.id === matchResult.loser);

      winner.gamesPlayed++;
      loser.gamesPlayed++;

      winner.wins++;
      

      winner.points = winner.points + 2;

      if (matchResult.overTime) {
        loser.points++;
        loser.overtimeLoses++;
      }
      else {
        loser.loses++
      }

      winner.goalsFor = winner.goalsFor + matchResult.winnerScore;
      winner.goalsAgainst = winner.goalsAgainst + matchResult.loserScore;

      loser.goalsFor = loser.goalsFor + matchResult.loserScore;
      loser.goalsAgainst = loser.goalsAgainst + matchResult.winnerScore;

      state.groups.find(g => g.id === matchResult.groupId).matches
      .find(m => m.id === matchResult.matchId).scoresSubmitted = true;
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

    generateMatch({ commit }, payload) {
      commit(types.GENERATE_MATCH, payload)
    },

    submitScore({ commit }, matchResult) {
      commit(types.SUBMIT_SCORE, matchResult)
    },

    mixTeams({ commit }, newTeams) {
      commit(types.MIX_TEAMS, newTeams)
    },
  },
  
})
