const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 url: {
  type: String,
  required: true,
 },
});

const createDeckModel = (deckName) => {
 return mongoose.model(deckName, CardSchema);
};

module.exports = createDeckModel;
