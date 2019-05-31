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
      <Setup></Setup>
      
    </v-layout>

  </div>
</template>

<script>
import Setup from '@/components/Setup'
import { mapGetters, mapState } from 'vuex'

export default {
  
  components: {
    Setup
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

