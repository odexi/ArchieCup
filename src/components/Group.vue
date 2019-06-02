<template>
  <div style="margin-top: 40px;">
      <v-spacer></v-spacer>
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
  </div>
</template>
<script>
export default {
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

