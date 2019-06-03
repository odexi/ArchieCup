var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tournamentSchema = new Schema({
  tournamentId: String,
  tournamentName: String,
  teams: [
    {
      id: String,
      team: String,
      player: String,
      goodPlayer: Boolean,
      gamesPlayed: Number,
      points: Number,
      wins: Number,
      loses: Number,
      overtimeLoses: Number,
      goalsFor: Number,
      goalsAgainst: Number,
    }
  ],
  groups: [
      {
          id: String,
          groupNumber: Number,
          matches: [
              {
                id: String,
                homeTeamId: String,
                awayTeamId: String,
                matchResult: {
                    matchId: String,
                    winner: String,
                    loser: String,
                    overTime: Boolean,
                    winnerScore: Number,
                    loserScore: Number,
                    groupId: String,
                },
                scoresSubmitted: Boolean,
              }

          ],
          teams: [
              {
                id: String,
                team: String,
                player: String,
                goodPlayer: Boolean,
                gamesPlayed: Number,
                points: Number,
                wins: Number,
                loses: Number,
                overtimeLoses: Number,
                goalsFor: Number,
                goalsAgainst: Number,
              }

          ]
      }
  ]
});

var Tournament = mongoose.model("tournament", tournamentSchema);
module.exports = Tournament;
