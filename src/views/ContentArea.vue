<template>
  <div class="setup">
    <div class="hero-img">
      <img style="width: 100%; height: 200px; object-fit: cover; filter: brightness(0.3)" src="../img/icehockey.jpg">
      <div class="site-title">
        <h1 class="display-2 font-weight-bold" style="color: #ffffff">Archie Cup</h1>
      </div>
    </div>
    <div style="display: block; height: 80px;"></div>
    
    <v-container fluid v-if="gameOn">
      
    <v-layout wrap row v-if="groups.length === 0">
        <Setup></Setup>
    </v-layout>
    <v-layout wrap row v-if="groups.length > 0">
      <v-btn @click="saveTournament">Save</v-btn>
      <section v-if="tournamentId !== ''"><p>Tournament id: {{tournamentId}}</p></section>
        <Group v-for="group in groups" 
        :key="group.id"
        :group="group"
        ></Group>
    </v-layout>
    </v-container>
    <v-container fluid v-if="!gameOn">
      <v-layout wrap row>
          <Login></Login>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Setup from '@/components/Setup'
import Group from '@/components/Group'

import PostsService from '@/services/PostsService'

import { mapGetters, mapState } from 'vuex'

export default {
  
  components: {
    Login,
    Setup,
    Group,
  },
  computed: {
    ...mapState([
      'gameOn', 'tournament', 'newTournament'
    ]),
    groups: {
      get() {
        return this.$store.state.tournament.groups;
      }
    },
    teams: {
      get() {
        return this.$store.state.tournament.teams;
      }
    },
    tournamentId: {
      get() {
        return this.$store.state.tournament.id;
      }
    },
  },  
  data () {
    return {

    }
  },
  methods: {
    async saveTournament() {
      try {
      let result = await PostsService.updateTournament({
        tournament: this.tournament,
      })
      this.$toast.success('Tournament saved!')
      }
      catch (err) {
        this.$toast.error('Saving failed!')
      }
    },
    
  },
  mounted () {
  
  }
}
</script>
<style lang="scss" scoped>
  .setup {
    width: 100%;
    height: 100%;
  }
  .hero-img {
    width: 100%;
    height: 20%;
  }
  .site-title {
    position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        width: 60%;
        height: 40%;
        text-align: center;
  }
  .headline {
    color: #ffffff;
  }
</style>

