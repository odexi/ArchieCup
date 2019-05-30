<template>
  <div class="setup">
    <div class="hero-img">
      <img style="width: 100%; height: 200px; object-fit: cover; filter: brightness(0.3)" src="../img/icehockey.jpg">
      <div class="site-title">
        <h1 class="display-2 font-weight-bold" style="color: #ffffff">Archie Cup</h1>
      </div>
    </div>
    <div style="display: block; height: 80px;"></div>
    <v-layout wrap>
      <v-flex xs12 v-for="(team) in teams"
      :key="team.id"
      >
      <div>

      </div>
        <v-input
        >
          Default Slot
        </v-input>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import Team from '@/models/team.js'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'setup',
  components: {
  },
  computed: {
    ...mapState([
      'teams',
    ]),
  },  
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    let team = new Team({

    });
    console.log(team)
    this.$store.dispatch('addTeam', team)
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

