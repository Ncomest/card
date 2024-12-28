const mongoose = require("mongoose");

const randomDeckSchema = mongoose.Schema({
 _id: {type: String, required: true},
 part: {type: String, required: true},
 name: {type: String,required: true},
 uri: {type: String,required: true},
 coin: {type: String,required: true},
 type: {type: String,required: true},
 element: {type: String,required: true} 
});

const RandomDeck = mongoose.model("randoms", randomDeckSchema);

module.exports = RandomDeck;
