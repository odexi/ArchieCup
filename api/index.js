const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Tournament = require("./models/tournament");

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

// Load tournament
app.get('/:id', async (req, res) => {
  console.log("JESJJSE")
    console.log(req)
    let tournament;

    try {
      tournament = await Tournament.find({
        id: req.params.id,
      });
    } catch(e) {
      console.log('Error retrieving course from db', e);
      return res.status(500).send({error:  'Error retrieveing course from database'})
    }
    
    console.log(tournament)
    return res.status(200).send(tournament)
  })


// Create new tournament
app.post('/', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    console.log("Heheheee")
    console.log(req.body)
    let newTournament = new Tournament(req.body.tournament)
  
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

  // Save tournament
app.put('/:id', async (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  console.log("Heheheee")
  console.log(req.body)
  // let newTournament = new Tournament(req.body.tournament)

  // newTournament.save(function (error) {
  //   if (error) {
  //     console.log(error)
  //     return;
  //   }
  //   res.send({
  //     createdTournament: newTournament,
  //     success: true,
  //     message: 'Tournament saved successfully!'
  //   })
  // })

  let tournament
  try{
    tournament = await Tournament.find({
      id: req.params.id,
    });
  } catch(err) {
    return res.status(500).send({error: 'Error finding course from database'})
  }

  tournament[0].teams = req.body.params.tournament.teams
  tournament[0].groups = req.body.params.tournament.groups

  console.log("Tournament: ")
  console.log(tournament)

  tournament[0].save(function (error) {
    if (error) {
      console.log(error)
      return res.status(500).send({error: 'Error updating tournament'})
    }
    return res.status(201).send({
      success: true,
      tournament: tournament
    })
  })
})



app.listen(process.env.PORT || 8081)


