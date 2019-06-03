const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var Tournament = require("./models/tournament");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ArchieCup');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/posts', (req, res) => {
    res.send(
      [{
        title: "Hello World!",
        description: "Hi there! How are you?"
      }]
    )
  })


// Add new post
app.post('/', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    console.log("Heheheee")
    console.log(req.body)
    let newTournament = new Tournament(req.body.tournament
    //     {
    //     tournamentId: req.body.tournament.id,
    //     tournamentName: 'Archie Cup',
    //     groups: req.body.tournament.groups,
    //     teams: req.body.tournament.teams
    // }
    )
    // var new_post = new Tournament({
    //   title: title,
    //   description: description
    // })
  
    newTournament.save(function (error) {
      if (error) {
        console.log(error)
        return;
      }
      res.send({
        createdTournament: newTournament,
        success: true,
        message: 'Tournament saved successfully!'
      })
    })
  })



app.listen(process.env.PORT || 8081)


