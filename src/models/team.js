
const guid = require('uuid/v4');
export default class Team {

        id = null;
        name = '';
        player = '';
        playedGames = 0;
        totalPoints = 0;
        wins = 0;
        draws = 0;
        loses = 0;
        drawWins = 0;
        drawLoses = 0;
        goalsMade = 0;
        goalsAgainst = 0;

        constructor(o, store) {
          this.id = guid();
        }
}
