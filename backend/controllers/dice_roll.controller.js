let diceRoll = {
 diceWhite: 0,
 diceBlack: 0,
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
  console.log(req.body);
  if (req.body.user === "player1") {
   diceRoll.diceWhite = Math.floor(Math.random() * 6) + 1;
  } else if (req.body.user === "player2") {
   diceRoll.diceBlack = Math.floor(Math.random() * 6) + 1;
  }
  res.status(200).json(diceRoll);
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
