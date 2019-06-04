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
    <div style="margin-top: 20px;">
      <v-btn color="primary" dark class="mb-2" large @click="mixTeams">Mix teams</v-btn>
    </div>
    <div style="margin-top: 20px;">
      <v-btn color="success" dark class="mb-2" large @click="drawGroups">Start the tournament</v-btn>
    </div>
  </div>
</template>

<script>
import Team from "@/models/team.js";
import Group from "@/models/group.js";
import Setup from "@/components/Setup";
import Match from "@/models/match.js";
import GoodPlayersBasket from "@/components/GoodPlayersBasket";
import BadPlayersBasket from "@/components/BadPlayersBasket";
import { mapGetters, mapState } from "vuex";
import PostsService from '@/services/PostsService'

const guid = require('uuid/v4');

export default {
  name: "setup",
  components: {
    GoodPlayersBasket,
    BadPlayersBasket
  },
  computed: {
    ...mapState([
        'tournament'
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

  },
  watch: {},
  data() {
    return {};
  },
  methods: {
    mixTeams() {
      let teamsToBeMixed = this.teams.map(t => t.team);
      console.log(teamsToBeMixed)

      let updatedTeams = [];

      for (let team of this.teams) {
        let index = this.getRandomIndex(teamsToBeMixed.length);
        let t = team;
        let updatedTeam = Object.assign(t, team);
        updatedTeam.team = teamsToBeMixed[index];
        
        updatedTeams.push(updatedTeam);

        teamsToBeMixed.splice(index, 1);
      }
      this.$store.dispatch('mixTeams', updatedTeams)

      console.log(updatedTeams)
    },
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
      this.generateMatches();
    },

    generateMatches() {
      for (let group of this.groups) {
        let groupSize = group.length;
        let teamsAgainst = group.teams;
        let homeGame = true;
        let teamIdsToPass = []
        for (let team of group.teams) {
          
          for (let teamAgainst of teamsAgainst.filter(t => t.id !== team.id)) {

            if (!teamIdsToPass.includes(teamAgainst.id)) {
              if (homeGame) {
              console.log("Match home: ", team.player, " away: ", teamAgainst.player)
              let match = new Match ({
                homeTeamId: team.id,
                awayTeamId: teamAgainst.id
              })

              this.$store.dispatch('generateMatch', {match: match, groupId: group.id})
              
            }
            if (!homeGame) {
              console.log("away Match home: ", teamAgainst.player, " away: ", team.player)
              let match = new Match ({
                homeTeamId: teamAgainst.id,
                awayTeamId: team.id
              })
              
                this.$store.dispatch('generateMatch', {match: match, groupId: group.id})             
              }
              homeGame = !homeGame
            }
          }
          teamIdsToPass.push(team.id)
        }
      }
      this.saveTournament();
    },

    async saveTournament() {
      let id = guid();
      await this.$store.dispatch('setTournamentId', id);
      
      let result = await PostsService.saveTournament({
          tournament: this.tournament,
      })

      console.log(result)
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
    },

  },
  mounted() {

    // async getPosts () {
    //   const response = await PostsService.fetchPosts()
    //   this.posts = response.data
    // }

    let testTeams = [
      {
        player: 'Otto',
        team: 'Vegas Golden Knights',
        goodPlayer: false
      },
      {
        player: 'Arto',
        team: 'St. Louis Blues',
        goodPlayer: true
      },
      {
        player: 'Ville',
        team: 'Dallas Stars',
        goodPlayer: false
      },
      {
        player: 'Lauri',
        team: 'Ottawa Senators',
        goodPlayer: true
      },
      {
        player: 'Mikko',
        team: 'San Jose Sharks',
        goodPlayer: false
      },
      {
        player: 'Miro',
        team: 'Nashville Predators',
        goodPlayer: false
      },
      {
        player: 'Jere',
        team: 'Arizona Coyotes',
        goodPlayer: false
      },
      {
        player: 'Erkki',
        team: 'New York Islanders',
        goodPlayer: true
      },
      {
        player: 'Mika',
        team: 'Carolina Hurricanes',
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
    //this.drawGroups();
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
