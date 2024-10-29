const createDeckModel = require("../../models/card.model.js");
const cardRoutes = require("../../routes/card.route.js");
const decks = require("../../constance/decks.const.js");

module.exports = function addMoreDeck(app) {
 decks.forEach((deckName) => {
  const DeckModel = createDeckModel(deckName);
  app.use(`/api/${deckName}`, cardRoutes(DeckModel));
 });
};
