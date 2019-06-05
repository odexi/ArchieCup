const guid = require('uuid/v4');

export default class Match {

        id = null;
        homeTeamId = null;
        awayTeamId = null;
        matchResult = {
          matchId: '',
          winner: '',
          loser: '',
          overTime: false,
          winnerScore: 0,
          loserScore: 0,
          groupId: '',
        };
        scoresSubmitted = false;

        constructor(o, store) {
          this.id = guid();
          this.homeTeamId = o.homeTeamId;
          this.awayTeamId = o.awayTeamId;
        }
}
