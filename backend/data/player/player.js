const players = {
 player1: false,
 player2: false,
};

const player = async (req, res) => {
 try {
  res.status(200).json(players);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

module.exports = { player, players };
