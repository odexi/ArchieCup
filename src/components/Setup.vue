<template>
  <div>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6>
          <GoodPlayersBasket></GoodPlayersBasket>
        </v-flex>

        <v-flex xs12 sm12 md6>
          <BadPlayersBasket></BadPlayersBasket>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Team from "@/models/team.js";
import Setup from "@/components/Setup";
import GoodPlayersBasket from "@/components/GoodPlayersBasket";
import BadPlayersBasket from "@/components/BadPlayersBasket";
import { mapGetters, mapState } from "vuex";

export default {
  name: "setup",
  components: {
    GoodPlayersBasket,
    BadPlayersBasket
  },
  computed: {
    ...mapState(["teams"])
  },
  watch: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let team = new Team({
      player: "Otto",
      team: "Vegas Golden Knights",
      goodPlayer: false
    });
    console.log(team);
    this.$store.dispatch("addTeam", team);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
