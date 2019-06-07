<template>
  <div style="margin-top: 40px; width: 100%;">
      <v-spacer></v-spacer>
      <div grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm12 md7>
    <h2>Group {{group.groupNumber}}</h2>  
    <v-data-table :headers="headers" :items="group.teams" disable-initial-sort class="elevation-1">
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ props.header.text }}</span>
          </template>
          <span>{{ props.header.text }}</span>
        </v-tooltip>
      </template>
      <template v-slot:items="props">
        <td style="text-align: left;">{{ props.item.player }}</td>
        <td style="text-align: left;">{{ props.item.team }}</td>
        <td style="text-align: left;">{{ props.item.gamesPlayed }}</td>
        <td style="text-align: left;">{{ props.item.points }}</td>
        <td style="text-align: left;">{{ props.item.wins }}</td>
        <td style="text-align: left;">{{ props.item.loses }}</td>
        <td style="text-align: left;">{{ props.item.overtimeLoses }}</td>
        <td style="text-align: left;">{{ props.item.goalsFor }}</td>
        <td style="text-align: left;">{{ props.item.goalsAgainst }}</td>
        <td style="text-align: left;">{{ props.item.goalsFor - props.item.goalsAgainst }}</td>
      </template>
    </v-data-table>
      </v-flex>
      <v-flex xs12 sm12 md5 style="padding-left: 60px; padding-top: 30px; float: right">
        <v-card style="width:100%; height: 400px; overflow-y: scroll;">
          <Match v-for="match in group.matches" :key="match.id"
            :match="match"
            :groupId="group.id"
          ></Match>
        </v-card>
      </v-flex>
      </v-layout></div>
    
  </div>
</template>
<script>
import Match from '@/components/Match'

export default {
  components: {
    Match
  },
  props: {
      group: Object,
  },
  data () {
    return {
      headers: [
        {
          text: 'Player',
          align: 'left',
          sortable: false,
          value: 'player'
        },
        {
          text: 'Team',
          align: 'left',
          sortable: false,
          value: 'team'
        },
        { text: 'GP', value: 'gp' },
        { text: 'PTS', value: 'pts' },
        { text: 'W', value: 'w' },
        { text: 'L', value: 'l' },
        { text: 'OTL', value: 'otl' },
        { text: 'GF', value: 'gf' },
        { text: 'GA', value: 'ga' },
        { text: 'DIFF', value: 'diff' },
      ],
    }
  },
};
</script>
<style lang="scss" scoped>
</style>

