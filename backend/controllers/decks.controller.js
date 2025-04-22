// const decks = require("../constance/decks.const.js");

const { default: mongoose } = require("mongoose");

const getAllDecks = async (req, res) => {

 try {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionsNames = collections.map(col => col.name);
  const exclude = ['tables', 'randoms', 'dwarves', 'orcs', 'elves', 'witches'];
  const filterArr = collectionsNames.filter(item => !exclude.includes(item));

  res.status(200).json(filterArr);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getAllDecks,
};
