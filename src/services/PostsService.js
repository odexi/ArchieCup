import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchPosts () {
    return Api().get('tournament')
  },
  async saveTournament (params) {
    
    // let response = await axios.post(Api + 'tournament', params)
    // return response
    return Api().post('/', params)
  },
}