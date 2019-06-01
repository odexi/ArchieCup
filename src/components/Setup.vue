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
    <div style="margin-top: 40px;">
      <v-btn color="primary" dark class="mb-2" large @click="drawGroups">Start the tournament</v-btn>
    </div>
  </div>
</template>

<script>
import Team from "@/models/team.js";
import Group from "@/models/group.js";
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
  methods: {
    drawGroups() {
      let group1 = [];
      let group2 = [];

      let goodTeams = this.teams.filter(t => t.goodPlayer === true);
      let badTeams = this.teams.filter(t => t.goodPlayer === false);

      let nextGroup = 1

      while (goodTeams.length > 0) {

        let index = this.getRandomIndex(goodTeams.length);

        if ( nextGroup === 1) {
          group1.splice(group1.length, 0, goodTeams[index]);
          goodTeams.splice(goodTeams.findIndex(t => t.id === goodTeams[index].id), 1);
          nextGroup = 2;
        } 
        else {
          group2.splice(group2.length, 0, goodTeams[index]);
          goodTeams.splice(goodTeams.findIndex(t => t.id === goodTeams[index].id), 1);
          nextGroup = 1;
        }
      }

      while (badTeams.length > 0) {
        
        let index = this.getRandomIndex(badTeams.length);

        if ( nextGroup === 1) {
          group1.splice(group1.length, 0, badTeams[index]);
          badTeams.splice(badTeams.findIndex(t => t.id === badTeams[index].id), 1);
          nextGroup = 2;
        } 
        else {
          group2.splice(group2.length, 0, badTeams[index]);
          badTeams.splice(badTeams.findIndex(t => t.id === badTeams[index].id), 1);
          nextGroup = 1;
        }
      }

      let groups = [];
      groups.push(this.shuffleArray(group1));
      groups.push(this.shuffleArray(group2));

      let groupObjects = [];

      for (let i = 0; i < 2; i++) {
        let groupNumber = i+1;

        let group = new Group({
          teams: groups[i],
          groupNumber: groupNumber
        });
        groupObjects.push(group)
      }
      

      this.$store.dispatch('setTeamsToGroups', groupObjects)
    },

    isEven(n) {
      return n % 2 == 0;
    },

    getRandomIndex(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    shuffleArray(array) {
      var ctr = array.length, temp, index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    }
    
  },
  mounted() {
    let testTeams = [
      {
        player: 'Otto',
        team: 'Vegas Golden Knights',
        goodPlayer: false
      },
      {
        player: 'Arto',
        team: 'Detroit Red Wings',
        goodPlayer: true
      },
      {
        player: 'Ville',
        team: 'New York Rangers',
        goodPlayer: false
      },
      {
        player: 'Lauri',
        team: 'Tampa Bay Ligtning',
        goodPlayer: true
      },
      {
        player: 'Mikko',
        team: 'Vancouver Canucks',
        goodPlayer: false
      },
      {
        player: 'Santeri',
        team: 'Washington Capitals',
        goodPlayer: true
      },
      {
        player: 'Mika',
        team: 'Philadephia Flyers',
        goodPlayer: false
      },
      {
        player: 'Kettunen',
        team: 'San Jose Sharks',
        goodPlayer: false
      },
    ]

    for (let testTeam of testTeams) {
      let team = new Team({
        player: testTeam.player,
        team: testTeam.team,
        goodPlayer: testTeam.goodPlayer
      });
    //console.log(team);
    this.$store.dispatch("addTeam", team);
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
