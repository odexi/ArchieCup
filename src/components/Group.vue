<template>
  <div style="margin-top: 40px; width: 100%;">
      <v-spacer></v-spacer>
      <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm12 md8>
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
        <td>{{ props.item.player }}</td>
        <td class="text-xs-right">{{ props.item.team }}</td>
        <td class="text-xs-right">{{ props.item.gamesPlayed }}</td>
        <td class="text-xs-right">{{ props.item.wins }}</td>
        <td class="text-xs-right">{{ props.item.loses }}</td>
        <td class="text-xs-right">{{ props.item.overtimeLoses }}</td>
        <td class="text-xs-right">{{ props.item.goalsFor }}</td>
        <td class="text-xs-right">{{ props.item.goalsAgainst }}</td>
        <td class="text-xs-right">{{ props.item.goalsFor - props.item.goalsAgainst }}</td>
        <td class="text-xs-right">{{ props.item.points }}</td>
      </template>
    </v-data-table>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-card style="width:100%; height: 400px; overflow-y: scroll;">
          <Match v-for="match in group.matches" :key="match.id"
            :match="match"
            :groupId="group.id"
          ></Match>
        </v-card>
      </v-flex>
      </v-layout></v-container>
    
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
        { text: 'W', value: 'w' },
        { text: 'L', value: 'l' },
        { text: 'OTL', value: 'otl' },
        { text: 'GF', value: 'gf' },
        { text: 'GA', value: 'ga' },
        { text: 'DIFF', value: 'diff' },
        { text: 'PTS', value: 'pts' }
      ],
      teams: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
      ]
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

