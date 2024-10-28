const createDeckModel = require("../../models/card.model.js");
const cardRoutes = require("../../routes/card.route.js");
const express = require("express");
const app = express();

const decks = ["elves", "witches", "dwarves"];

module.exports = function addMoreDeck() {
 decks.forEach((deckName) => {
  const DeckModel = createDeckModel(deckName);
  app.use(`/api/${deckName}`, cardRoutes(DeckModel));
 });
};
