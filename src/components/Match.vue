<template>
    <div>
        <v-container grid-list-xs fluid>
        <v-layout wrap>
          <v-flex xs12 sm6 style="position: relative">
              <div class="vertical-aligned-match-stuff">
                  <h3>{{ teams.find(t => t.id === match.homeTeamId).player }}</h3>
              </div>
              
          </v-flex>
          <v-flex xs12 sm6>
              <number-input :value="0" inline center controls></number-input>
          </v-flex>
          <v-flex xs12 sm6 style="position: relative">
              <div class="vertical-aligned-match-stuff">
                  <h3>{{ teams.find(t => t.id === match.awayTeamId).player }}</h3>
              </div>
              
          </v-flex>
          <v-flex xs12 sm6>
              <number-input :value="0" inline center controls></number-input>
          </v-flex>
          <v-flex xs12 style="position: relative">
              <div class="vertical-aligned-match-stuff" style="float: left;">
                  <v-checkbox
                    v-model="checkbox"
                    :label="'Overtime win'"
                    ></v-checkbox>
              </div>
              <div style="float: right;">
                  <v-btn>Submit</v-btn>
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
    },
    computed: {
    ...mapState(["teams"])

    },
    data () {
      return {
        checkbox: false,
      }
    },
    methods: {
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
</style>


