const { broadcastEvent } = require("../websocket");

let diceRoll = {
 diceWhite: 6,
 diceBlack: 6,
};

const getDiceRoll = async (req, res) => {
 try {
  res.status(200).json(diceRoll);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const updateDiceRoll = async (req, res) => {
 try {
  const user = req.body.user;

  if (user === "player1") {
   diceRoll.diceWhite = Math.floor(Math.random() * 6) + 1;
  } else if (user === "player2") {
   diceRoll.diceBlack = Math.floor(Math.random() * 6) + 1;
  }

  broadcastEvent("dice:rolling", { user });

  setTimeout(() => {
   broadcastEvent("dice:update", { user, diceRoll });
  }, 3000);

  res.status(200).json({ rolling: true });
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

const refreshDiceRoll = async (req, res) => {
 try {
  res.status(200).json(diceRoll);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = {
 getDiceRoll,
 updateDiceRoll,
 refreshDiceRoll,
};
