<template>
    <div>
        <v-container grid-list-xs fluid>
        <v-layout wrap v-bind:class="{ submittedMatch: !matchSubmitted }">
          <v-flex xs12 sm6 style="position: relative">
              <div class="vertical-aligned-match-stuff">
                  <h3>{{ teams.find(t => t.id === match.homeTeamId).player }}</h3>
              </div>
              
          </v-flex>
          <v-flex xs12 sm6>
              <number-input :value="homeScore" v-model="getHomeScore" :readonly="!matchSubmitted" inline center controls></number-input>
          </v-flex>
          <v-flex xs12 sm6 style="position: relative">
              <div class="vertical-aligned-match-stuff">
                  <h3>{{ teams.find(t => t.id === match.awayTeamId).player }}</h3>
              </div>
              
          </v-flex>
          <v-flex xs12 sm6>
              <number-input :value="awayScore" v-model="getAwayScore" :readonly="!matchSubmitted" inline center controls></number-input>
          </v-flex>
          <v-flex xs12 style="position: relative">
              <div class="vertical-aligned-match-stuff" style="float: left;">
                  <v-checkbox
                    v-model="getOtValue"
                    :disabled="!matchSubmitted"
                    :label="'Overtime win'"
                    ></v-checkbox>
              </div>
              <div style="float: right;">
                  <v-btn :disabled="!winnerFound" @click="submitScore(homeScore, awayScore, otWin)">Submit</v-btn>
              </div>
          </v-flex>
        </v-layout>
        </v-container>
        <v-divider ></v-divider>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
    components: {
    },
    props: {
        match: Object,
        groupId: String,
    },
    computed: {
    // ...mapState(["teams",]),

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

    winnerFound () {
       return this.homeScore - this.awayScore !== 0 && !this.groups
       .find(g => g.id === this.groupId).matches
       .find(m => m.id === this.match.id).scoresSubmitted ? true : false;
    },

    matchSubmitted () {
        return !this.groups
       .find(g => g.id === this.groupId).matches
       .find(m => m.id === this.match.id).scoresSubmitted ? true : false;
    },

    isSubmitted () {
        return this.matchSubmitted ? 'submittedMatch' : '';
    },

    getHomeScore: {
        get() {
            if (this.match.matchResult.winner !== '') {
                if (this.match.homeTeamId === this.match.matchResult.winner) {
                    return this.match.matchResult.winnerScore;
                }
                else {
                    return this.match.matchResult.loserScore;
                }
            }
            else {
                return 0;
            }
        },
        set(value) {
            this.homeScore = value;  
        }
        
        
    },

    getAwayScore: {
        get() {
        if (this.match.matchResult.winner !== '') {
                if (this.match.awayTeamId === this.match.matchResult.winner) {
                    return this.match.matchResult.winnerScore;
                }
                else {
                    return this.match.matchResult.loserScore;
                }
            }
            else {
                return 0;
            }
        },
        set(value) {
            this.awayScore = value;  
        }
    },

    getOtValue: {
        get() {
            if (this.match.matchResult.winner !== '') { 
                return this.match.matchResult.overTime;
            }
        },
        set(value) {
            this.otWin = value;  
        }
    }

    },
    data () {
      return {
        otWin: false,
        homeScore: 0,
        awayScore: 0,
        colorBlue: true
      }
    },
    methods: {
        submitScore(homeScore, awayScore, otWin) {
            //Home wins
            if (homeScore - awayScore > 0) {
                let matchResult = {
                    matchId: this.match.id,
                    winner: this.match.homeTeamId,
                    loser: this.match.awayTeamId,
                    overTime: otWin,
                    winnerScore: homeScore,
                    loserScore: awayScore,
                    groupId: this.groupId,
                }

                this.$store.dispatch('submitScore', matchResult);
            }

            //Away wins
            if (homeScore - awayScore < 0) {
                let matchResult = {
                    matchId: this.match.id,
                    winner: this.match.awayTeamId,
                    loser: this.match.homeTeamId,
                    overTime: otWin,
                    winnerScore: awayScore,
                    loserScore: homeScore,
                    groupId: this.groupId,
                }
                this.$store.dispatch('submitScore', matchResult);
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .vertical-aligned-match-stuff {
        text-align: left; margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .submittedMatch {
        background-color: lightblue;
    }
</style>


