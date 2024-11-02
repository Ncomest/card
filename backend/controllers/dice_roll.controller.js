let diceRoll = {
 diceWhite: 6,
 diceBlack: 6,
};

const listeners = [];

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

  listeners.forEach((listener) => listener.json(diceRoll));
  listeners.length = 0;

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

const diceWait = (req, res) => {
 listeners.push(res);

 req.on("close", () => listeners.splice(listeners.indexOf(res), 1));
};

module.exports = {
 getDiceRoll,
 updateDiceRoll,
 refreshDiceRoll,
 diceWait,
};
