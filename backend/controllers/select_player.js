const { players } = require("../data/player/player.js");

const selectPlayer = async (req, res) => {
 try {
  const player = await req.body.player;
  if ("player1" === player) {
   players.player1 = true;
  } else if (player === "player2") {
   players.player2 = true;
  }
  res.status(200).json(players);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const refreshPlayer = async (req, res) => {
 try {
  players.player1 = false;
  players.player2 = false;
  res.status(200).json(players);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = { selectPlayer, refreshPlayer };
