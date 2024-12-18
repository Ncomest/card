const { players } = require("../data/player/player.js");

const selectPlayer = async (req, res) => {
  try {
    const player = await req.body.player;

    if ("player1" === player) {
      players.player1 = true;
      return res.status(200).json(players);
    } else if (player === "player2") {
      players.player2 = true;
      return res.status(200).json(players);
    } else {
      return res
        .status(400)
        .json({ message: "Неверный запрос: неизвестный игрок" });
    }
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
