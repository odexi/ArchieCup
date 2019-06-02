
const guid = require('uuid/v4');
export default class Team {

        id = null;
        team = '';
        player = '';
        goodPlayer = false;
        gamesPlayed = 0;
        points = 0;
        wins = 0;
        loses = 0;
        overtimeLoses = 0;
        goalsFor = 0;
        goalsAgainst = 0;

        constructor(o, store) {
          this.id = guid();
          this.team = o.team;
          this.player = o.player;
          this.goodPlayer = o.goodPlayer;
        }
}
