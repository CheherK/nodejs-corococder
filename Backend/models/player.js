// import mongoose module
const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
   name: String,
   nbr: Number,
   position: String,
});

//Model Name : "Player" (Pascalcase)
const player = mongoose.model("Player", playerSchema);

module.exports = player;