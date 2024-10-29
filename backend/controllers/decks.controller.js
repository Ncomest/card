const decks = require("../constance/decks.const.js");

const getAllDecks = async (req, res) => {
 try {
  res.status(200).json(decks);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

console.log(decks);

module.exports = {
 getAllDecks,
};
