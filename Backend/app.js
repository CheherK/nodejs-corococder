// import express module
const express = require("express");

// create express application
const app = express();

// import Body Parser module
const bodyParser = require("body-parser");

// import mongoose module
const mongoose = require("mongoose");

// enetcomDB: DB name
mongoose.connect('mongodb://localhost:27017/test');

//import match model
const Match = require("./models/match");

//import player model
const Player = require("./models/player")

// configure APP with Body Parser to sent response => JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//database (fake)
var matchesTab = [
   {id: 1, scoreOne: 1, scoreTwo: 2, teamOne:"AUS", teamTwo:"ARG"},
   {id: 2, scoreOne: 1, scoreTwo: 0, teamOne:"TUN", teamTwo:"FRA"},
   {id: 3, scoreOne: 6, scoreTwo: 2, teamOne:"ENG", teamTwo:"IRN"},
];
var playersTab = [
   {id: 1, name: "Messi", nbr: 10, position: "atk" },
   {id: 2, name: "CR7", nbr: 7, position: "mid" },

];


//********************************* Matches ************************************


//Get all matches
app.get("/matches",(req,res)=>{
   Match.find().then((docs) => {
      res.json({matches: docs});
   });
})

//Get one match by ID(:id => un parametre)
app.get("/matches/:id",(req,res)=>{
   Match.findOne({_id: req.params.id}).then((doc) => {
      if(doc) {
         res.json({match: doc});
      }
      else {
         res.status(404).json({msg : "This Id Does Not Exist"});
      }
   });
})

//Update match
app.put("/matches/:id", (req, res) => {
   Match.updateOne({_id: req.params.id}, req.body).then((dbRes) => {
      res.json({Msg: "Match Updated Successfully"});
   })
})
//Create match
app.post("/Matches/", (req, res) => {
   // matchesTab.push(req.body);
   let matchObj = new Match(req.body);
   matchObj.save();
   res.json({ msg: "Match Created successfully" })
});

//delete one Matche by ID(:id => un parametre)
app.delete("/matches/:id", (req, res) => {
   Match.deleteOne({_id: req.params.id}).then((response) => {
      res.json({Msg: "Deleted With Success"});
   });
});

//************************************ Players ************************************


//Get all players
app.get("/players",(req,res)=>{
   Player.find().then((docs) => {
      res.json({ players: docs})
   })
});

//Get one player by ID(:id => un parametre)
app.get("/players/:id",(req,res)=>{
   let c = false;
   for(let obj of playersTab) {
      if(obj.id == req.params.id) {
         res.json({"player": obj});
         c = true;
         break;
      }
   }
   if(!c) {
      res.status(404).json({ msg: "Player Does Not Exist" });
   }
});

//Update player
app.put("/players/:id", (req, res) => {
   let c = false;
   for(let i=0; i < playersTab.length; i++ ) {
      if(playersTab[i].id == req.params.id) {
         playersTab[i] = req.body;
         // playersTab[i].id.name = req.body.name;
         // playersTab[i].id.nbr = req.body.nbr;
         // playersTab[i].id.position = req.body.position;
         res.json({ msg: "Player Updated successfully Updated" });
         c = true;
         break;
      }
   }
   if(!c) {
      res.status(404).json({ msg: "Player Does Not Exist" });
   }
})
//Create player
app.post("/players/", (req, res) => {
   // playersTab.push(req.body);
   let playerObj = new Player(req.body);
   playerObj.save();
   res.json({ msg: "Player Created successfully" })
});

//delete one player by ID(:id => un parametre)
app.delete("/players/:id", (req, res) => {
   let c = false;
   for(let i=0; i < playersTab.length; i++ ) {
      if(playersTab[i].id == req.params.id) {
         playersTab.splice(i, 1);
         res.json({ msg: "successfully deleted" });
         c = true;
         break;
      }
   }
   if(!c) {
      res.status(404).json({ msg: "Players Does Not Exist" });
   }
});

// make app importbale
module.exports = app;
