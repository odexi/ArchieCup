import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchPosts () {
    return Api().get('tournament')
  },
  async saveTournament (params) {
    return Api().post('/', params)
  },
  async loadTournament (params) {
    return Api().get('/'+ params.id)
  },
  async updateTournament (params) {
    return Api().put('/'+ params.tournament.id, {params: params})
  },
}